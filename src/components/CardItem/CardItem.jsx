import './CardItem.styles.scss';
import { Link } from 'react-router-dom';

function CardItem({ image, name, rarity, id }) {
  return (
    <div className='cardItem'>
      <Link to={`/cards/${id}`} className='categoryListingLink'>
        <img className='cardItem-image' src={image} alt='' />
      </Link>
    </div>
  );
}

export default CardItem;
