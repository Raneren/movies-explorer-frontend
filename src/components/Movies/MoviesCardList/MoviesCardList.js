import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

function MoviesCardList(props) {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 650px)");

  const initialMovieCount = isDesktop ? 12 : isTablet ? 8 : 5;

  const [visibleMovieCount, setVisibleMovieCount] =
    React.useState(initialMovieCount);

  function handleClick() {
    calculateMovieCount();
  }

  function calculateMovieCount() {
    if (isDesktop) {
      return setVisibleMovieCount(visibleMovieCount + 3);
    }

    if (isTablet) {
      return setVisibleMovieCount(visibleMovieCount + 2);
    }

    setVisibleMovieCount(visibleMovieCount + 2);
  }
  console.log(props.movies.length <= visibleMovieCount);
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__container">
        {props.movies?.slice(0, visibleMovieCount).map((item) => (
          <MoviesCard movie={item} key={item.id} />
        ))}
      </div>
      {props.movies.length <= visibleMovieCount ? (
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
