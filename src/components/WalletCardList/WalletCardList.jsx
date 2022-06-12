import WalletCardItem from '../WalletCardItem//WalletCardItem';
import './WalletCardList-styles.scss';

import { useState, useEffect } from 'react';

function WalletCardList({ cardData }) {
  // You will map cardData here. It contains name,image,attributes...
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(cardData);

  // This helps us to change search text in box.
  const changeHandler = (e) => {
    setSearchText(e.target.value.toLocaleLowerCase());
  };

  // In order to filter data
  useEffect(() => {
    const newFilteredData = cardData.filter((item) => {
      return item.attributes[0].value.toLocaleLowerCase().includes(searchText);
    });
    setFilteredData(newFilteredData);
  }, [searchText]);

  return (
    <div className='cardList-container'>
      <div className='searchDiv'>
        <label className='searchNote'>
          Rarity Types: Epic, Legendary, Rare, Uncommon, Common
        </label>
        <input
          type='search'
          className='searchBox'
          placeholder='Search Rarity'
          onChange={changeHandler}
        />
      </div>

      <div className='cardList'>
        {filteredData.map((data) => (
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
