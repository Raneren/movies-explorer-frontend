import React from "react";
import photo from "../../../images/photo.jpeg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <div className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <div className="about-me__info-container">
            <p className="about-me__name">Игорь</p>
            <p className="about-me__description">
              Фронтенд-разработчик, 32 года
            </p>
            <p className="about-me__biography">
              Я живу в Смоленске, закончил факультет матемакики и информатики
              СмолГУ. Я люблю слушать музыку, а ещё увлекаюсь хоррорами. Недавно
              начал кодить. Сейчас работаю product менеджером в веб студии.
            </p>
          </div>
          <a
            className="about-me__link"
            href="https://github.com/Raneren"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={photo} alt="фотография меня" />
      </div>
    </div>
  );
}

export default AboutMe;
