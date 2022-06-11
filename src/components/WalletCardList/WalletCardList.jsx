import WalletCardItem from '../WalletCardItem//WalletCardItem';
import './WalletCardList-styles.scss';

function WalletCardList({ images }) {
  // You will map card list here.Each will return a card Item
  return (
    <div className='cardList'>
      {images.map((image, index) => (
        <WalletCardItem key={index} image={image} />
      ))}
    </div>
  );
}

export default WalletCardList;
