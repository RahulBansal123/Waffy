import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchSeizeData, fetchUserData } from './actions';

import DashboardCard from '../../components/card/dashboard';

const Dashboard = ({ contract, web3 }) => {
  const [data, setData] = useState([]);
  const { account } = useWeb3React();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getData = useCallback(async () => {
    const userLoans = await contract.methods.getLoans(account).call();

    const userData = await fetchUserData();
    const totalSeized = await fetchSeizeData(account);
    setTotal(totalSeized);

    if (Array.isArray(userData.data.accounts)) {
      const user = userData.data.accounts.find(
        (i) => i.owner.toLowerCase() === account.toLowerCase()
      );

      if (user) {
        setName(web3.utils.hexToAscii(user.name));
      }
    }

    const temp = [];

    for (let index = 0; index < userLoans.length; index++) {
      const loanData = await contract.methods.getLoan(userLoans[index]).call();

      if (loanData && loanData.contractId !== '0') {
        try {
          const response = await axios.get(
            `https://api.covalenthq.com/v1/80001/tokens/${loanData.contractAddress}/nft_metadata/${loanData.contractId}/?quote-currency=USD&format=JSON&key=ckey_0f61c33f81884e5cb35ed669e17`
          );

          if (response.data) {
            const nft = response.data.data.items[0];
            temp.push({
              ...loanData,
              title: nft.nft_data?.[0].external_data.name,
              description: nft.nft_data?.[0].external_data.description,
              owner: nft.nft_data?.[0].external_data.owner,
              nft_img: nft.nft_data?.[0].external_data.image,
              contract_name: nft.contract_name,
            });
          } else {
            temp.push(loanData);
          }
        } catch (error) {
          temp.push(loanData);
          console.error(error);
        }
      }
    }

    setData(temp);
  }, [account]);

  useEffect(() => {
    getData();
  }, [account]);

  const updateUser = async () => {
    setLoading(true);
    try {
      const res = await actions.updateUser(name);
      toast.success('User updated successfully');
      console.log(res);
      setLoading(false);
    } catch (error) {
      toast.error('Error updating user');
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="container py-4">
      <div className="my-20 font-mono">
        <h1 className="text-center text-orange-100 text-2xl md:text-5xl font-semibold">
          Dashboard
        </h1>
        <p className="text-center text-gray-300 mx-auto w-1/2 my-8">
          View your lended NFTs, Draw Loan, or Cancel Loan
        </p>
      </div>
      <h1 className="text-orange-100 text-xl md:text-4xl font-semibold">
        Settings
      </h1>
      <div className="my-5">
        <div className="w-full md:w-1/3 mx-auto">
          <p className="inline-block mb-5 text-gray-200">
            Total NFTs Seized: {total}
          </p>
        </div>

        <div className="w-full md:w-1/3 mx-auto">
          <label
            htmlFor="address"
            className="form-label inline-block mb-2 text-gray-200"
          >
            Address
          </label>
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 cursor-not-allowed"
            id="address"
            placeholder="Address"
            value={account}
            disabled
          />
        </div>

        <div className="w-full md:w-1/3 mt-8 mx-auto">
          <label
            htmlFor="name"
            className="form-label inline-block mb-2 text-gray-200"
          >
            Name
          </label>
          <input
            type="text"
            className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3 mt-8 mx-auto text-center">
          <button
            className="btn bg-orange-300 hover:bg-orange-200 disabled:bg-orange-200 disabled:cursor-not-allowed"
            onClick={updateUser}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update Name'}
          </button>
        </div>
      </div>

      <h1 className="mt-4 text-orange-100 text-xl md:text-4xl font-semibold">
        My Loans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {data?.map((item) => (
          <DashboardCard data={item} contract={contract} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
