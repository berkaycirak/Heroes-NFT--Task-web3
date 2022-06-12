import './Cards.styles.scss';
import { useContext } from 'react';
import ContractContext from '../../context/SmartContractActions';

import Spinner from '../../components/layout/Spinner/Spinner';

import WalletCardList from '../../components/WalletCardList/WalletCardList';

function Cards() {
  const { items, loading } = useContext(ContractContext);

  return (
    <div className='card-container'>
      {loading ? <Spinner /> : <WalletCardList cardData={items} />}
    </div>
  );
}

export default Cards;
