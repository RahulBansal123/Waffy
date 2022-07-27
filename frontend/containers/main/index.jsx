import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import ExploreCard from '../../components/card/explore';
import Loader from '../../utils/loader';

const Main = ({ contract }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [contract, router.query.fetchAgain]);

  useEffect(() => {
    if (contract) {
      getData();
    }
  }, [router.query.fetchAgain, contract]);

  return (
    <div className="container py-4">
      <div className="my-20 font-mono">
        <h1 className="text-center text-orange-100 text-2xl md:text-5xl font-semibold">
          Explore NFT pools
        </h1>
        <p className="text-center text-gray-300 mx-auto w-1/2 my-8">
          Lend your NFTs. Fixed Interest Rate. No fees. Get grace period of 1
          hour to repay loan. Highly secured.
        </p>
      </div>
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
  );
};

export default Main;
