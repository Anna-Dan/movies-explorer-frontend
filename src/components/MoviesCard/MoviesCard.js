import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const [saved, setSaved] = React.useState(false);
  const movieLikeButtonClassName = `movie__button movie__button${
    saved ? '_active' : '_inactive'
  }`;
  function handleSavedTogle() {
    setSaved(!saved);
  }

  const { pathname } = useLocation();

  return (
    <li className='movie'>
      <img className='movie__image' src={movie.image} alt={movie.title}></img>
      <div className='movie__description'>
        <p className='movie__title'>{movie.title}</p>
        {pathname === '/saved-movies' ? (
          <button
            type='button'
            className='movie__button movie__button_delete'
            title='Удалить'
            aria-label='Удалить фильм'
          />
        ) : (
          <button
            type='button'
            className={movieLikeButtonClassName}
            title='Нравится'
            aria-label='Сохранить фильм'
            onClick={handleSavedTogle}
          />
        )}
      </div>
      <p className='movie__duration'>{movie.duration}</p>
    </li>
  );
}

export default MoviesCard;
