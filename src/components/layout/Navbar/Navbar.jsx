import './Navbar.styles.scss';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
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
              <Link className='link' to='/cards'>
                <span>CARDS</span>
              </Link>
            </li>
            <li>
              <Link className='link' to='/wallet'>
                <span>WALLET</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
