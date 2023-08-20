import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const location = useLocation();
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        <MoviesCard name={"33 слова о дизайне"} />
        <MoviesCard name={"Киноальманах «100 лет дизайна»"} />
        <MoviesCard name={"В погоне за Бенкси"} />
        <MoviesCard name={"Баския: Взрыв реальности"} />
        <MoviesCard name={"Бег это свобода"} />
        <MoviesCard name={"Книготорговцы"} />
        <MoviesCard name={"Когда я думаю о Германии ночью"} />
        <MoviesCard name={"Gimme Danger: История Игги и The Stooges"} />
        <MoviesCard name={"Дженис: Маленькая девочка грустит"} />
        <MoviesCard name={"Соберись перед прыжком"} />
        <MoviesCard name={"Пи Джей Харви: A dog called money"} />
        <MoviesCard name={"По волнам: Искусство звука в кино"} />
      </div>
      {location.pathname === "/movies" && (
        <button className="movies-card-list__button" type="button">
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
