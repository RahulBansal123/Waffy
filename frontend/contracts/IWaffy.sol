
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IWaffy {
    
     /**
     * @dev Emitted when new NFT-collateralized loan is created with id `id` 
     * `sender`
     */
    event Created(uint256 id, address indexed sender);

    /**
     * @dev Emitted when amount is withdrawn from the latest bid of loan with
     * id `id`
     */
    event Drawn(uint256 id);

    /**
     * @dev Emitted when loan with id `id` is repaid by `sender`
     *
     */
    event Repaid(uint256 id, address indexed sender);

    /**
     * @dev Emitted when loan with id `id` is cancelled by its owner
     *
     */
    event Cancelled(uint256 id);

    /**
     * @dev Emitted when loan with id `id` is underwritten by
     * `sender`
     */
    event Underwritten(uint256 id, address indexed sender, uint256 amount);

     /**
     * @dev Emitted when loan with id `id` is seized by
     * `seizer`
     */
    event Seized(uint256 id, address indexed seizer);

    /**
    * @dev Emitted when loan with id `id` is defunded by
    * `sender`
    */
    event Registered(address indexed owner, bytes32 name);


     /**
     * @dev Create a new NFT-collateralized loan with NFT id `id` 
     * and NFT contract address of `contractAddress`. Interest rate and
     * maximum amount to be taken as loan is fixed 
     *
     *
     * Returns the id of the newly created loan
     *
     * Emits a {Created} event.
     */
    function createLoan(uint256 id, address contractAddress, uint256 interest, uint256 maxAmount, uint256 endDate) external payable returns (uint256);


    /**
     * @dev amount `amount` is withdrawn from the latest bid of
     * loan with id `id` by the owner of the NFT
     *
     *
     * Emits a {Drawn} event.
     */
    function drawLoan(uint256 id, uint256 amountToDraw) external payable;


    /**
     * @dev Allows anyone to repay the loan with id `id`
     *
     * NOTE: This function can be executed by the owner of the NFT 
     * or by any user after the timeframe of 1 hour after the loan was
     * terminated.
     *
     * IMPORTANT: NFT will be transaferd to the user repaying the loan
     *
     * Emits a {Repaid} event.
     */
    function repayLoan(uint256 id) external payable;


    /**
     * @dev Allows the owner of the NFT to cancel the loan with id `id`
     *
     *
     * NOTE: This function can be executed only if there are no bids
     *
     * Emits a {Cancelled} event.
     */
    function cancelLoan(uint256 id) external;


    /**
     * @dev Allows the bidders to underwrite the top bids
     * on the loan with id `id`
     *
     * Emits a {Underwritten} event.
     */
    function underWriteLoan(uint256 id) external payable;


    /**
     * @dev Allows anyone to seize the loan with id `id`
     *
     * Emits a {Seized} event.
     */
    function seizeLoan(uint256 id) external payable;
}