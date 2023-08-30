import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import "./Movies.css";

function Movies(props) {
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  //функция переключения чекбокса
  function handleChangeFilterCheckbox() {
    setIsChecked(!isChecked);
    props.onCheckboxFilter(!isChecked);
  }
  React.useEffect(() => {
    if (localStorage.isChecked) {
      setIsChecked(JSON.parse(localStorage.isChecked));
    }
  }, []);
  return (
    <section className="movies">
      <SearchForm
        setIsSearchActive={setIsSearchActive}
        onSearch={props.onSearch}
        isChecked={isChecked}
        onChange={handleChangeFilterCheckbox}
      />
      {props.preloaderActive ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={props.movies}
          isSearchActive={isSearchActive}
          onSave={props.onSave}
          onDelete={props.onDelete}
          savedMovies={props.savedMovies}
          foundMovies={props.foundMovies}
        />
      )}
    </section>
  );
}

export default Movies;
