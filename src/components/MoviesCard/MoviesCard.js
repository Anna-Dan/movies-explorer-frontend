import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MoviesApiUrl } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard({
  card,
  cards,
  onCardLike,
  onCardDelete,
  setInitiaSavedlMovies,
  movies,
}) {
  const isLiked = movies.some((e) => e.movieId == card.id);

  const handleMoviesLiked = () => {
    if (isLiked) {
      const currentMovie = movies.find((item) => item.movieId == card.id);
      onCardDelete(currentMovie);
    } else if (!isLiked) {
      onCardLike({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${MoviesApiUrl}${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `${MoviesApiUrl}${card.image.formats.thumbnail.url}`,
        movieId: `${card.id}`,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        isLiked: true,
      });
    }
  };

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  const handleMovieDelete = () => {
    onCardDelete(card);
    setInitiaSavedlMovies(cards);
  };

  return (
    <li className='movie'>
      <Switch>
        <Route path='/movies'>
          <a href={card.trailerLink} target='_blank' rel='noreferrer'>
            <img
              className='movie__image'
              src={`${MoviesApiUrl}${card.image.url}`}
              alt={card.nameRU}
            />
          </a>
        </Route>
        <Route path='/saved-movies'>
          <a href={card.trailerLink} target='_blank' rel='noreferrer'>
            <img src={card.image} alt={card.nameRU} className='movie__image' />
          </a>
        </Route>
      </Switch>
      <div className='movie__description'>
        <p className='movie__title'>{card.nameRU}</p>
        <Switch>
          <Route path='/movies'>
            <button
              type='button'
              className={
                !isLiked
                  ? `movie__button movie__button_inactive`
                  : `movie__button movie__button_active`
              }
              title='Нравится'
              aria-label='Сохранить фильм'
              onClick={handleMoviesLiked}
            />
          </Route>
          <Route path='/saved-movies'>
            <button
              type='button'
              className='movie__button movie__button_delete'
              title='Удалить'
              aria-label='Удалить фильм'
              onClick={handleMovieDelete}
            />
          </Route>
        </Switch>
      </div>
      <p className='movie__duration'>{getMovieDuration(card.duration)}</p>
    </li>
  );
}

export default MoviesCard;
