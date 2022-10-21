import React, { useEffect, useState, useCallback, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({ onSignout, onProfileEdit, requestStatus: { message } }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [previousName, setPreviousName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [previousEmail, setPreviousEmail] = useState(currentUser.email);
  const [isDisabled, setDisabled] = useState(false);
  const [requestStatusText, setRequestStatusText] = useState('');

  useEffect(() => {
    setRequestStatusText(message);
  }, [message]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    onProfileEdit({ name, email });
    setDisabled(false);
  });
  useEffect(() => {
    const localStorageName = localStorage.getItem('name');
    if (localStorageName) {
      setPreviousName(localStorageName);
    }
    const localStorageEmail = localStorage.getItem('email');
    if (localStorageEmail) {
      setPreviousEmail(localStorageEmail);
    }
  }, [handleSubmit]);

  const handleUserName = (e) => {
    const value = e.target.value;
    const err = e.target.validationMessage;
    setName(value);
    if (value !== previousName && !err) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const handleUserEmail = (e) => {
    const value = e.target.value;
    const err = e.target.validationMessage;

    setEmail(value);
    if (value !== previousEmail && !err) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <section className='profile'>
      <form className='profile__form' onSubmit={handleSubmit}>
        <h3 className='profile__greeting'>Привет, {currentUser.name}!</h3>
        <div className='profile__inputs'>
          <p className='profile__input-title'>Имя</p>
          <div className='profile__input-text profile__input-text_name'>
            <input
              className='profile__input'
              type='text'
              name='name'
              placeholder='Имя'
              minLength='4'
              maxLength='30'
              value={name}
              onChange={handleUserName}
              required
            />
          </div>
          <div className='profile__input-text profile__input-text_email'>
            <input
              className='profile__input'
              type='text'
              name='email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              placeholder='Ваш email'
              minLength={2}
              value={email}
              onChange={handleUserEmail}
              autoComplete='off'
              required
            />
          </div>
          <p className='profile__input-title'>E-mail</p>
        </div>
        <span className='profile__message'>{requestStatusText}</span>

        <button
          className='profile__button-edit'
          type='submit'
          disabled={!isDisabled}
        >
          Редактировать
        </button>
        <button
          className='profile__button-exit'
          type='button'
          onClick={onSignout}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
