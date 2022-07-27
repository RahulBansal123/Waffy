import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Blockies from 'react-blockies';
import CornerRibbon from 'react-corner-ribbon';
import Web3 from 'web3';

import { fetchUserData } from '../../containers/dashboard/actions';

const Explore = ({ data }) => {
  const router = useRouter();

  const endDate = new Date(parseInt(data[10]) * 1000);
  const isEnded = endDate < new Date();
  const [owner, setOwner] = useState('John Doe');

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserData();
      if (Array.isArray(userData.data.accounts)) {
        const user = userData.data.accounts.find(
          (i) => i.owner.toLowerCase() === data?.owner?.toLowerCase()
        );
        if (user) {
          const name = Web3.utils.toAscii(user.name);
          setOwner(name);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      className="relative box-border w-full flex overflow-hidden rounded-xl bg-gray-100 my-8 hover:scale-105 transition-all ease-in-out cursor-pointer"
      onClick={() => router.push(`/${data[0]}`)}
    >
      {isEnded && <CornerRibbon backgroundColor="#ff9d5c">Ended</CornerRibbon>}
      <div
        className="h-full flex-none w-1/3 !bg-cover overflow-hidden"
        style={{
          background: `#fff url(${
            data.nft_img ?? '/placeholder.png'
          }) no-repeat center`,
        }}
        title="nft"
      ></div>

      <div className="p-4 w-2/3 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {data.title ?? data.contract_name}
          </div>
          <p className="text-gray-700 text-base">{data.description}</p>
        </div>
        <div className="flex items-center">
          <div className="relative w-14 h-14 flex items-center">
            <Blockies size={10} className="rounded-full" />
          </div>
          <div className="text-sm">
            <Link href={`/user/john`}>
              {/* <Link href={`/${data.owner}`}> */}
              <a className="text-gray-900 leading-none hover:underline">
                {owner ?? 'John Doe'}
              </a>
            </Link>
            <p className="text-gray-600">
              {new Date(data[9] * 1000).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
