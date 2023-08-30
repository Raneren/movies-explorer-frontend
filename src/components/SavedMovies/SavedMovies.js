import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

function SavedMovies(props) {
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [isCheckedInSaved, setIsCheckedInSaved] = React.useState(false);
  //функция переключения чекбокса в сохраненных фильмах
  function handleChangeFilterCheckboxInSaved() {
    setIsCheckedInSaved(!isCheckedInSaved);
    props.onCheckboxFilter(!isCheckedInSaved);
  }
  React.useEffect(() => {
    props.setFoundMoviesInSaved(props.movies);
  }, []);
  return (
    <section className="saved-movies">
      <SearchForm
        onSearch={props.onSearch}
        setIsSearchActive={setIsSearchActive}
        isChecked={isCheckedInSaved}
        onChange={handleChangeFilterCheckboxInSaved}
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
