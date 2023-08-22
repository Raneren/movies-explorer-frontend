import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm(props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);

  function handleChangeSearchQuery(evt) {
    setSearchQuery(evt.target.value);
  }
  function handleChangeFilterCheckbox() {
    setIsChecked(!isChecked);
  }
  function handleSearchSubmit(evt) {
    evt.preventDefault();
    props.onSearch(searchQuery);
  }
  return (
    <>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          className="search-form__input"
          value={searchQuery || ""}
          onChange={handleChangeSearchQuery}
          placeholder="Фильм"
        ></input>
        <button className="search-form__button" type="submit"></button>
      </form>
      <FilterCheckbox 
      isChecked ={isChecked}
      onChange={handleChangeFilterCheckbox}/>
    </>
  );
}

export default SearchForm;
