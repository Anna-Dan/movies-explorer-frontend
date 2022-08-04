import './AboutMe.css';
import avatar from '../../images/avatar.jpeg';

function AboutMe() {
  return (
    <section className='about-me' id='student'>
      <h2 className='about-me__header'>Студент</h2>

      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Анна</h3>
          <p className='about-me__description'>Фронтенд-разработчик, 35 лет</p>
          <p className='about-me__bio'>
            Я родилась в Комсомольске-на-Амуре, сейчас живу в Волгограде.
            Закончила факультет экономики и управления в университете имени
            Плеханова. Увлекаюсь йогой, кулинарией и изучением испанского языка.
            Недавно начала вникать в веб-разработку и надеюсь связать с ней свою
            профессиональную деятельность.
          </p>
          <ul className='about-me__links'>
            <li>
              <a
                className='about-me__link'
                href='https://vk.com/id151390953'
                target='_blank'
                rel='noreferrer'
              >
                VK
              </a>
            </li>
            <li>
              <a
                className='about-me__link'
                href='https://github.com/Anna-Dan'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img
          className='about-me__avatar'
          src={avatar}
          alt='К сожалению, изображение не доступно'
        />
      </div>
    </section>
  );
}

export default AboutMe;
