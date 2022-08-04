import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Header isLoggedIn={false} />
          <Main />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
