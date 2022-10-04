import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import '../Header/Header.css';
import Authorization from '../Authorization/Authorization';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <Link to='/' className='header__link'>
        <img
          className='header__logo'
          src={logo}
          alt='К сожалению, изображение не доступно'
        ></img>
      </Link>
      {!loggedIn && <Authorization />}
      {loggedIn && <Navigation />}
    </header>
  );
}

export default Header;
