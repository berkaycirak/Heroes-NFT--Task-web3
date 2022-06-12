import { createContext, useEffect, useReducer } from 'react';
import heroesReducer from './HeroesReducer';
import { ethers } from 'ethers';
import data from '../data/data.json';
import { toast } from 'react-toastify';

// Contract Instance
const provider = new ethers.providers.Web3Provider(window.ethereum);
const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const daiABI = data;
let signer;

// Creating Context API
const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  // Initialize Reducer State
  const initialState = {
    items: [],
    loading: false,
    isLogged: false,
    walletAddress: '',
    tokensOwner: [],
    filteredTokens: [],
  };

  const [state, dispatch] = useReducer(heroesReducer, initialState);

  // Contract Instance
  const myContract = new ethers.Contract(daiAddress, daiABI, provider);

  // Fetching URI from Smart Contract, when app is started, fetching will also be started.

  useEffect(() => {
    // Contract Instance Creation
    const getCards = async () => {
      setLoading();

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

      // MIGHT NOT WORK !!!!!!!!!!!!!!!!!

      // After looping is done, pass that cardArray into items.
      dispatch({
        type: 'GET_CONTRACT_DATA',
        payload: cardArray,
      });
    };
    getCards();
  }, []);

  // Connect Wallet
  const connectWalletHandler = async () => {
    try {
      await provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
      const address = await signer.getAddress();

      dispatch({
        type: 'GET_USER_ADDRESS',
        payload: address,
      });

      toast.success('You are connected.');
    } catch (error) {
      toast.error('An error is occured while connecting MetaMask!');
    }
  };

  // Get User NFT Collection
  const getTokenCollection = async () => {
    const nftCollection = await myContract.tokensOfOwner(state.walletAddress);

    dispatch({ type: 'GET_USER_NFTs', payload: nftCollection });
  };

  // Get Balance of user
  const getBalanceHandler = async () => {
    let yourBalance = await myContract.balanceOf(state.walletAddress);
    yourBalance = ethers.utils.formatEther(yourBalance).toString() / 1e-18;
  };

  //Get Users NFTs

  useEffect(() => {
    // This will return id of the each token. Since return value is a big Number, we should convert it to normal number
    const showUserNFTs = async () => {
      // If no tokensOwner is changed, then do not run that function
      if (!state.tokensOwner) return;

      const nftArray = [];
      state.tokensOwner.forEach((token) => {
        let x = ethers.utils.formatEther(token).toString() / 1e-18;
        x = x.toFixed(0);
        nftArray.push(Number(x));
      });

      // If items are not loaded yet, you will not see any filteredNFT. You should wait till items are loaded.
      const filteredNFTs = state.items.filter((item) =>
        nftArray.includes(item.id)
      );

      dispatch({ type: 'SHOW_USER_NFTs', payload: filteredNFTs });
    };
    showUserNFTs();
  }, [state.tokensOwner, state.items]);

  // Set Loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    });

  return (
    <ContractContext.Provider
      value={{
        items: state.items,
        loading: state.loading,
        walletAddress: state.walletAddress,
        isLogged: state.isLogged,
        filteredTokens: state.filteredTokens,
        myContract,
        connectWalletHandler,
        getTokenCollection,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
