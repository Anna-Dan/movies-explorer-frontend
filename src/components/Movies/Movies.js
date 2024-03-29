import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesCount } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi';
import moviesFilter from '../../utils/MovieFilter';
import './Movies.css';
import Preloader from '../Preloader/Preloader';

function Movies({ cards, onCardClick, onCardLike, onCardDelete }) {
  const [query, setQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(
    JSON.parse(localStorage.getItem('checkboxStatus')) ?? false
  );
  const [initialMovies, setInitialMovies] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearchMovies, setSearchMovies] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [firstResultsNumber, setFirstResultsNumber] = useState(0);
  const [moreResultsNumber, setMoreResultsNumber] = useState(0);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);

  const currentViewport = document.documentElement.clientWidth;

  useEffect(() => {
    if (localStorage.getItem('searchResults')) {
      const init = JSON.parse(localStorage.getItem('searchResults'));
      const searchResult = moviesFilter(init, query, checkboxStatus);
      setFilteredMovies(searchResult);
    }
  }, []);

  const handleSearch = (query, checkboxStatus) => {
    setMoviesToRender([]);
    setQuery(query);
    setCheckboxStatus(checkboxStatus);
    setLoading(true);
    const initialMoviesInLocalStorage = JSON.parse(
      localStorage.getItem('initialMovies')
    );
    if (!initialMoviesInLocalStorage) {
      setSearchMovies(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setInitialMovies(data);
          localStorage.setItem('initialMovies', JSON.stringify(data));
        })
        .catch(() => {
          setSearchStatus(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
          );
        })
        .finally(() => {
          setSearchMovies(false);
          setLoading(false);
        });
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
      setSearchStatus('Ничего не найдено');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialMovies.length > 0) {
      const searchResults = moviesFilter(initialMovies, query, checkboxStatus);
      setFilteredMovies(searchResults);
      localStorage.setItem('query', query);
      localStorage.setItem('checkboxStatus', checkboxStatus);
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
    }
  }, [initialMovies, query, checkboxStatus]);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResultsNumber) {
        setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
        setIsMoreButtonVisible(true);
      } else {
        setMoviesToRender(filteredMovies);
      }
    }
  }, [filteredMovies, firstResultsNumber]);
  function handleMoreButtonClick() {
    setLoading(true);
    setMoviesToRender((state) =>
      filteredMovies.slice(0, state.length + moreResultsNumber)
    );
    setLoading(false);
  }
  useEffect(() => {
    if (moviesToRender.length === filteredMovies.length) {
      setIsMoreButtonVisible(false);
    }
  }, [moviesToRender, filteredMovies]);

  useEffect(() => {
    if (currentViewport >= moviesCount.large.width) {
      setFirstResultsNumber(moviesCount.large.cards.total);
      setMoreResultsNumber(moviesCount.large.cards.extra);
    } else if (
      currentViewport <= moviesCount.large.width &&
      currentViewport > moviesCount.medium.width
    ) {
      setFirstResultsNumber(moviesCount.medium.cards.total);
      setMoreResultsNumber(moviesCount.medium.cards.extra);
    } else {
      setFirstResultsNumber(moviesCount.small.cards.total);
      setMoreResultsNumber(moviesCount.small.cards.extra);
    }
  }, [currentViewport]);

  const [isLoading, setLoading] = useState(false);
  return (
    <main className='movies__page'>
      <SearchForm onSearchMovies={handleSearch} />
      {moviesToRender.length > 0 ? (
        <MoviesCardList
          movies={cards}
          cards={moviesToRender}
          onMoreBtn={handleMoreButtonClick}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ) : (
        <span className='movies__status'>{searchStatus}</span>
      )}
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='movies__button-more'>
          <button
            className={
              isMoreButtonVisible
                ? 'movies__button '
                : 'movies__button_disabled'
            }
            type='button'
            name='more'
            onClick={handleMoreButtonClick}
          >
            Ещё
          </button>
        </div>
      )}
    </main>
  );
}

export default Movies;
