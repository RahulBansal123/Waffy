import { ERC721ABI } from './abi/ERC721';

export async function getERC721Contract(web3, address) {
  const instance = new web3.eth.Contract(ERC721ABI, address);
  return instance;
}
