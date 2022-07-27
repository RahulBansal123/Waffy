import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import Link from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import CornerRibbon from 'react-corner-ribbon';
import { toast } from 'react-toastify';

import { fetchNFT } from './actions';
import { fetchUserData } from '../dashboard/actions';

function LoanMarket({ contract }) {
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const web3 = new Web3(library.provider);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [amount, setAmount] = useState('');
  const [totalToRepay, setTotalToRepay] = useState(0);
  const [owner, setOwner] = useState('');

  const getData = useCallback(async () => {
    const loanData = await contract.methods.getLoan(id).call();
    if (loanData) {
      setData(loanData);
    }
  }, [id]);

  const getNFTData = useCallback(async () => {
    try {
      dispatch(fetchNFT(data.contractAddress, data.contractId)).then((res) => {
        if (res) {
          setData((prev) => ({
            ...prev,
            title: res.nft_data?.[0].external_data.name,
            description: res.nft_data?.[0].external_data.description,
            image: res.nft_data?.[0].external_data.image,
          }));
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [id, data.contractAddress, data.contractId]);

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserData();
      if (Array.isArray(userData.data.accounts)) {
        const user = userData.data.accounts.find(
          (i) => i.owner.toLowerCase() === data?.owner?.toLowerCase()
        );
        if (user) {
          setOwner(user.owner);
        }
      }
    };
    fetchUser();
  }, [data.owner]);

  useEffect(() => {
    if (data.contractId && data.contractAddress) getNFTData();
  }, [data.contractId, data.contractAddress]);

  useEffect(() => {
    const calculateTotal = async () => {
      if (data && data.id) {
        const totalInterest = await contract.methods
          .calInterest(data.id)
          .call();

        const totalAmount = Web3.utils
          .toBN(data?.bidDrawn)
          .add(Web3.utils.toBN(totalInterest));

        setTotalToRepay(totalAmount.toString());
      }
    };

    calculateTotal();

    const interval = setInterval(() => {
      calculateTotal();
    }, 1500);

    return () => clearInterval(interval);
  }, [data]);

  const bid = async (e) => {
    const { id } = e.target;
    try {
      let totalAmount = 0;
      if (data.firstBid === '0') {
        totalAmount = Web3.utils.toWei(`${amount}`, 'ether');
      } else {
        const newAmount = Web3.utils.toBN(Web3.utils.toWei(`${amount}`));
        const totalInterest = Web3.utils.toBN(`${totalToRepay}`);

        totalAmount = newAmount.add(totalInterest).toString();
      }
      setLoading((prev) => ({ ...prev, [id]: true }));
      const gas = await contract.methods.underWriteLoan(data.id).estimateGas({
        from: account,
        value: totalAmount,
      });

      const gasPrice = await web3.eth.getGasPrice();

      const tx = await contract.methods.underWriteLoan(data.id).send({
        from: account,
        value: totalAmount,
        gas: gas,
        gasPrice: gasPrice,
      });

      console.log(tx);
      await getData();
    } catch (error) {
      toast.error('Some error occured. Check console for more details');
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const repay = async (e) => {
    const { id } = e.target;
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));

      const gas = await contract.methods.repayLoan(data.id).estimateGas({
        from: account,
        value: `${totalToRepay}`,
      });

      const gasPrice = await web3.eth.getGasPrice();

      const tx = await contract.methods.repayLoan(data.id).send({
        from: account,
        value: `${totalToRepay}`,
        gas: gas,
        gasPrice: gasPrice,
      });

      console.log(tx);
      await getData();
    } catch (error) {
      toast.error('Some error occured. Check console for more details');
      console.error(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const cancel = async (e) => {
    const { id } = e.target;
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));

      const gas = await contract.methods.cancelLoan(data.id).estimateGas({
        from: account,
      });
      const gasPrice = await web3.eth.getGasPrice();

      const tx = await contract.methods
        .cancelLoan(data.id)
        .send({ from: account, gas: gas, gasPrice: gasPrice });

      console.log(tx);
      await getData();
    } catch (error) {
      toast.error('Some error occured. Check console for more details');
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const seize = async (e) => {
    const { id } = e.target;
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));

      const gas = await contract.methods.seizeLoan(data.id).estimateGas({
        from: account,
      });

      const gasPrice = await web3.eth.getGasPrice();

      const tx = await contract.methods
        .seizeLoan(data.id)
        .send({ from: account, gas: gas, gasPrice: gasPrice });

      console.log(tx);
      await getData();
    } catch (error) {
      toast.error('Some error occured. Check console for more details');
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const draw = async (e) => {
    const { id } = e.target;
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));

      const drawAmount = Web3.utils.toWei(`${amount}`);

      const gas = await contract.methods
        .drawLoan(data.id, drawAmount)
        .estimateGas({
          from: account,
        });
      const gasPrice = await web3.eth.getGasPrice();

      const tx = await contract.methods.drawLoan(data.id, drawAmount).send({
        from: account,
        gas: gas,
        gasPrice: gasPrice,
      });

      await getData();
    } catch (error) {
      toast.error('Some error occured. Check console for more details');
      console.error(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const startDate = new Date(parseInt(data?.startTime) * 1000);
  const endDate = new Date(parseInt(data?.endTime) * 1000);
  const isEnded = endDate < new Date();

  const LoadingButton = ({ children, id, onClick, disabled }) => (
    <button
      className="mt-5 bg-[#1e96a6] w-full text-center py-2 px-5 rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a6c4] disabled:cursor-not-allowed"
      id={id}
      disabled={disabled}
      onClick={onClick}
    >
      {loading[id] ? 'Loading...' : children}
    </button>
  );

  return (
    <div className="w-full md:w-9/12 py-4 grid grid-cols-1 md:grid-cols-3 text-gray-500">
      {/* Left Side */}
      <div className="border relative col-span-2 mx-5 p-5 rounded-2xl">
        {isEnded && (
          <CornerRibbon backgroundColor="#ff9d5c">Ended</CornerRibbon>
        )}

        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-3xl text-white font-sans">
            {data.title}
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center my-5 justify-between">
          <Link href={`/user/${owner}`}>
            <a className="text-center truncate text-xs border border-gray-100 text-gray-100 p-2 rounded-xl my-1 md:my-0 md:mx-2 flex flex-col">
              <span className="font-bold">Owner:</span>{' '}
              <span className="hover:underline">
                {data?.owner?.slice(0, 16)}
                ...
              </span>
            </a>
          </Link>
          <p className="text-center text-xs border border-gray-100 text-gray-100 p-2 rounded-xl my-1 md:my-0 md:mx-2">
            <span className="font-bold">Loan created on:</span>{' '}
            {startDate.toLocaleDateString()}
          </p>
          <p className="text-center text-xs border border-gray-100 text-gray-100 p-2 rounded-xl my-1 md:my-0 md:mx-2">
            <span className="font-bold">
              {isEnded ? 'Loan terminated on' : 'Loan terminating on'}:
            </span>{' '}
            {endDate.toLocaleDateString()}
          </p>
        </div>

        <div className="mb-5 w-full h-72 bg-gray-200 rounded-xl relative">
          <img
            src={data.image ?? '/placeholder.png'}
            className="w-full h-full object-contain"
          />
        </div>

        <span className="font-sans text-gray-100">{data?.description}</span>

        <p className="text-base text-gray-100 mt-1 py-2 truncate">
          NFT Contract Address: {data?.contractAddress}
        </p>

        <p className="text-base text-gray-100 py-2 truncate">
          NFT Token ID: {data?.contractId}
        </p>

        <p className="text-base text-gray-100 py-2">
          Interest Rate: {data?.interest}%
        </p>

        <p className="text-base text-gray-100 py-2">
          Max loan bid:{' '}
          {data?.maxAmount ? Web3.utils.fromWei(data?.maxAmount) : 0} MATIC
        </p>

        <p className="text-base text-gray-100 py-2">
          Amount withdrawn from top bid:{' '}
          {data?.bidDrawn ? Web3.utils.fromWei(data.bidDrawn) : 0} MATIC
        </p>
      </div>

      {/* Right Side */}

      <div className="border mx-5 p-5 rounded-2xl">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-col md:flex-row items-center justify-between mb-3 text-gray-200">
              <p className="text-sm font-bold flex-1">Current Lender:</p>
              <Link
                href={`https://mumbai.polygonscan.com/address/${data?.bidder}`}
              >
                <a
                  target="_blank"
                  className="flex-1 text-sm hover:underline truncate"
                >
                  {data?.bidder}
                </a>
              </Link>
            </div>

            <div className="my-3 flex flex-col md:flex-row items-center justify-between text-gray-200">
              <p className="text-sm font-bold">Current Lender's Bid:</p>
              {data?.bid && (
                <p className="text-sm truncate">
                  {Web3.utils.fromWei(`${data?.bid}`).slice(0, 6)} MATIC
                </p>
              )}
            </div>

            <div className="my-3 flex flex-col md:flex-row items-center justify-between text-gray-200">
              <p className="text-sm font-bold">Total Amount to Repay:</p>
              <p className="text-sm truncate whitespace-pre-wrap ml-1">
                {Web3.utils.fromWei(`${totalToRepay}`).slice(0, 6)} MATIC
              </p>
            </div>
          </div>
          <div>
            <h5 className="mt-5 mb-5 font-semibold border text-center text-[#1e96a6] p-2 rounded-xl">
              Make a Bid
            </h5>

            <div className="w-full">
              <input
                type="number"
                min={0}
                placeholder={
                  account === data?.owner
                    ? 'Amount to draw (in MATIC)'
                    : 'Enter bid (in MATIC)'
                }
                className="w-full border px-3 py-2 rounded-xl outline-none"
                disabled={isEnded}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {account !== data?.owner && (
              <button
                className="mt-5 bg-[#1e96a6] w-full text-center py-2 px-5 rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a693] disabled:cursor-not-allowed"
                id={0}
                disabled={isEnded || loading[0]}
                onClick={isEnded ? null : bid}
              >
                {isEnded
                  ? 'Not Available'
                  : loading[0]
                  ? 'Loading...'
                  : 'Make Bid 🚀'}
              </button>
            )}

            {account === data?.owner && (
              <button
                className="mt-5 bg-[#1e96a6] w-full text-center py-2 px-5 rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a6c4] disabled:cursor-not-allowed"
                id={4}
                disabled={loading[4] || isEnded || data.bid === '0'}
                onClick={draw}
              >
                {loading[4] ? 'Loading...' : 'Draw Loan'}
              </button>
            )}

            <LoadingButton
              id={1}
              onClick={repay}
              disabled={loading[id] || !isEnded}
            >
              Repay Loan
            </LoadingButton>

            {account === data?.owner && (
              <LoadingButton
                id={2}
                onClick={cancel}
                disabled={loading[id] || isEnded || data.bid !== '0'}
              >
                Cancel Loan
              </LoadingButton>
            )}

            <button
              className="mt-5 bg-[#1e96a6] w-full text-center py-2 px-5 rounded-xl text-white hover:shadow-md hover:bg-[#1e96a6c4] transition-all disabled:bg-[#1e96a6c4] disabled:cursor-not-allowed"
              id={3}
              disabled={loading[3] || !isEnded || data.bid === '0'}
              onClick={seize}
            >
              {loading[3] ? 'Loading...' : 'Seize Loan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanMarket;
