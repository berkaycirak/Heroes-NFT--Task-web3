import './Wallet.styles.scss';
import { ethers } from 'ethers';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Wallet() {
  // This code runs a web3 provider .
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer;
  const [balance, setBalance] = useState(null);

  // This function helps us to connect metamask.
  const connectWalletHandler = async () => {
    try {
      await provider.send('eth_requestAccounts', []);

      signer = provider.getSigner();
      console.log('Account address:', await signer.getAddress());

      toast.success('You are connected.');
    } catch (error) {
      toast.error('There is a problem while connecting MetaMask');
    }
  };

  const getBalanceHandler = async () => {
    const balance = await signer.getBalance();
    // We should convert the balance to the ethereum. Therefore, we divide balance by 1e18.
    const ethBalance = balance.toString() / 1e18;

    setBalance(ethBalance);
  };

  return (
    <div className='wallet-container'>
      <div className='wallet'>
        <button onClick={connectWalletHandler} className='connect'>
          Connect to Metamask
        </button>
        <button onClick={getBalanceHandler} className='balance'>
          Get Balance
        </button>
        <div>Your Balance: {balance}</div>
      </div>
    </div>
  );
}

export default Wallet;
