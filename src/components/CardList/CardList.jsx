import CardItem from '../CardItem/CardItem';
import './CardList-styles.scss';

import { useState } from 'react';
import SearchBar from '../layout/SearchBar/SearchBar';

function CardList({ cardData }) {
  // You will map cardData here. It contains name,image,attributes...

  const [filteredData, setFilteredData] = useState(cardData);

  // This will create rarity types.
  // Set method will clear dublicates
  const generateRarityDataForDropdown = () => {
    return [...new Set(cardData.map((item) => item.attributes[0].value))];
  };

  // Name Filtering Function
  const handleFilteredName = (name) => {
    //eslint-disable-next-line
    const newFilteredData = cardData.filter((item) => {
      if (
        item.attributes[1].value
          .toLocaleLowerCase()
          .includes(name.toLocaleLowerCase())
      ) {
        return item;
      }
    });

    setFilteredData(newFilteredData);
  };

  // Rarity Filtering Function
  const handleFilteredRarity = (rarity) => {
    //eslint-disable-next-line
    const newFilteredData = cardData.filter((item) => {
      if (item.attributes[0].value.includes(rarity)) {
        return item;
      }
    });

    setFilteredData(newFilteredData);
  };

  // Attack Range Filtering Function
  const attackFilter = (attackObj) => {
    //eslint-disable-next-line
    const newFilteredData = cardData.filter((item) => {
      if (attackObj.from === '' && attackObj.to === '') {
        return item;
      } else if (
        item.attributes[6].value >= attackObj.from &&
        item.attributes[6].value <= attackObj.to
      ) {
        return item;
      }
    });
    setFilteredData(newFilteredData);
  };
  // Endurence Range Filtering Function
  const endurenceFilter = (endurenceObj) => {
    //eslint-disable-next-line
    const newFilteredData = cardData.filter((item) => {
      if (endurenceObj.from === '' && endurenceObj.to === '') {
        return item;
      } else if (
        item.attributes[8].value >= endurenceObj.from &&
        item.attributes[8].value <= endurenceObj.to
      ) {
        return item;
      }
    });
    setFilteredData(newFilteredData);
  };
  // Defense Range Filtering Function
  const defenseFilter = (defenseObj) => {
    //eslint-disable-next-line
    const newFilteredData = cardData.filter((item) => {
      if (defenseObj.from === '' && defenseObj.to === '') {
        return item;
      } else if (
        item.attributes[7].value >= defenseObj.from &&
        item.attributes[7].value <= defenseObj.to
      ) {
        return item;
      }
    });
    setFilteredData(newFilteredData);
  };

  return (
    <div className='cardList-container'>
      <div className='searchDiv'>
        <SearchBar
          rarity={generateRarityDataForDropdown()}
          onNameFilter={handleFilteredName}
          onRarityFilter={handleFilteredRarity}
          onAttackFilter={attackFilter}
          onDefenseFilter={defenseFilter}
          onEndurenceFilter={endurenceFilter}
        />
      </div>

      <div className='cardList'>
        {filteredData.map((data) => (
          <CardItem
            key={data.id}
            id={data.id}
            image={data.image}
            name={data.name}
            rarity={data.attributes[0].value}
          />
        ))}
      </div>
    </div>
  );
}

export default CardList;
