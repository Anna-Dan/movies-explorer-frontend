import { useLocation, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import Slider from '../../utils/Slider/Slider';
import findButton from '../../images/find-button.svg';

function SearchForm({ onSearchMovies }) {
  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');
  const [querySaved, setQuerySaved] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(
    JSON.parse(localStorage.getItem('checkboxStatus')) ?? false
  );
  const [checkboxStatusSaved, setCheckboxStatusSaved] = useState(false);
  let location = useLocation();

  useEffect(() => {
    const value = localStorage.getItem('checkboxStatus');
    if (location.pathname === '/movies') {
      if (localStorage.getItem('query')) {
        setQuery(localStorage.getItem('query'));
      }
      if (JSON.parse(value) === true) {
        setCheckboxStatus(true);
      } else {
        setCheckboxStatus(false);
      }
    }
    if (location.pathname === '/saved-movies') {
      if (querySaved) {
        setQuerySaved(querySaved);
      }
      if (checkboxStatusSaved === true) {
        setCheckboxStatusSaved(true);
      } else {
        setCheckboxStatusSaved(false);
      }
    }
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(query, checkboxStatus);
  };
  const handleSubmitSavedMovie = (e) => {
    e.preventDefault();
    onSearchMovies(querySaved, checkboxStatusSaved);
  };
  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }
  function handleChangeQuerySaved(e) {
    setQuerySaved(e.target.value);
  }

  const handleChange = (checkboxStatus) => {
    setCheckboxStatus(checkboxStatus);
    onSearchMovies(query, checkboxStatus);
  };
  const handleChangeSaved = (checkboxStatusSaved) => {
    setCheckboxStatusSaved(checkboxStatusSaved);
    onSearchMovies(querySaved, checkboxStatusSaved);
  };
  const handleCheckboxChange = (e) => {
    handleChange(e.target.checked);
  };
  const handleCheckboxChangeSaved = (e) => {
    handleChangeSaved(e.target.checked);
  };

  return (
    <section className='search-form'>
      <Route path='/movies'>
        <form className='search' onSubmit={handleSubmit}>
          <div className='search__container'>
            <div className='search__line'>
              <input
                className='search__input'
                placeholder='Фильм'
                type='text'
                value={query || ''}
                onChange={handleChangeQuery}
                required
              />

              <button type='submit' className='search__button'>
                <img
                  src={findButton}
                  alt='К сожалению, изображение не доступно'
                ></img>
              </button>
            </div>
            <Slider
              onChange={handleCheckboxChange}
              shotMovies={checkboxStatus}
            />
          </div>
        </form>
      </Route>

      <Route path='/saved-movies'>
        <form className='search' onSubmit={handleSubmitSavedMovie}>
          <div className='search__container'>
            <div className='search__line'>
              <input
                className='search__input'
                placeholder='Фильм'
                type='text'
                value={querySaved || ''}
                onChange={handleChangeQuerySaved}
                required
              />

              <button type='submit' className='search__button'>
                <img
                  src={findButton}
                  alt='К сожалению, изображение не доступно'
                ></img>
              </button>
            </div>
            <Slider
              onChange={handleCheckboxChangeSaved}
              shotMovies={checkboxStatusSaved}
            />
          </div>
        </form>
      </Route>
    </section>
  );
}

export default SearchForm;
