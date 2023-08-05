import React from "react";
import './SearchForm.css';

function SearchForm() {
    return (
        <>
            <form className="search-form">
                <input className="search-form__input" placeholder="Фильм"></input>
                <button className="search-form__button" type="submit"></button>
            </form>
        </>
    );
}

export default SearchForm;