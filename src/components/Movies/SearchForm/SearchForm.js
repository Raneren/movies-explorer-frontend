import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

function SearchForm() {
    return (
        <>
            <form className="search-form">
                <input type="search" className="search-form__input" placeholder="Фильм"></input>
                <button className="search-form__button" type="submit"></button>
            </form>
            <FilterCheckbox/>
        </>
    );
}

export default SearchForm;