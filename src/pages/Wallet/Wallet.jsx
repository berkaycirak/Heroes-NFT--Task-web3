import './Wallet.styles.scss';

import { Link } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner/Spinner';
import { useContext } from 'react';
import ContractContext from '../../context/HeroesContext';

function Wallet() {
  const {
    getBalanceHandler,
    connectWalletHandler,

    getTokenCollection,
    isLogged,
    tokensOwner,
  } = useContext(ContractContext);

  return (
    <div className='wallet-container'>
      <div className='wallet'>
        {isLogged ? (
          <div>
            {' '}
            <button onClick={getBalanceHandler} className='balance'>
              Get Balance
            </button>
            <button onClick={getTokenCollection} className='balance'>
              <Link
                className='link'
                to={`${
                  tokensOwner.length === 0 ? '/wallet' : '/wallet/nft-list'
                }  `}
              >
                My NFTs
              </Link>
            </button>
          </div>
        ) : (
          <div>
            <button onClick={connectWalletHandler} className='connect'>
              Connect to Metamask
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;
