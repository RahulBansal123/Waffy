import { useLayoutEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import getContract from './getContract';
import Contract from '../abis/Waffy.json';
import { useRouter } from 'next/router';

const Web3Container = (props) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const router = useRouter();
  const { account, library } = useWeb3React();

  useLayoutEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(library.provider);
        const contract = await getContract(web3, Contract);

        const id = await web3.eth.net.getId();
        if (id !== 80001) {
          try {
            await web3.currentProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: Web3.utils.toHex(80001) }],
            });
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              alert('add this chain id');
              await web3.currentProvider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x13881',
                    chainName: 'Binance Smart Chain',
                    nativeCurrency: {
                      name: 'Binance Coin',
                      symbol: 'BNB',
                      decimals: 18,
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com'],
                  },
                ],
              });
            }
          }
        }
        setState({ web3, contract });
      } catch (error) {
        alert(
          `Failed to connect, Please check you are connected to polygon testnet.`
        );
        console.error(error);
      }
    };
    if (account) init();
  }, [account]);

  if (router.pathname === '/' && !account) {
    return props.render({ web3: null, account: null, contract: null });
  }

  if (!account) {
    router.push('/');
    return null;
  }

  return props.render({ web3: state.web3, account, contract: state.contract });
};

export default Web3Container;
