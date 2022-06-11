import WalletCardItem from '../WalletCardItem//WalletCardItem';
import './WalletCardList-styles.scss';

function WalletCardList({ image }) {
  // You will map card list here.Each will return a card Item
  return (
    <div className='cardList'>
      <WalletCardItem image={image} />
    </div>
  );
}

export default WalletCardList;
