import './PageNotFound.css';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();
  function handleClick() {
    history.goBack();
  }

  return (
    <section className='not-found'>
      <h2 className='not-found__error'>404</h2>
      <p className='not-found__description'>Страница не найдена</p>
      <button className='not-found__button' type='button' onClick={handleClick}>
        Назад
      </button>
    </section>
  );
}

export default PageNotFound;
