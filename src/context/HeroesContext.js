import { createContext, useEffect, useReducer } from 'react';
import heroesReducer from './HeroesReducer';
import { ethers } from 'ethers';
import data from '../data/data.json';
import { toast } from 'react-toastify';
import axios from 'axios';

// Contract Instance
const provider = new ethers.providers.Web3Provider(window.ethereum);
const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const daiABI = data;

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
    balance: '',
  };

  const [state, dispatch] = useReducer(heroesReducer, initialState);

  // Contract Instance
  const myContract = new ethers.Contract(daiAddress, daiABI, provider);

  // Fetching URI from Smart Contract. When app is started, fetching will also be started.

  useEffect(() => {
    // Contract Instance Creation
    const getCards = async () => {
      setLoading();

      // totalSupply method on ABI will return a bigNumber that tells us total NFTs of owner.
      let totalCards = await myContract.totalSupply();
      totalCards = ethers.utils.formatEther(totalCards).toString() / 1e-18;
      totalCards = Number(totalCards);

      // Loop through that URIs, and push them into an array.
      // Since there will be bunch of fetching and promise issues, I prefer to store promises in an array, then read all by using "promise.all". In this way, nft informations can be fetched in an optimized way.

      const URI_promises = [];
      console.time('Data is loaded in');

      for (let i = 0; i < totalCards; i++) {
        const URI_promise = myContract.tokenURI(i);
        URI_promises.push(URI_promise);
      }
      const URIs = await Promise.all(URI_promises);

      const nftURLs_promises = [];
      //eslint-disable-next-line
      URIs.map((result) => {
        const nftURL_promise = axios.get(result);
        nftURLs_promises.push(nftURL_promise);
      });

      const nftURLs = await Promise.all(nftURLs_promises);
      const nftInfos = [];
      nftURLs.map((item) => nftInfos.push(item.data));

      dispatch({
        type: 'GET_CONTRACT_DATA',
        payload: nftInfos,
      });
      console.timeEnd('Data is loaded in');
    };
    getCards();
    //eslint-disable-next-line
  }, []);

  // Connect Wallet

  // This function detects whether account is changed or not.
  const accountChangedHandler = (newAccount) => {
    if (newAccount.length === 1) {
      dispatch({
        type: 'GET_USER_ADDRESS',
        payload: newAccount[0],
      });
    } else {
      dispatch({
        type: 'GET_USER_ADDRESS',
        payload: newAccount,
      });
    }
  };

  // This is an event listiner of ethereum, when account change is detected, it will fire callback by passing new account into it.
  window.ethereum.on('accountsChanged', (accounts) => {
    accountChangedHandler(accounts);
    window.location.reload();
  });

  const connectWalletHandler = () => {
    try {
      if (window.ethereum) {
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((result) => {
            accountChangedHandler(result[0]);
            toast.success('You are connected.');
          });
      } else {
        toast.error('You Need to install MetaMask!');
      }
    } catch (error) {
      toast.error('An error is occured while connecting MetaMask!');
    }
  };

  // Get User NFT Collection
  const getTokenCollection = async () => {
    const nftCollection = await myContract.tokensOfOwner(state.walletAddress);

    if (nftCollection.length === 0) {
      toast.error('You do not have any NTF.');
    }

    dispatch({ type: 'GET_USER_NFTs', payload: nftCollection });

    return nftCollection;
  };

  // Get HRO Balance of User
  const getBalanceHandler = async () => {
    let yourBalance = await myContract.balanceOf(state.walletAddress);
    yourBalance = ethers.utils.formatEther(yourBalance).toString() / 1e-18;
    dispatch({
      type: 'GET_USER_BALANCE',
      payload: Number(yourBalance).toFixed(),
    });
  };

  //Filtering Users NFTs

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
        ...state,
        myContract,
        connectWalletHandler,
        getTokenCollection,
        getBalanceHandler,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
