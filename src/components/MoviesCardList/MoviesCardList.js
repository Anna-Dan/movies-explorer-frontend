import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className='movies__section'>
      <ul className='movies__list'>
        {props.movies.map((movie) => {
          return <MoviesCard movie={movie} key={movie.id} saved={false} />;
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
