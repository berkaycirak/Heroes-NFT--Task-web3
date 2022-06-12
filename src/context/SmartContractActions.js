import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import data from '../data/data.json';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  // Initialize State
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  // Contract Instance
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const daiABI = data;
  const myContract = new ethers.Contract(daiAddress, daiABI, provider);

  // Fetching URI from Smart Contract

  useEffect(() => {
    console.log('UseEffect is progressing');
    // Contract Instance Creation
    const showCards = async () => {
      // Be careful, this is a case sensitive. You must check lower case and capital cases.If you write that addres different than conract contract addres given to you, you will get ENS(Ethereum Name Service) error.

      // In order to see, how many NFTs owner has. Since totalSupply returns a bigNumber, I convert that big number into normal number
      let totalCards = await myContract.totalSupply();
      totalCards = ethers.utils.formatEther(totalCards).toString() / 1e-18;
      totalCards = Number(totalCards);

      let cardArray = [];

      for (let i = 0; i < 50; i++) {
        const tokenURI = await myContract.tokenURI(i);
        const response = await fetch(tokenURI);
        const cardData = await response.json();

        cardArray.push(cardData);
      }

      setItems(cardArray);

      if (cardArray.length > 0) {
        setLoading(false);
      }
    };
    showCards();

    // eslint-disable-next-line
  }, []);

  return (
    <ContractContext.Provider
      value={{
        myContract,
        items,
        loading,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
