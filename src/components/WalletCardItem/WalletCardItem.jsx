import './WalletCardItem.styles.scss';

function WalletCardItem({ image }) {
  return (
    <div cardItem>
      <img className='cardItem-image' src={image} alt='' />;<p>HELLO</p>
    </div>
  );
}

export default WalletCardItem;
