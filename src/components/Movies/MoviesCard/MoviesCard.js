import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const location = useLocation();
  return (
    <article className="movies-card">
      <a className="movies-card__link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
      <img
        className="movies-card__photo"
        src={`https://api.nomoreparties.co${props.movie.image.url}`}
        alt={`Постер фильма: ${props.movie.nameRU}`}
      ></img>
      </a>
      {location.pathname === "/movies" && (
        <button
          className="movies-card__button movies-card__button_save"
          type="button"
        >
          Сохранить
        </button>
      )}
      {location.pathname === "/saved-movies" && (
        <button
          className="movies-card__button movies-card__button_delete"
          type="button"
        ></button>
      )}
      <div className="movies-card__info">
        <p className="movies-card__name">{props.movie.nameRU}</p>
        <p className="movies-card__duration">{`${parseInt(props.movie.duration/60)}ч ${props.movie.duration%60}м`}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
