import WalletCardItem from '../WalletCardItem//WalletCardItem';
import './WalletCardList-styles.scss';

import { useState } from 'react';

function WalletCardList({ cardData }) {
  // You will map cardData here. It contains name,image,attributes...

  const changeHandler = (e) => {};

  return (
    <div className='cardList-container'>
      <input
        type='search'
        className='searchBox'
        placeholder='Search Rarity or Card'
        onChange={changeHandler}
      />

      <div className='cardList'>
        {cardData.map((data) => (
          <WalletCardItem
            key={data.id}
            image={data.image}
            name={data.name}
            rarity={data.attributes[0].value}
          />
        ))}
      </div>
    </div>
  );
}

export default WalletCardList;
