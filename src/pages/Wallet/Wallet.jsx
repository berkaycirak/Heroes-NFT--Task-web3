import './Wallet.styles.scss';

import { useContext } from 'react';
import CardList from '../../components/CardList/CardList';
import ContractContext from '../../context/SmartContractActions';

function Wallet() {
  const { getBalanceHandler, connectWalletHandler, filteredTokens } =
    useContext(ContractContext);

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
        </div>
      )}
    </div>
  );
}

export default Wallet;
