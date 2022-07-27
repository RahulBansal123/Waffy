import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { PortisConnector } from '@web3-react/portis-connector';
// import { LedgerConnector } from '@web3-react/ledger-connector';
import { UAuthConnector } from '@uauth/web3-react';

import { FortmaticConnector } from './fortmatic';

import { SUPPORTED_WALLETS } from '../../constants';

const connectors = {
  injected: InjectedConnector,
  walletconnect: WalletConnectConnector,
  walletlink: WalletLinkConnector,
  fortmatic: FortmaticConnector,
  portis: PortisConnector,
};

const walletconnect = new WalletConnectConnector({
  qrcode: true,
});

export const injected = new InjectedConnector({
  supportedNetworks: [137, 80001],
});

// export const ledger = new LedgerConnector({
//   chainId: 80001,
//   url: 'https://matic-mumbai.chainstacklabs.com',
//   pollingInterval: 12000,
// });

export const uauth = new UAuthConnector({
  clientID: '408676f5-2d52-4f8d-ae31-ace612d50335',
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://waffy.vercel.app'
      : 'http://localhost:3000',
  scope: 'openid wallet',
  connectors: { injected, walletconnect },
});

export function getSupportedWallets(config) {
  const supportedWallets = {
    injected: {
      connector: injected,
      ...SUPPORTED_WALLETS['injected'],
    },
    metamask: {
      connector: injected,
      ...SUPPORTED_WALLETS['metamask'],
    },
    uauth: {
      connector: uauth,
      ...SUPPORTED_WALLETS['uauth'],
    },
    // ledger: {
    //   connector: ledger,
    //   ...SUPPORTED_WALLETS['ledger'],
    // },
  };
  Object.keys(config.connectors).forEach((key) => {
    supportedWallets[key] = {
      connector: new connectors[key](config.connectors[key]),
      ...SUPPORTED_WALLETS[key],
    };
  });
  return supportedWallets;
}
