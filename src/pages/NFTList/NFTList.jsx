import './NFTList.styles.scss';
import CardList from '../../components/CardList/CardList';

import { useContext } from 'react';
import ContractContext from '../../context/HeroesContext';

function NFTList() {
  const { filteredTokens } = useContext(ContractContext);

  return (
    <div className='nft-list'>
      <div className='totalCard'>
        {`Available Cards : ${filteredTokens.length}`}{' '}
      </div>
      <CardList cardData={filteredTokens} />
    </div>
  );
}

export default NFTList;

// {filteredTokens.length > 0 ? (
//   <CardList cardData={filteredTokens} />
// ) :
