import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm 
      onSearch={props.onSearch}/>
      {props.preloaderActive ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={props.movies} />
      )}
    </section>
  );
}

export default Movies;
