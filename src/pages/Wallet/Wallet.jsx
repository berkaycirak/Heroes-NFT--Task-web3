import './Wallet.styles.scss';

import { useContext } from 'react';
import CardList from '../../components/CardList/CardList';
import ContractContext from '../../context/HeroesContext';

function Wallet() {
  const {
    getBalanceHandler,
    connectWalletHandler,
    filteredTokens,
    getTokenCollection,
  } = useContext(ContractContext);

  return (
    <div className='wallet-container'>
      {filteredTokens.length > 0 ? (
        <CardList cardData={filteredTokens} />
      ) : (
        <div className='wallet'>
          <button onClick={connectWalletHandler} className='connect'>
            Connect to Metamask
          </button>
          <button onClick={getBalanceHandler} className='balance'>
            Get Balance
          </button>
          <button onClick={getTokenCollection} className='balance'>
            My NFTs
          </button>
        </div>
      )}
    </div>
  );
}

export default Wallet;
