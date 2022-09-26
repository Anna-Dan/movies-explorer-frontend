import './Login.css';
import '../Form/Form.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Login({ onLogin }) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  //проверка вводимых данных
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        evt.target.setCustomValidity('Некорректый адрес почты');
      } else {
        evt.target.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest('form').checkValidity());
  };

  //сабмит формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <section className='form'>
      <div className='form__container'>
        <Link to='/' className='form__logo'>
          <img src={logo} alt='К сожалению, изображение не доступно'></img>
        </Link>
        <h2 className='form__title'>Рады видеть!</h2>
        <form className='form__area' onSubmit={handleSubmit}>
          <div className='form__inputs'>
            <label className='form__field'>
              <h3 className='form__input-text'>E-mail</h3>
              <input
                autoComplete='on'
                type='email'
                name='email'
                placeholder='Email'
                className={`form__input ${
                  errors.email ? 'form__input_color-error' : ''
                }`}
                value={values.email || ''}
                onChange={handleChange}
                minLength='2'
                maxLength='40'
                required
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
                autoComplete='on'
                type='password'
                name='password'
                className={`form__input ${
                  errors.password ? 'form__input_color-error' : ''
                }`}
                placeholder='Пароль'
                value={values.password || ''}
                onChange={handleChange}
                minLength='8'
                maxLength='40'
                required
              />
              <span
                className={`form__error-text ${
                  errors.password ? 'form__error-text_active' : ''
                }`}
              >
                {errors.password}
              </span>
              <div className='form__login-aligh'></div>
            </label>
          </div>
          <button
            type='submit'
            className={`form__button ${isValid ? '' : 'form__button_disabled'}`}
            disabled={!isValid ? true : ''}
          >
            Войти
          </button>
        </form>
        <p className='form__text'>
          Еще не зарегистрированы?{' '}
          <Link to='/signup' className='form__link'>
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
