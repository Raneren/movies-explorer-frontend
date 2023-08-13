import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <NavLink
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
        to="/movies"
      >
        Фильмы
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
        to="/saved-movies"
      >
        Сохранённые фильмы
      </NavLink>
    </div>
  );
}

export default Navigation;
