import { useState } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const [showItems, setShowItems] = useState(false);

  const handleToggleMenu = () => setShowItems(!showItems);

  return (
    <nav className='navigation'>
      <button
        className='navigation__button-open'
        type='button'
        onClick={handleToggleMenu}
      ></button>
      <div
        className={`navigation__container ${
          showItems ? 'navigation__container_visible' : ''
        }`}
      >
        <div className='navigation__sidebar'>
          <button
            className='navigation__button-close'
            type='button'
            onClick={handleToggleMenu}
          ></button>
          <ul className='navigation__list'>
            <li className='navigation__list-item navigation__list-item_main'>
              <NavLink
                exact to='/'
                className='navigation__link'
                activeClassName='navigation__link_active'
                onClick={handleToggleMenu}
              >
                Главная
              </NavLink>
            </li>
            <li className='navigation__list-item'>
              <NavLink
                to='/movies'
                className='navigation__link'
                activeClassName='navigation__link_active'
                onClick={handleToggleMenu}
              >
                Фильмы
              </NavLink>
            </li>
            <li className='navigation__list-item'>
              <NavLink
                to='/saved-movies'
                className='navigation__link'
                activeClassName='navigation__link_active'
                onClick={handleToggleMenu}
              >
                Сохранённые фильмы
              </NavLink>
            </li>

            <NavLink
              to='/profile'
              className='navigation__link navigation__link_profile'
              onClick={handleToggleMenu}
            >
              Аккаунт <div className='navigation__account-icon'></div>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
