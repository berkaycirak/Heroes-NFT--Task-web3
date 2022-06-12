import './CardItem.styles.scss';

function CardItem({ image, name, rarity }) {
  return (
    <div className='cardItem'>
      <img className='cardItem-image' src={image} alt='' />
      <p className='cardItem-name'>{name}</p>
      <p className='cardItem-name'>{rarity}</p>
    </div>
  );
}

export default CardItem;
