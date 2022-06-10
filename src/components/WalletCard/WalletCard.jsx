import './WalletCard-styles.scss';
import { ethers } from 'ethers';
import { useState } from 'react';
import data from '../../data/data.json';
import WalletCardItem from '../WalletCardItem/WalletCardItem';

function WalletCard() {
  // This code runs a web3 provider .
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer;

  const [balance, setBalance] = useState(null);

  // This function helps us to connect metamask.
  const connectWalletHandler = async () => {
    await provider.send('eth_requestAccounts', []);

    signer = provider.getSigner();
    console.log('Account address:', await signer.getAddress());
  };

  const getBalanceHandler = async () => {
    const balance = await signer.getBalance();
    // We should convert the balance to the ethereum. Therefore, we divide balance by 1e18.
    const ethBalance = balance.toString() / 1e18;

    setBalance(ethBalance);
  };

  const [immage, setImmage] = useState(null);
  // Contract Instanca Creation
  const showContract = async () => {
    // Be careful, this is a case sensitive. You must check lower case and capital cases.If you write that addres different than conract contract addres given to you, you will get ENS(Ethereum Name Service) error.
    const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const daiABI = data;
    const daiContract = new ethers.Contract(daiAddress, daiABI, provider);

    const tokenURI = await daiContract.tokenURI(4);

    const response = await fetch(tokenURI);
    const { image } = await response.json();
    setImmage(image);
  };

  return (
    <div className='wallet'>
      <div>
        <button onClick={connectWalletHandler} className='connect'>
          Connect to Metamask
        </button>
        <button onClick={getBalanceHandler} className='balance'>
          Get Balance
        </button>
        <div>Your Balance: {balance}</div>
        <button onClick={showContract}>Show Smart Contract</button>
      </div>
      <WalletCardItem image={immage} />
    </div>
  );
}

export default WalletCard;
