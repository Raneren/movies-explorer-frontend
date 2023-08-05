import React from "react";
import logo from "../../images/logo.svg";
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__navigation">
      </div>
      <div className="header__buttons">
        <button
          type="button"
          className="header__button_type_signup"
        >Регистрация</button>
        <button
          type="button"
          className="header__button_type_signin"
        >Войти</button>
      </div>

    </header>
  );
}

export default Header;