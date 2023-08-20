import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
function Header() {
  const [isDropDownMenuActive, setIsDropDownMenuActive] = React.useState(false);
  const location = useLocation();

  //функция активации выпадающего меню
  function handleDropDownMenuClick() {
    isDropDownMenuActive
      ? setIsDropDownMenuActive(false)
      : setIsDropDownMenuActive(true);
  }
  return (
    <header
      className={`header ${
        location.pathname === "/sign-up" || location.pathname === "/sign-in"
          ? "header_over-form"
          : ""
      }`}
    >
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {location.pathname === "/" && (
        <div className="header__links">
          <Link to="/sign-up" className="header__link header__link_type_signup">
            Регистрация
          </Link>
          <Link to="/sign-in" className="header__link header__link_type_signin">
            Войти
          </Link>
        </div>
      )}
      {location.pathname === "/profile" && (
        <>
          <Navigation />
          <Link
            to="/profile"
            className="header__link header__link_type_profile"
          >
            Аккаунт
          </Link>
        </>
      )}
      {(location.pathname === "/movies" ||
        location.pathname === "/saved-movies") && (
        <>
          <Navigation />
          <Link
            to="/profile"
            className="header__link header__link_type_profile"
          >
            Аккаунт
          </Link>
        </>
      )}
      {(location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile") && (
        <button
          className="header__menu-button"
          type="button"
          onClick={handleDropDownMenuClick}
        ></button>
      )}
      <DropDownMenu
        isOpen={isDropDownMenuActive}
        onDropDownMenuClick={handleDropDownMenuClick}
      />
    </header>
  );
}

export default Header;
