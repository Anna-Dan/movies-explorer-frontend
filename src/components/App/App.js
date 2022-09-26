import { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import picFail from '../../images/error.svg';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [MessageImage, setMessageImage] = useState('');
  const [MessageText, setMessageText] = useState('');
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const { pathname } = useLocation();

  //регистрация пользователя
  function handleRegister(data) {
    mainApi
      .register(data)
      .then((res) => {
        if (res) {
          handleLogin(data);
        }
      })
      .catch(() => {
        setMessageImage(picFail);
        setMessageText('Пользователь с таким email существует');
        handleInfoTooltip();
      });
  }

  //авторизация пользователя
  function handleLogin(data) {
    mainApi
      .login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(() => {
        setMessageImage(picFail);
        setMessageText('Неправильная почта или пароль');
        handleInfoTooltip();
      });
  }

  //выход пользователя из аккаунта
  const handleSignOut = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
    history.push('/');
  };

  //проверка авторизации пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo()
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  //получение информации о пользователе
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  //редактирование информации о пользователе
  function handleUpdateUser(newUserData) {
    mainApi
      .updateUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //открытие попапа с информацией
  function handleInfoTooltip() {
    setIsTooltipOpened(true);
  }

  //закрытие попапа с информацией
  function closeInfoTooltip() {
    setIsTooltipOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Header isLoggedIn={isLoggedIn} isLoading={isLoading} />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path='/movies'
            component={Movies}
            user={currentUser}
            savedMoviesList={savedMoviesList}
          />

          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            user={currentUser}
            savedMoviesList={savedMoviesList}
          />

          <ProtectedRoute
            path='/profile'
            isLoggedIn={isLoggedIn}
            component={Profile}
            isLoading={isLoading}
            onEditProfile={handleUpdateUser}
            onSignOut={handleSignOut}
          />

          <Route path='/signin'>
            {() =>
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Redirect to='/movies' />
              )
            }
          </Route>

          <Route path='/signup'>
            {() =>
              !isLoggedIn ? (
                <Register onRegister={handleRegister} />
              ) : (
                <Redirect to='/movies' />
              )
            }
          </Route>

          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>

        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ? (
          <Footer />
        ) : (
          ''
        )}
        <InfoTooltip
          image={MessageImage}
          text={MessageText}
          isOpen={isTooltipOpened}
          onClose={closeInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
