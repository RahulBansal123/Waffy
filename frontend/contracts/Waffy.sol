// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IWaffy.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Waffy is IWaffy, ReentrancyGuard{

    struct Loan {
        uint256 id;
        uint256 contractId;
        address contractAddress;
        address owner;
        address bidder;
        uint256 maxAmount;
        uint256 interest;
        uint256 bid;
        uint256 bidDrawn;
        uint256 startTime;
        uint256 endTime;
        uint256 firstBid;
        uint256 lastBid;
        uint256 lastInterestPaid;
    }

    // Mapping of loan ids to loan
    mapping(uint256 => Loan) internal loans;

    // Mapping of loaned NFT owners to array of loan ids
    mapping(address => uint256[]) internal loanedNFTs;

    // Total number of loans
    uint256 public totalLoans;
    

    /**
     * @dev Register a user with the contract.
     */
    function register(bytes32 name) public {
        emit Registered(msg.sender, name);
    }

    /**
     * @dev See {IWaffy-createLoan}.
     */
    function createLoan(uint256 id, address contractAddress, uint256 interest, uint256 maxAmount, uint256 endDate) external payable virtual override returns (uint256){

        require(endDate > block.timestamp, "Loan end date must be in the future");

        totalLoans = unsafe_inc(totalLoans);

        IERC721(contractAddress).transferFrom(msg.sender, address(this), id);

        loans[totalLoans] = Loan({
            id: totalLoans,
            contractId: id,
            contractAddress: contractAddress,
            owner: msg.sender,
            bidder: address(0),
            maxAmount: maxAmount,
            interest: interest,
            bid: 0,
            bidDrawn: 0,
            startTime: block.timestamp,
            endTime: endDate,
            firstBid: 0,
            lastBid: 0,
            lastInterestPaid: 0
        });

        loanedNFTs[msg.sender].push(totalLoans);

        emit Created(totalLoans, msg.sender);

        return totalLoans;
    }


    /**
     * @dev See {IWaffy-drawLoan}.
     */
    function drawLoan(uint256 id, uint256 amountToDraw) external override payable{
        Loan storage loan = loans[id];

        require(loan.owner == msg.sender, "Only the owner can draw the loan");
        require(loan.id != 0, "Loan does not exist");
        require(loan.bid != 0, "Loan has no bids");
        require(loan.bidDrawn < loan.bid, "Loan has already been drawn");
        require(loan.endTime > block.timestamp, "Loan has already ended");

        require(loan.bidDrawn + amountToDraw <= loan.bid, "Exceeds max amount");

        loan.bidDrawn += amountToDraw;

        (bool sent, ) = payable(loan.owner).call{value: amountToDraw}("");
        require(sent, "Failed to draw");

        emit Drawn(id);
    }


    /**
     * @dev See {IWaffy-repayLoan}.
     */
    function repayLoan(uint256 id) external nonReentrant override payable{
        Loan storage loan = loans[id];

        require(loan.id != 0, "Loan does not exist");
        require(loan.bid != 0, "Loan has no bids");

        if(msg.sender == loan.owner){
            require(loan.endTime <= block.timestamp, "Loan isn't expired yet");
        }
        else{
            require(loan.endTime + 3600 < block.timestamp, "Wait for 1 hour of grace period before repaying a loan");
        }

        uint256 totalAmount = loan.bidDrawn + calInterest(id);

        require(msg.value >= totalAmount, "Insufficient funds");

        (bool sent,) = payable(loan.bidder).call{value: totalAmount}("");
        require(sent, "Failed to repay");

        IERC721(loan.contractAddress).transferFrom(address(this), msg.sender, loan.contractId);

        emit Repaid(id, msg.sender);
    }


    /**
     * @dev See {IWaffy-cancelLoan}.
     */
    function cancelLoan(uint256 id) external override{
        Loan storage loan = loans[id];

        require(loan.id != 0, "Loan does not exist");
        require(loan.owner == msg.sender, "You are not the owner");
        require(loan.bid == 0, "Loan has bids");
        require(loan.endTime > block.timestamp, "Loan is already expired");

        IERC721(loan.contractAddress).transferFrom(address(this), loan.owner, loan.contractId);

        loan.endTime = block.timestamp;

        emit Cancelled(id);
    }


    /**
     * @dev See {IWaffy-underWriteLoan}.
     */
    function underWriteLoan(uint256 id) external nonReentrant override payable{
        Loan storage loan = loans[id];

        require(loan.id != 0, "Loan does not exist");
        require(loan.endTime > block.timestamp, "Loan is already expired");

        if(loan.bid == 0){
            require(msg.value <= loan.maxAmount, "Excessive funds");
            loan.bid = msg.value;
            loan.firstBid = block.timestamp;
        }
        else{
            uint256 totalInterest = calInterest(id);
            uint256 totalAmount = loan.bid + totalInterest - loan.bidDrawn;

            require(msg.value >= totalAmount, "Insufficient funds");
            require(msg.value <= loan.maxAmount + totalInterest, "Excessive funds");

            (bool sent, ) = payable(loan.bidder).call{value: totalAmount}("");
            require(sent == true, "Failed to underwrite");

            loan.bid = msg.value - totalInterest;
            loan.lastInterestPaid += totalInterest;
        }

        loan.bidder = msg.sender;
        loan.lastBid = block.timestamp;

        emit Underwritten(id, msg.sender, msg.value);
    }


    /**
     * @dev See {IWaffy-seizeLoan}.
     */
    function seizeLoan(uint256 id) external nonReentrant override payable{
        Loan storage loan = loans[id];

        require(loan.id != 0, "Loan does not exist");
        require(loan.endTime + 3600 < block.timestamp, "Wait for 1 hour of grace period before seizing a loan");

        IERC721(loan.contractAddress).transferFrom(address(this), loan.bidder, loan.contractId);

        // (bool sent,) = payable(msg.sender).call{value: totalAmount}("");
        // require(sent, "Failed to reward the seizer");

        emit Seized(id, msg.sender);
    }


    /**
     * @dev Function to get details about a specific loan.
     */
    function getLoan(uint256 id) public view returns (Loan memory){
        return loans[id];
    }


    /**
     * @dev Function to get details about a specific loan.
     */
    function getLoans(address user) public view returns (uint256[] memory){
        return loanedNFTs[user];
    }


    /**
     * @dev Function to calculate Interest on a loan
     */
    function calInterest(uint256 id) public view returns (uint256){
        Loan memory loan = loans[id];

        uint256 durationLastBid = block.timestamp - loan.lastBid;
        uint256 durationFirstBid = loan.endTime - loan.firstBid;

        int128 duration = ABDKMath64x64.divu(durationLastBid, durationFirstBid);

        int128 interestRate = ABDKMath64x64.divu(loan.interest, 100);
        uint256 totalInterest = ABDKMath64x64.mulu(interestRate, loan.bid);

        return loan.lastInterestPaid + ABDKMath64x64.mulu(duration, totalInterest);
    }

    receive() external payable {
        revert();
    }


    /**
     * Library Functions
     */

    function unsafe_inc(uint256 x) private pure returns (uint256) {
        unchecked { return x + 1; }
    }
}
