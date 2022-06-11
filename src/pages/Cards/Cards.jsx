import './Cards.styles.scss';
import { useEffect, useState, useContext } from 'react';
import ContractContext from '../../context/SmartContract';
import { toast } from 'react-toastify';
import Spinner from '../../components/layout/Spinner/Spinner';
import { ethers } from 'ethers';

import WalletCardList from '../../components/WalletCardList/WalletCardList';

function Cards() {
  const { myContract } = useContext(ContractContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Contract Instance Creation
      const showContract = async () => {
        // Be careful, this is a case sensitive. You must check lower case and capital cases.If you write that addres different than conract contract addres given to you, you will get ENS(Ethereum Name Service) error.

        // In order to see, how many NFTs owner has. Since totalSupply returns a bigNumber, I convert that big number into normal number
        const x = await myContract.totalSupply();
        console.log(ethers.utils.formatEther(x).toString() / 1e-18);

        const tokenURI = await myContract.tokenURI(1);
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
