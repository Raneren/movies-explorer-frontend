import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./DropDownMenu.css";

function DropDownMenu(props) {
  return (
    <div
      className={`drop-down-menu ${
        props.isOpen ? "drop-down-menu_active" : ""
      }`}
    >
      <div className="drop-down-menu__container">
        <ul className="drop-down-menu__list">
          <li className="drop-down-menu__list-item">
            <NavLink className="drop-down-menu__link" to={"/"}>
              Главная
            </NavLink>
          </li>
          <li className="drop-down-menu__list-item">
            <NavLink
              className={({ isActive }) =>
                `drop-down-menu__link ${
                  isActive ? "drop-down-menu__link_active" : ""
                }`
              }
              to={"/movies"}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="drop-down-menu__list-item">
            <NavLink
              className={({ isActive }) =>
                `drop-down-menu__link ${
                  isActive ? "drop-down-menu__link_active" : ""
                }`
              }
              to={"/saved-movies"}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link
          className="drop-down-menu__link drop-down-menu__link_type_profile"
          to={"/profile"}
        >
          Аккаунт
        </Link>
        <button
          className="drop-down-menu__button-close"
          onClick={props.onDropDownMenuClick}
        ></button>
      </div>
    </div>
  );
}

export default DropDownMenu;
