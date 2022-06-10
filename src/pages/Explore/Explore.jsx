// This is our Hero Component below the navbar which is shown when the app is opened.
import './Explore.styles.scss';
import videoBg from '../../assets/hero-animation.mp4';

function Explore() {
  return (
    <div className='hero'>
      <video autoPlay muted loop>
        <source src={videoBg} type='video/mp4' />
      </video>
    </div>
  );
}

export default Explore;
