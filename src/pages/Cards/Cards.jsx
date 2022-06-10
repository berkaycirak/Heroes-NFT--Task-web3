import './Cards.styles.scss';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import data from '../../data/data.json';
import WalletCardList from '../../components/WalletCardList/WalletCardList';

function Cards() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  const [items, setItems] = useState({});

  useEffect(() => {
    const showContract = async () => {
      // Be careful, this is a case sensitive. You must check lower case and capital cases.If you write that addres different than conract contract addres given to you, you will get ENS(Ethereum Name Service) error.
      const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const daiABI = data;
      const myContract = new ethers.Contract(daiAddress, daiABI, provider);

      const tokenURI = await myContract.tokenURI(1);

      const response = await fetch(tokenURI);
      const { image } = await response.json();
      setItems(image);
    };
    showContract();
  }, []);

  // Contract Instanca Creation

  return (
    <div className='card-container'>
      <WalletCardList image={items} />
      <button className='card-button'>Show Contract</button>
    </div>
  );
}

export default Cards;
