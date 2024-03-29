import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__header">О проекте</h2>

      <div className="about-project__container">
        <div className="about-project__info">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__container">
        <div className="about-project__time">
          <h4 className="about-project__time-title">1 неделя</h4>
          <p className="about-project__time-text">Back-end</p>
        </div>
        <div className="about-project__time">
          <h4 className="about-project__time-title about-project__time-title_light">4 недели</h4>
          <p className="about-project__time-text">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;