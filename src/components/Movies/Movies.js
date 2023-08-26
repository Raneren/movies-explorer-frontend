import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

function Movies(props) {
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  return (
    <section className="movies">
      <SearchForm
        setIsSearchActive={setIsSearchActive}
        onSearch={props.onSearch}
        isChecked={props.isChecked}
        onChange={props.onChange}
      />
      {props.preloaderActive ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={props.movies} isSearchActive={isSearchActive} />
      )}
    </section>
  );
}

export default Movies;
