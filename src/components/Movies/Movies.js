import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/MoviesArray';

function Movies() {
  return (
    <main className='movies__page'>
      <SearchForm />
      <MoviesCardList movies={movies} />
      <div className='movies__button-more'>
        <button className='movies__button' type='button' name='more'>
          Ещё
        </button>
      </div>
    </main>
  );
}

export default Movies;
