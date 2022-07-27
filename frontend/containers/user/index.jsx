import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Blockies from 'react-blockies';
import ReactStars from 'react-stars';
import Web3 from 'web3';
import { useDispatch } from 'react-redux';

import Loader from '../../utils/loader';
import ExploreCard from '../../components/card/explore';
import { fetchSeizeData, fetchUserData } from '../dashboard/actions';
import { fetchPoaps } from '../loan/actions';
import axios from 'axios';
import { unixToDate } from '../../utils';

const PoapCard = ({ poap }) => (
  <div className="rounded-xl shadow border p-4">
    <div className="flex justify-between">
      <img src={poap.event.image_url} alt="poap" className="w-3/4 mx-auto" />
    </div>
    <h2 className="mt-8 mb-4 text-xl text-center font-semibold">
      {poap.event.name}
    </h2>
    <p className="text-base text-center">{poap.event.description}</p>
  </div>
);

const User = ({ contract }) => {
  const router = useRouter();
  const { account } = router.query;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({ owner: '', name: 'John' });
  const [poaps, setPoaps] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const userData = await fetchUserData();
    if (Array.isArray(userData.data.accounts)) {
      const user = userData.data.accounts.find(
        (i) => i.owner.toLowerCase() === account?.toLowerCase()
      );

      if (user?.id) {
        console.log('userinside', user);
        const name = Web3.utils.toUtf8(user.name);
        setUser({ ...user, name });

        const userPoaps = await dispatch(fetchPoaps(user.owner));
        setPoaps(userPoaps);

        const userLoans = await contract.methods.getLoans(user.owner).call();
        const totalSeized = await fetchSeizeData(user.owner);
        setTotal(totalSeized);

        const temp = [];

        for (let index = 0; index < userLoans.length; index++) {
          const loanData = await contract.methods
            .getLoan(userLoans[index])
            .call();

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
      }
    }

    setIsLoading(false);
  }, [account]);

  useEffect(() => {
    getData();
  }, [account]);

  console.log('useroutside', user);

  return (
    <main className="container py-4 flex flex-col md:flex-row">
      <div className="flex-grow">
        <div className="relative w-full h-60 custom-bg rounded-xl bg-black shadow shadow-white">
          <div className="absolute -bottom-5 left-5 w-14 h-14 flex items-center">
            <Blockies size={40} className="rounded-full" />
          </div>

          <h1 className="absolute bottom-4 right-8 text-xl md:text-5xl z-10 text-white">
            {user.name}
          </h1>
        </div>

        <div className="mt-20">
          <div className="w-full md:w-1/2 mx-auto">
            <p className="my-5 text-xl text-left text-gray-200">
              <span className="font-bold">Address:</span> {user.owner}
            </p>

            <p className="my-5 flex text-xl text-left text-gray-200">
              <span className="font-bold mr-2">Credibility:</span>
              <ReactStars count={5} size={24} value={2} edit={false} />
            </p>

            <p className="my-5 text-xl text-left text-gray-200">
              <span className="font-bold">Total NFTs Seized:</span> {total}
            </p>

            <p className="my-5 text-xl text-left text-gray-200">
              <span className="font-bold">Joined On: </span>
              {unixToDate(user.date)}
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl">
            {user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}'s Loans
          </h2>

          {isLoading && (
            <div className="w-full">
              <Loader />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {data &&
              !isLoading &&
              data.map((item, index) => (
                <ExploreCard key={index} data={item} />
              ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl">
            {user.name?.charAt(0).toUpperCase() + user.name?.slice(1)}'s POAPs
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 md:gap-x-12 gap-y-12">
            {poaps &&
              poaps.map((item, index) => <PoapCard key={index} poap={item} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
