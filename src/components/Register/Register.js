import Form from '../Form/Form';

function Register() {
  return (
    <Form
      header='Добро пожаловать!'
      submit='Зарегистрироваться'
      question='Уже зарегистрированы?'
      link='Войти'
      path='/signin'
      children={
        <>
          <label className='form__input'>
            <h3 className='form__input-text'>Имя</h3>
            <input
              type='text'
              name='name'
              className='form__field'
              value='Виталий'
              required
            />
            <span className='form__error-text'>Что-то пошло не так...</span>
          </label>
          <label className='form__input'>
            <h3 className='form__input-text'>E-mail</h3>
            <input
              type='email'
              name='email'
              className='form__field'
              value='pochta@yandex.ru'
              required
            />
            <span className='form__error-text'>Что-то пошло не так...</span>
          </label>
          <label className='form__input'>
            <h3 className='form__input-text'>Пароль</h3>
            <input
              type='password'
              name='password'
              className='form__field form__field_color-error'
              value='••••••••••••••'
              required
            />
            <span className='form__error-text form__error-text_active'>
              Что-то пошло не так...
            </span>
          </label>
        </>
      }
    />
  );
}

export default Register;
