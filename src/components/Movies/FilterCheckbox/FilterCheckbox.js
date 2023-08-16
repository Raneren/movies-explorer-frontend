import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="filter-checkbox__input"
        type="checkbox"
      />
      <label
        className="filter-checkbox__label"
        htmlFor="filter-checkbox__input"
      >
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
