import './Spinner.styles.scss';

function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
      <div className='loadingSpinner'></div>
      <p>Loading</p>
    </div>
  );
}

export default Spinner;
