import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Web3 from 'web3';
import axios from 'axios';

import { fetchBidsData, fetchUserData } from './actions';
import { unixToDate } from '../../utils';
import ExploreCard from '../../components/card/explore';
import Loader from '../../utils/loader';

function InfoContainer({ contract }) {
  const [bidsData, setBidsData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bids = await fetchBidsData();
        const user = await fetchUserData();

        setBidsData(bids?.data?.bids);
        setUserData(user?.data?.accounts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const totalLoans = await contract.methods.totalLoans().call();
    const lowerBound = totalLoans - 10 > 0 ? totalLoans - 10 : 0;
    const upperBound = totalLoans;

    const temp = [];

    for (let index = lowerBound; index <= upperBound; index++) {
      const loanData = await contract.methods.getLoan(index).call();
      if (loanData && loanData[1] !== '0') {
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
    setIsLoading(false);
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getData();
    }
  }, [contract]);

  const formattedUserData = useMemo(() => {
    if (userData) {
      const data = {};
      userData.map((day) => {
        if (!data[day.date]) {
          data[day.date] = {
            count: 1,
          };
        } else {
          data[day.date].count += 1;
        }
      });
      return Object.keys(data).map((key) => {
        return {
          date: unixToDate(key),
          count: data[key].count,
        };
      });
    } else {
      return [];
    }
  }, [userData]);

  console.log('data', bidsData);

  return (
    <main className="mt-10 mb-20 w-5/6 mx-auto">
      <h1 className="text-xl font-semibold text-gray-100 text-center mb-14">
        Waffy Overview
      </h1>

      <h1 className="text-xl text-gray-100 text-center mb-14">Users' growth</h1>
      <div className="w-3/4 h-80 mx-auto">
        <ResponsiveContainer width="90%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={formattedUserData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {bidsData && (
        <div className="my-5 w-full bg-black/30 px-5 py-3 rounded-xl flex justify-between items-center">
          <p className="text-white">
            Total Bids: {`${bidsData[0]?.totalBidsCreated}`}
          </p>
          <p className="text-white">
            Total Bid's Volume:{' '}
            {Web3.utils.fromWei(`${bidsData[0]?.bidsVolumeMATIC}`)} MATIC
          </p>
          <p className="text-white">
            Total Intereset Paid:{' '}
            {Web3.utils.fromWei(`${bidsData[0]?.interestPaidMATIC}`)} MATIC
          </p>
        </div>
      )}

      <div className="my-10">
        <h1 className="text-lg text-gray-200">Top Loans</h1>

        {isLoading && (
          <div className="w-full">
            <Loader />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {data &&
            data.map((item, index) => <ExploreCard key={index} data={item} />)}
        </div>
      </div>
    </main>
  );
}

export default InfoContainer;
