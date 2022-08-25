import './Login.css';
import Form from '../Form/Form';

function Login() {
  return (
    <Form
      header='Рады видеть!'
      submit='Войти'
      question='Ещё не зарегистрированы?'
      link='Регистрация'
      path='/signup'
      children={
        <>
          <label className='form__input'>
            <h3 className='form__input-text'>E-mail</h3>
            <input
              type='email'
              name='email'
              className='form__field'
              defaultValue='pochta@yandex.ru'
              required
            />
            <span className='form__error-text'>Что-то пошло не так...</span>
          </label>
          <label className='form__input'>
            <h3 className='form__input-text'>Пароль</h3>
            <input
              type='password'
              name='password'
              className='form__field'
              defaultValue=''
              required
            />
            <span className='form__error-text'>Что-то пошло не так...</span>
            <div className='form__login-aligh'></div>
          </label>
        </>
      }
    />
  );
}

export default Login;
