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
    <div className='cardDetail'>
      <div className='cardContainer'>
        <div className='card-content'>
          <h1 className='title'>{details.name}</h1>
          <div className='responsive'>
            <div className='card-image'>
              <img src={details.image} alt='' />
            </div>
            <div className='bottom'>
              <div className='card-attributes'>
                <div className='attribute'>
                  <h3 className='attribute-title'>Rarity</h3>
                  <h4>{details.attributes[0].value.toUpperCase()}</h4>
                </div>
                <div className='attribute'>
                  <h3 className='attribute-title'>Class</h3>
                  <h4>{details.attributes[2].value.toUpperCase()} </h4>
                </div>
                <div className='attribute'>
                  <h3 className='attribute-title'>Tendency</h3>
                  <h4>{details.attributes[3].value.toUpperCase()} </h4>
                </div>
              </div>
              <p className='story'>{details.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
