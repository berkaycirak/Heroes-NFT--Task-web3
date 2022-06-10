import './Cards.styles.scss';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../components/layout/Spinner/Spinner';
import data from '../../data/data.json';
import WalletCardList from '../../components/WalletCardList/WalletCardList';

function Cards() {
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Contract Instance Creation
      const showContract = async () => {
        // Be careful, this is a case sensitive. You must check lower case and capital cases.If you write that addres different than conract contract addres given to you, you will get ENS(Ethereum Name Service) error.
        const daiAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const daiABI = data;
        const myContract = new ethers.Contract(daiAddress, daiABI, provider);

        const tokenURI = await myContract.tokenURI(2);

        const response = await fetch(tokenURI);
        const { image } = await response.json();
        setItems(image);
      };
      showContract();
      setLoading(false);
    } catch (error) {
      toast.error("Couldn't fetch cards.");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='card-container'>
      {loading ? <Spinner /> : <WalletCardList image={items} />}
    </div>
  );
}

export default Cards;
