import './Navbar.styles.scss';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
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
          <div className='navbar-links'>
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
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
