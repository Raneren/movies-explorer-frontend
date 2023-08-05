import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <div className="header__navigation">
      </div>
      <div className="header__links">
        <Link to="/sign-up" className="header__link header__link_type_signup">Регистрация</Link>
        <Link to="/sign-in" className="header__link header__link_type_signin">Войти</Link>
      </div>

    </header>
  );
}

export default Header;