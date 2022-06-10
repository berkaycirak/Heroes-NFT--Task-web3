// This is our Hero Component below the navbar which is shown when the app is opened.
import './Explore.styles.scss';
import videoBg from '../../assets/hero-animation.mp4';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <div className='hero'>
      <video src={videoBg} autoPlay muted loop></video>
      <div className='hero-button btn'>
        <Link className='link' to='/cards'>
          EXPLORE
        </Link>
      </div>
    </div>
  );
}

export default Explore;
