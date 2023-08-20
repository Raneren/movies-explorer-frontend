import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const location = useLocation();
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.movies.map((item) => (
          <MoviesCard movie={item} key={item.id} />
        ))}
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
