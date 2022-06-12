import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import data from '../data/data.json';

// Creating Context API
const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  // Initialize State
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  // Contract Instance
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const daiABI = data;
  const myContract = new ethers.Contract(daiAddress, daiABI, provider);

  // Fetching URI from Smart Contract, when app is started, fetching will also be started.

  useEffect(() => {
    // Contract Instance Creation
    const showCards = async () => {
      // Be careful, this is a case sensitive. You must check lower case and capital cases.If you write that addres different than conract contract addres given to you, you will get ENS(Ethereum Name Service) error.

      // totalSupply method on ABI will return a bigNumber that tells us total NFTs of owner.
      let totalCards = await myContract.totalSupply();
      totalCards = ethers.utils.formatEther(totalCards).toString() / 1e-18;
      totalCards = Number(totalCards);

      // Loop through that URIs, and push them into an array. Looping asynchronous functions is a bit slow if the length is too high.
      let cardArray = [];

      for (let i = 0; i < 90; i++) {
        const tokenURI = await myContract.tokenURI(i);
        const response = await fetch(tokenURI);
        const cardData = await response.json();

        cardArray.push(cardData);
      }

      // After looping is done, pass that cardArray into items.
      setItems(cardArray);

      // When loop is finished, I break the loading.
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
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
