import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
function Header() {
  const location = useLocation();
  return (
    <header className={`header ${(location.pathname==="/sign-up"||location.pathname==="/sign-in")&&"header_over-form"}`}>
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__links">
              <Link
                to="/sign-up"
                className="header__link header__link_type_signup"
              >
                Регистрация
              </Link>
              <Link
                to="/sign-in"
                className="header__link header__link_type_signin"
              >
                Войти
              </Link>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navigation />
              <Link
                to="/profile"
                className="header__link header__link_type_account"
              >
                Аккаунт
              </Link>
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Navigation />
              <Link
                to="/profile"
                className="header__link header__link_type_account"
              >
                Аккаунт
              </Link>
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Navigation />
              <Link
                to="/profile"
                className="header__link header__link_type_account"
              >
                Аккаунт
              </Link>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
