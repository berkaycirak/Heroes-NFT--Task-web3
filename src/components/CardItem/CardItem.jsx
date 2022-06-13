import './CardItem.styles.scss';
import { Link } from 'react-router-dom';

function CardItem({ image, name, rarity, id }) {
  console.log(image);
  return (
    <div className='cardItem'>
      <Link to={`/cards/${id}`} className='categoryListingLink'>
        <img className='cardItem-image' src={image} alt='' />
        <p className='cardItem-name'>{name}</p>
        <p className='cardItem-name'>{rarity}</p>
      </Link>
    </div>
  );
}

export default CardItem;
