import { ethers } from 'ethers';
import data from '../data/data.json';

export const getCards = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const daiABI = data;
  const myContract = new ethers.Contract(daiAddress, daiABI, provider);
  let totalCards = await myContract.totalSupply();
  totalCards = ethers.utils.formatEther(totalCards).toString() / 1e-18;
  totalCards = Number(totalCards);
};
