import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

function SavedMovies(props) {
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  return (
    <section className="saved-movies">
      <SearchForm
        onSearch={props.onSearch}
        setIsSearchActive={setIsSearchActive}
        isChecked={props.isChecked}
        onChange={props.onChange}
      />
      <MoviesCardList
        movies={props.movies}
        onDelete={props.onDelete}
        savedMovies={props.movies}
        isSearchActive={isSearchActive}
        foundMovies={props.foundMovies}
      />
    </section>
  );
}

export default SavedMovies;
