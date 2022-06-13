import './Wallet.styles.scss';

import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import ContractContext from '../../context/HeroesContext';

function Wallet() {
  const {
    getBalanceHandler,
    connectWalletHandler,
    getTokenCollection,
    balance,
    isLogged,
    tokensOwner,
  } = useContext(ContractContext);

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='wallet-container'>
      <div className='wallet'>
        {isLogged ? (
          <div>
            {
              <p className={`info ${isActive && 'active'}`}>
                Your Balance: {balance} HRO
              </p>
            }
            <div>
              <button
                onClick={() => {
                  getBalanceHandler();
                  setIsActive(true);
                }}
                className='balance'
              >
                Get Balance
              </button>
              <button
                onClick={async () => {
                  let collection = await getTokenCollection();
                  if (collection.length > 0) {
                    navigate('/wallet/nft-list');
                  }
                }}
                className='balance'
              >
                My NFTs
              </button>
            </div>
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
