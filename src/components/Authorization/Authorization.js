import './Authorization.css';
import { Link } from 'react-router-dom';

function Authorization () {
  return (
    <nav>
      <ul className="authorization__buttons">
        <li>
          <Link to="/signup" className="authorization__button authorization_signup">Регистрация</Link>
        </li>
        <li >
          <Link to="/signin" className="authorization__button authorization_signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Authorization;