import '../Form/Form.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Register({ onRegister }) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <>
      <section className='form'>
        <div className='form__container'>
          <Link to='/' className='form__logo'>
            <img src={logo} alt='К сожалению, изображение не доступно'></img>
          </Link>
          <h2 className='form__title'>Добро пожаловать!</h2>
          <form className='form__area' onSubmit={handleSubmit}>
            <div className='form__inputs'>
              <label className='form__field'>
                <h3 className='form__input-text'>Имя</h3>
                <input
                  type='text'
                  name='name'
                  className='form__input'
                  required
                  pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                  autoComplete='on'
                  placeholder='Имя'
                  value={values.name || ''}
                  onChange={handleChange}
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
                  name='email'
                  className='form__input'
                  required
                  autoComplete='on'
                  placeholder='Email'
                  value={values.email || ''}
                  onChange={handleChange}
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
                  name='password'
                  className={`form__input ${
                    errors.password ? 'form__input_color-error' : ''
                  }`}
                  required
                  autoComplete='on'
                  placeholder='Пароль'
                  value={values.password || ''}
                  onChange={handleChange}
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
              </label>
            </div>
            <button
              className={`form__button ${
                isValid ? '' : 'form__button_disabled'
              }`}
              type='submit'
              disabled={!isValid ? true : ''}
            >
              Зарегистрироваться
            </button>
          </form>
          <p className='form__text'>
            Уже зарегистрированы?{' '}
            <Link to='/signin' className='form__link'>
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
