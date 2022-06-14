import './Home.styles.scss';
import videoBg from '../../assets/hero-animation.mp4';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <div className='hero'>
      <video src={videoBg} autoPlay muted loop playsInline></video>
      <div className='hero-button btn'>
        <Link className='link' to='/cards'>
          EXPLORE
        </Link>
      </div>
    </div>
  );
}

export default Explore;
