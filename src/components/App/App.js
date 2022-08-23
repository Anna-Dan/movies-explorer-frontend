import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Header isLoggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route path='/movies'>
          <Header isLoggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header isLoggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
