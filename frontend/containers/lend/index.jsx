import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Web3 from 'web3';

import { fetchNFTs } from './actions';
import Loader from '../../utils/loader';
import { getERC721Contract } from '../../lib';
import Contract from '../../abis/Waffy.json';

const deployedAddress = Contract.networks[80001].address;

const P = ({ children }) => (
  <p className="text-gray-200 text-center text-base md:text-xl my-5">
    {children}
  </p>
);

const InputLabel = (props) => {
  const { label } = props;
  return (
    <div className="my-8">
      <label className="text-gray-200 text-lg ml-1 font-bold">{label}</label>
      <input
        className="border-2 border-white rounded-2xl text-gray-700 w-full mt-2 px-3 py-1.5 text-base font-normal transition ease-in-out bg-white bg-clip-padding focus:bg-white focus:border-orange-100 focus:outline-none !font-mono"
        {...props}
      />
    </div>
  );
};

const Main = ({ contract, web3 }) => {
  const { account } = useWeb3React();
  const router = useRouter();
  const dispatch = useDispatch();

  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLendLoading, setIsLendLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const [values, setValues] = useState({
    interest: null,
    duration: new Date().toISOString().substring(0, 10),
    amount: null,
  });

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(fetchNFTs(account)).then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res && Array.isArray(res)) {
          const temp = res.filter(
            (i) =>
              i.type === 'nft' &&
              i.nft_data !== null &&
              i.nft_data?.[0].token_id !== '0'
          );
          setNfts(temp);
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [account]);

  useEffect(() => {
    fetch();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setValues({
      ...values,
      duration: new Date(tomorrow).toISOString().substring(0, 10),
    });
  }, [account]);

  const lend = async () => {
    setIsLendLoading(true);
    try {
      const endTime = Math.floor(new Date(values.duration).getTime() / 1000);

      // approve NFT
      const nftContract = await getERC721Contract(
        web3,
        selected.contract_address
      );

      const gasPrice = await web3.eth.getGasPrice();

      const gasApprove = await nftContract.methods
        .approve(deployedAddress, selected.nft_data?.[0].token_id)
        .estimateGas({
          from: account,
        });

      await nftContract.methods
        .approve(deployedAddress, selected.nft_data?.[0].token_id)
        .send({ from: account, gas: gasApprove, gasPrice });

      const gas = await contract.methods
        .createLoan(
          selected.nft_data?.[0].token_id,
          selected.contract_address,
          parseInt(values.interest),
          Web3.utils.toWei(values.amount, 'ether'),
          endTime
        )
        .estimateGas({
          from: account,
        });

      await contract.methods
        .createLoan(
          selected.nft_data?.[0].token_id,
          selected.contract_address,
          parseInt(values.interest),
          Web3.utils.toWei(values.amount, 'ether'),
          endTime
        )
        .send({ from: account, gas, gasPrice });

      toast.success('NFT-collateralized loan created');
      fetch();
      setIsLendLoading(false);

      router.push({ pathname: '/home', query: { fetchAgain: true } });
    } catch (error) {
      setIsLendLoading(false);
      toast.error('Some error occured. Check console for more details.');
      console.error(error);
    }
  };

  return (
    <div className="container pb-4 flex flex-col md:flex-row">
      <div className="mt-10 mb-20 font-mono w-full">
        {selected && (
          <div className="w-full text-right mb-10">
            <button
              className="btn border text-gray-200 hover:bg-white hover:text-black transition-all"
              onClick={() => setSelected(null)}
            >
              Back
            </button>
          </div>
        )}

        <h1 className="text-center text-orange-100 text-2xl md:text-5xl font-semibold">
          {selected ? 'Selected NFT' : 'Choose NFT'}
        </h1>

        {!selected && (
          <p className="text-center text-gray-300 mx-auto w-1/2 my-8">
            Select one of your NFTs on polygon testnet and lend it with Waffy.
          </p>
        )}

        {isLoading && (
          <div className="mt-10">
            <Loader />
          </div>
        )}
        {!isLoading && nfts?.length === 0 && (
          <p className="text-center text-gray-300 mx-auto w-1/2 my-8">
            Whoopss! No NFTs Found.
          </p>
        )}

        {!isLoading && !selected && nfts?.length !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="border rounded-xl overflow-hidden shadow-lg min-h-72 my-10 cursor-pointer transition-all ease-in-out duration-500 hover:scale-105"
                onClick={() => setSelected(nft)}
              >
                <div className="relative h-3/5 w-full bg-gray-50">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={
                      nft.nft_data?.[0]?.external_data?.image ??
                      '/placeholder.png'
                    }
                  />
                </div>
                <div className="mt-5 px-5">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h6 className="font-semibold">
                        {nft.nft_data?.[0]?.external_data?.name ??
                          nft.contract_name}
                      </h6>
                    </div>
                    <button
                      // onClick={() =>
                      //   router.push(
                      //     nft.nft_data?.[0]?.external_data?.external_url
                      //   )
                      // }
                      className="btn bg-orange-200 hover:bg-orange-100"
                    >
                      View Item
                    </button>
                  </div>

                  <p className="mt-4">
                    {nft.nft_data?.[0]?.external_data?.description}
                  </p>

                  <div className="flex mt-5">
                    <div className="relative w-6 h-6">
                      <img
                        className="w-full h-full object-cover rounded-full bg-white"
                        src={'/placeholder.png'}
                      />
                    </div>
                    <div className="mx-4">
                      <h6 className="text-gray-200">
                        {nft.nft_data?.[0]?.owner?.slice(0, 20)}...
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && selected && (
          <div className="min-h-72 my-10">
            <div className="relative h-[300px] w-full bg-gray-200">
              <img
                className="w-full h-full object-contain rounded-xl"
                src={
                  selected.nft_data?.[0]?.external_data?.image ??
                  '/placeholder.png'
                }
              />
            </div>
            <h5 className="text-orange-100 font-semibold text-center text-xl md:text-5xl font-mono my-8">
              {selected.nft_data?.[0]?.external_data?.name}
            </h5>
            <P>{selected.nft_data?.[0]?.external_data?.description}</P>
            <P>Address: {selected.contract_address}</P>

            <div className="w-full md:w-1/2 mx-auto">
              <InputLabel
                label="Interest Rate"
                placeholder="Maximum interest rate(in %) you are willing to pay"
                name="interest"
                type="number"
                value={values.interest}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
              <InputLabel
                label="Amount"
                placeholder="Maximum tokens to be taken as loan"
                name="amount"
                type="number"
                value={values.amount}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
              <InputLabel
                label="Duration"
                placeholder="Loan Termination Date"
                name="duration"
                type="date"
                value={values.duration}
                min={new Date().toISOString().substring(0, 10)}
                onChange={(e) => {
                  if (
                    new Date(e.target.value).getTime() > new Date().getTime()
                  ) {
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }
                }}
              />

              <div className="text-center">
                <button
                  className="btn bg-orange-200 hover:bg-orange-100"
                  onClick={lend}
                  disabled={isLendLoading}
                >
                  {isLendLoading ? <Loader /> : 'Lend NFT'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
