import './Wallet.styles.scss';

import { ethers } from 'ethers';
import { useState, useContext } from 'react';
import ContractContext from '../../context/SmartContractActions';
import { toast } from 'react-toastify';

function Wallet() {
  // This code runs a web3 provider .
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer;
  const [balance, setBalance] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const { myContract } = useContext(ContractContext);

  // This function helps us to connect metamask.
  const connectWalletHandler = async () => {
    try {
      await provider.send('eth_requestAccounts', []);

      signer = provider.getSigner();
      setWalletAddress(await signer.getAddress());

      toast.success('You are connected.');
    } catch (error) {
      toast.error('There is a problem while connecting MetaMask');
    }
  };

  const getBalanceHandler = async () => {
    const yourBalance = await myContract.balanceOf(walletAddress);
    console.log(ethers.utils.formatEther(yourBalance).toString() / 1e-18);
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
      </div>
    </div>
  );
}

export default Wallet;
