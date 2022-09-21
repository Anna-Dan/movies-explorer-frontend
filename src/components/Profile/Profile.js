import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className='profile'>
      <form className='profile__form'>
        <h3 className='profile__greeting'>Привет, Виталий!</h3>
        <div className='profile__inputs'>
          <p className='profile__input-title'>Имя</p>
          <div className='profile__input-text profile__input-text_name'>
            <input className='profile__input' defaultValue='Виталий' required />
          </div>
          <div className='profile__input-text profile__input-text_email'>
            <input
              className='profile__input'
              defaultValue='pochta@yandex.ru'
              required
            />
          </div>
          <p className='profile__input-title'>E-mail</p>
        </div>
        <Link to='/profile' className='profile__button-edit'>
          Редактировать
        </Link>
        <Link to='/' className='profile__button-exit'>
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
}

export default Profile;
