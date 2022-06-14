import './CardDetail.styles.scss';
import { useParams } from 'react-router-dom';

import { useContext } from 'react';
import ContractContext from '../../context/HeroesContext';

function CardDetail() {
  const { items } = useContext(ContractContext);

  const params = useParams();

  //eslint-disable-next-line
  const detailedCardData = items.filter((item) => item.id == params.cardId);

  const details = detailedCardData[0];

  return (
    <div className='cardContainer'>
      <div className='card-content'>
        <div className='card-image'>
          <img src={details.image} alt='' />
        </div>
        <div className='card-description'>
          <h1 className='title'>{details.name}</h1>

          <p>{details.description}</p>
          <div className='card-attributes'>
            <div className='attribute'>
              <h3>Rarity: {details.attributes[0].value} </h3>
            </div>
            <div className='attribute'>
              <h3>Class: {details.attributes[2].value} </h3>
            </div>
            <div className='attribute'>
              <h3>Tendency: {details.attributes[3].value} </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
