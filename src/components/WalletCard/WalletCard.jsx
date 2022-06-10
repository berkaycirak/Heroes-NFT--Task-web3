import './WalletCard-styles.scss';
import { ethers } from 'ethers';
import { useState } from 'react';
import data from '../../data/data.json';

function WalletCard() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer;

  const [balance, setBalance] = useState(null);
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
  const daiAddress = ' 0x9e3F28C3c37ac77684730e223aa7c0621a206CD6';

  const daiAbi = data;
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  console.log(daiContract);

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
      </div>
    </div>
  );
}

export default WalletCard;
