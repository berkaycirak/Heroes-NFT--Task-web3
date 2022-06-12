import './Wallet.styles.scss';

import { ethers } from 'ethers';
import { useState, useContext, useEffect } from 'react';
import CardList from '../../components/CardList/CardList';
import ContractContext from '../../context/SmartContractActions';
import { toast } from 'react-toastify';

function Wallet() {
  // This code runs a web3 provider .
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer;
  const [balance, setBalance] = useState(null);

  const [walletAddress, setWalletAddress] = useState('');
  const [tokensOwner, setTokensOwner] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const { myContract, items, setIsLogged, isLogged } =
    useContext(ContractContext);

  // This function helps us to connect metamask.

  const connectWalletHandler = async () => {
    try {
      await provider.send('eth_requestAccounts', []);

      signer = provider.getSigner();

      setWalletAddress(await signer.getAddress());

      toast.success('You are connected.');
      setIsLogged(true);
    } catch (error) {
      toast.error('There is a problem while connecting MetaMask');
    }
  };

  const getBalanceHandler = async () => {
    let yourBalance = await myContract.balanceOf(walletAddress);
    yourBalance = ethers.utils.formatEther(yourBalance).toString() / 1e-18;
    const nftCollection = await myContract.tokensOfOwner(walletAddress);
    setTokensOwner(nftCollection);
  };

  useEffect(() => {
    // This will return id of the each token. Since return value is a big Number, we should convert it to normal number
    const getUserNFTs = async () => {
      // If no tokensOwner is changed, then do not run that function
      if (!tokensOwner) return;

      const nftArray = [];
      tokensOwner.forEach((token) => {
        let x = ethers.utils.formatEther(token).toString() / 1e-18;
        x = x.toFixed(0);
        nftArray.push(Number(x));
      });

      // If items are not loaded yet, you will not see any filteredNFT. You should wait till items are loaded.
      const filteredNFTs = items.filter((item) => nftArray.includes(item.id));

      setFilteredTokens(filteredNFTs);
    };
    getUserNFTs();
  }, [tokensOwner, items]);
  console.log(filteredTokens);

  return (
    <div className='wallet-container'>
      {filteredTokens.length > 0 ? (
        <CardList cardData={filteredTokens} />
      ) : (
        <div className='wallet'>
          <button onClick={connectWalletHandler} className='connect'>
            Connect to Metamask
          </button>
          <button onClick={getBalanceHandler} className='balance'>
            Get Balance
          </button>
        </div>
      )}
    </div>
  );
}

export default Wallet;
