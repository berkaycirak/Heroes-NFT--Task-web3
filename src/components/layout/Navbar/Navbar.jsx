import './Navbar.styles.scss';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <nav>
        <ul className='navbar-list'>
          <li className='logo'>
            <Link to='/'>
              <img src={logo} alt='logo' />
            </Link>
          </li>
          <div className='navbar-links hide-for-mobile '>
            <li>
              <span
                onClick={() => {
                  navigate('/cards');
                }}
                className={`link ${
                  location.pathname === '/cards' && 'active'
                } `}
              >
                CARDS
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  navigate('/wallet');
                }}
                className={`link ${
                  location.pathname === '/wallet' && 'active'
                } `}
              >
                WALLET
              </span>
            </li>
          </div>
          {/* Hamburger Menu */}
          <div className='right-side'>
            <div
              className='toggle'
              onClick={() => {
                setIsOpened(!isOpened);
              }}
            >
              <div
                className='navbar-hamburger'
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
              >
                <div
                  className={`hamburger hide-for-desktop ${
                    isClicked && 'opened'
                  }`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className={`header__menu ${isOpened && 'active'}`}>
                  <Link className='link' to='/cards'>
                    CARDS
                  </Link>
                  <Link className='link' to='/wallet'>
                    WALLET
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
