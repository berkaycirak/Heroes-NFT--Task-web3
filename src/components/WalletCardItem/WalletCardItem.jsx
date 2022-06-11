import './WalletCardItem.styles.scss';

function WalletCardItem({ image }) {
  return (
    <div className='cardItem'>
      <img className='cardItem-image' src={image} alt='' />
    </div>
  );
}

export default WalletCardItem;
