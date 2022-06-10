import './Navbar.styles.scss';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <ul className='navbar-list'>
          <li className='logo'>
            <img src={logo} alt='logo' />
          </li>
          <li>
            <Link className='link' to='/cards'>
              Cards
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
