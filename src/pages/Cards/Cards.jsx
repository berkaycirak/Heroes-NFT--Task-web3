import './Cards.styles.scss';
import { useContext, useEffect } from 'react';
import ContractContext from '../../context/HeroesContext';

import Spinner from '../../components/layout/Spinner/Spinner';
import CardList from '../../components/CardList/CardList';

function Cards() {
  // Items and loading info come from global context API.
  const { items, loading, getCards } = useContext(ContractContext);

  return (
    <div className='card-container'>
      {loading ? <Spinner /> : <CardList cardData={items} />}
    </div>
  );
}

export default Cards;
