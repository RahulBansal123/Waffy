import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';

const Dashboard = ({ contract, data }) => {
  const router = useRouter();
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const cancel = async () => {
    try {
      const web3 = new Web3(library.provider);

      setLoading(true);
      const gas = await contract.methods.cancelLoan(data.id).estimateGas({
        from: account,
      });

      const gasPrice = await web3.eth.getGasPrice();

      await contract.methods
        .cancelLoan(data.id)
        .send({ from: account, gas, gasPrice });

      await getData();
    } catch (error) {
      toast.error(
        'Some error occurred. Please check the console for more details.'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="box-border w-full flex overflow-hidden rounded-xl bg-gray-200 my-8">
      <div
        className="h-full flex-none w-1/3 !bg-cover overflow-hidden"
        style={{
          background: `#fff url(${
            data.nft_img ?? '/placeholder.png'
          }) no-repeat center`,
        }}
        title="nft"
      ></div>

      <div className="flex-1 p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {data.title ?? data.contract_name}
          </div>
          <p className="text-gray-700 text-base">{data.description}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            className="btn border-2 border-orange-300 text-orange-300 hover:bg-orange-200 hover:text-white transition-all ease-in-out disabled:bg-orange-100 disabled:cursor-not-allowed"
            disabled={loading}
            onClick={cancel}
          >
            {loading ? 'Loading...' : 'Cancel Loan'}
          </button>

          <button
            className="btn border-2 border-orange-300 bg-orange-300 hover:bg-orange-200 hover:border-orange-200"
            onClick={() => router.push(`/${data.id}`)}
          >
            View Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
