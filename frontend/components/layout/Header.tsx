import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';

import Modal from '../../utils/modal';
import WalletModal from '../../containers/auth/walletModal';
import { fetchUserData } from '../../containers/dashboard/actions';

const Header = ({ web3, contract }) => {
  const router = useRouter();
  const { account } = useWeb3React();

  const [isOpen, toggle] = useState(false);
  const [selected, setSelected] = useState(0);
  const [registered, setRegistered] = useState(false);

  const handleClick = () => {
    if (account) router.push('/home');
    else toggle(true);
  };

  useEffect(() => {
    const register = async () => {
      const names = ['John Doe', 'James', 'Robert', 'Michael', 'Noah', 'Liam'];
      try {
        if (account && contract && !registered) {
          const userData = await fetchUserData();
          if (Array.isArray(userData.data.accounts)) {
            const user = userData.data.accounts.find(
              (i: any) => i.owner.toLowerCase() === account.toLowerCase()
            );

            if (!user) {
              const name = names[Math.floor(Math.random() * names.length)];

              const gas = await contract.methods
                .register(web3.utils.asciiToHex(name))
                .estimateGas({
                  from: account,
                });

              const gasPrice = await web3.eth.getGasPrice();

              const res = await contract.methods
                .register(web3.utils.asciiToHex(name))
                .send({ from: account, gas, gasPrice });
              console.log(res);
            } else {
              toast.success('Welcome back!');
            }
            setRegistered(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    register();
  }, [account, contract]);

  const handleAfterClose = async () => {
    if (selected === 1) router.push('/home');
  };

  const config = {
    supportedChainIds: [137, 80001], //  137 - polygon mainnet, 80001 - polygon testnet
    connectors: {
      walletconnect: {
        qrcode: true,
      },
      walletlink: {
        qrcode: true,
      },
    },
  };

  return (
    <div className="container items-center w-11/12 md:w-full">
      {router.pathname === '/' ? (
        <div className="flex mx-auto items-center md:justify-between py-5 px-7 rounded-xl">
          <div
            className="absolute left-2 -top-4 w-64 h-64"
            style={{ zIndex: -1 }}
          >
            <Image
              src="/spiral.png"
              alt="Logo"
              layout="fill"
              className="grayscale"
            />
          </div>
          <button
            className="font-bold flex items-center flex-1"
            onClick={() => router.push('/')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-8 w-auto sm:h-10" src="/logo.png" alt="Logo" />
            <span className="mx-2 text-3xl -mb-2">Waffy</span>
          </button>

          <button
            className="mx-3 px-4 py-3 rounded-xl font-semibold border border-orange-200 text-orange-200 disabled:hover:scale-100 hover:scale-110 hover:border-orange-400 hover:text-orange-400 transition-all disabled:cursor-auto"
            disabled={!!account}
            onClick={() => {
              if (!account) {
                setSelected(0);
                handleClick();
              }
            }}
          >
            {account ? account.slice(0, 10) + '...' : 'Connect Wallet'}
          </button>

          <button
            className="px-4 py-3 rounded-xl font-semibold bg-gradient-to-br from-orange-500 to-orange-200 text-white hover:scale-110 hover:from-orange-200 hover:to-orange-400 transition-all"
            onClick={() => {
              setSelected(1);
              handleClick();
            }}
          >
            Launch App
          </button>
        </div>
      ) : (
        <div className="flex mx-auto flex-col md:flex-row items-center md:justify-between py-4 px-7 rounded-xl">
          <div
            className="absolute left-2 -top-4 w-64 h-64"
            style={{ zIndex: -1 }}
          >
            <Image
              src="/spiral.png"
              alt="Logo"
              layout="fill"
              className="grayscale"
            />
          </div>
          <button
            className="font-bold flex items-center"
            onClick={() => router.push('/')}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-8 w-auto sm:h-10" src="/logo.png" alt="Logo" />
            <span className="mx-2 text-3xl -mb-2">Waffy</span>
          </button>

          <nav className="hidden md:flex space-x-10">
            <Link href="/home">
              <a
                className={`text-base font-medium ${
                  router.pathname === '/home'
                    ? 'text-orange-50'
                    : 'text-orange-200'
                } hover:text-orange-50`}
              >
                Explore
              </a>
            </Link>
            <Link href="/lend">
              <a
                className={`text-base font-medium ${
                  router.pathname === '/lend'
                    ? 'text-orange-50'
                    : 'text-orange-200'
                } hover:text-orange-50`}
              >
                Lend
              </a>
            </Link>
          </nav>

          <div className="flex flex-row space-x-2 items-center cursor-pointer">
            <button
              className="btn bg-orange-200 hover:bg-orange-100"
              onClick={() => router.push('/dashboard')}
            >
              Dasboard
            </button>
          </div>
        </div>
      )}
      <Modal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        width={isMobile ? 85 : 35}
        height={isMobile ? 60 : 80}
        title="Connect to a wallet"
      >
        <div className="w-full flex flex-column justify-center items-center pt-5 px-6 pb-0">
          <WalletModal
            isOpen={isOpen}
            onClose={() => toggle(false)}
            config={config}
            handleAfterClose={handleAfterClose}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Header;
