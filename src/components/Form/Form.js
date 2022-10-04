import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Form.css';

function Form({
  header,
  btnName,
  caption,
  link,
  path,
  loginForm,
  onSumbit,
  onChangeEmail,
  onChangePassword,
  onChangeName,
  isDisabled,
  requestStatus: { message },
  errors,
}) {
  return (
    <section className='form'>
      <div className='form__container'>
        <Link to='/' className='form__logo'>
          <img src={logo} alt='К сожалению, изображение не доступно'></img>
        </Link>
        <h2 className='form__title'>{header}</h2>
        <form className='form__area' onSubmit={onSumbit}>
          <div className='form__inputs'>
            <label
              className={!loginForm ? `form__field` : `form__field disabled`}
            >
              <h3 className='form__input-text'>Имя</h3>
              <input
                type='text'
                className={`form__input ${
                  errors.name ? 'form__input_color-error' : ''
                }`}
                required={!loginForm}
                pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                autoComplete='on'
                placeholder='Имя'
                name='name'
                onChange={onChangeName}
                minLength='2'
                maxLength='40'
              />
              <span
                className={`form__error-text ${
                  errors.name ? 'form__error-text_active' : ''
                }`}
              >
                {errors.name}
              </span>
            </label>
            <label className='form__field'>
              <h3 className='form__input-text'>E-mail</h3>
              <input
                type='email'
                className={`form__input ${
                  errors.email ? 'form__input_color-error' : ''
                }`}
                required
                autoComplete='on'
                placeholder='Email'
                name='email'
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                onChange={onChangeEmail}
                minLength='2'
                maxLength='40'
              />
              <span
                className={`form__error-text ${
                  errors.email ? 'form__error-text_active' : ''
                }`}
              >
                {errors.email}
              </span>
            </label>
            <label className='form__field'>
              <h3 className='form__input-text'>Пароль</h3>
              <input
                type='password'
                className={`form__input ${
                  errors.password ? 'form__input_color-error' : ''
                }`}
                required
                autoComplete='new-password'
                placeholder=' Пароль'
                name='password'
                onChange={onChangePassword}
                minLength='8'
                maxLength='40'
              />
              <span
                className={`form__error-text ${
                  errors.password ? 'form__error-text_active' : ''
                }`}
              >
                {errors.password}
              </span>
              <div
                className={loginForm ? `form__login-aligh` : `disabled`}
              ></div>
            </label>
            <span className='form__error-message'>{message}</span>
          </div>
          <button type='submit' className='form__button' disabled={isDisabled}>
            {btnName}
          </button>
        </form>
        <p className='form__text'>
          {caption}{' '}
          <Link to={path} className='form__link'>
            {link}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Form;
