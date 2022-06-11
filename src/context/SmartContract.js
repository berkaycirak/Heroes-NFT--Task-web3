import { createContext } from 'react';
import { ethers } from 'ethers';
import data from '../data/data.json';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const daiABI = data;
  const myContract = new ethers.Contract(daiAddress, daiABI, provider);

  return (
    <ContractContext.Provider
      value={{
        myContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
