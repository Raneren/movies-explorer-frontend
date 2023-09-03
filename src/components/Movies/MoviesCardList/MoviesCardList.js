import React from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

function MoviesCardList(props) {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 650px)");
  //Определяем начальное количество карточек в зависимости от ширины экрана
  const initialMovieCount = isDesktop ? 12 : isTablet ? 8 : 5;

  const [visibleMovieCount, setVisibleMovieCount] =
    React.useState(initialMovieCount);

  function handleClick() {
    calculateMovieCount();
  }
  //Определяем сколько карточек будет добавляться в зависимости от ширины экрана
  function calculateMovieCount() {
    if (isDesktop) {
      return setVisibleMovieCount(visibleMovieCount + 3);
    }
    if (isTablet) {
      return setVisibleMovieCount(visibleMovieCount + 2);
    }
    setVisibleMovieCount(visibleMovieCount + 2);
  }
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.foundMovies
          .slice(
            0,
            location.pathname === "/saved-movies"
              ? props.movies.length
              : visibleMovieCount
          )
          .map((item) => (
            <MoviesCard
              movie={item}
              key={item.id || item._id}
              onSave={props.onSave}
              onDelete={props.onDelete}
              savedMovies={props.savedMovies}
            />
          ))}
        {props.isSearchActive && props.foundMovies.length === 0 && (
          <p className="movies-card__alert">Ничего не найдено</p>
        )}
      </div>
      {location.pathname === "/saved-movies" ||
      props.movies.length <= visibleMovieCount ? (
        ""
      ) : (
        <button
          className="movies-card-list__button"
          type="button"
          onClick={handleClick}
        >
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
