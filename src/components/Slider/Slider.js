import './Slider.css';

function Slider({ shotMovies, setShortMovies, onChange }) {
  function checkboxHandler() {
    setShortMovies(!shotMovies);
  }
  return (
    <div className='search__toggle'>
      <label className='search__check'>
        <input
          type='checkbox'
          className='search__checkbox'
          onChange={onChange}
          checked={shotMovies && 'checked'}
        />
        <span className='search__slider' />
      </label>
      <p className='search__short'>Короткометражки</p>
    </div>
  );
}

export default Slider;
