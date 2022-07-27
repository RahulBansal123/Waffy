import dayjs from 'dayjs';
import { NFTStorage } from 'nft.storage';

export function getWalletIcon(wallet: string) {
  switch (wallet) {
    case 'metamask':
      return '/assets/images/metamask.png';
    case 'uauth':
      return '/assets/images/uauth.png';
    // case 'ledger':
    //   return '/assets/images/ledger.png';
    case 'walletconnect':
      return '/assets/images/walletConnectIcon.svg';
    case 'walletlink':
      return '/assets/images/coinbaseWalletIcon.svg';
    case 'coinbaselink':
      return '/assets/images/coinbaseWalletIcon.svg';
    case 'fortmatic':
      return '/assets/images/fortmaticIcon.png';
    case 'portis':
      return '/assets/images/portisIcon.png';
    case 'injected':
    default:
      return '/assets/images/arrow-right.svg';
  }
}

export async function store(title: string, description: string, file: File) {
  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE });

  const metadata = await client.store({
    name: title,
    description,
    image: file,
  });
  return metadata?.ipnft;
}

export async function get(cid: string) {
  const fetchUrl = `https://${cid}.ipfs.dweb.link/${encodeURIComponent(
    'metadata.json'
  )}`;
  const res = await fetch(fetchUrl);
  if (!res.ok) {
    console.error(
      `error fetching NFT metadata: [${res.status}] ${res.statusText}`
    );
    return null;
  }
  const metadata = await res.json();

  const extractImageCID = metadata.image?.split('/')[2];
  const extractImage = metadata.image?.split('/').splice(3)?.join('/');
  const url = `https://${extractImageCID}.ipfs.dweb.link/${encodeURIComponent(
    extractImage
  )}`;
  return { ...metadata, url };
}

export function unixToDate(unix: number, format = 'YYYY-MM-DD'): string {
  return dayjs.unix(unix).format(format);
}
