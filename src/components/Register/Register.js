import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <section className="register">
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" name="register__form" method="post">
        <fieldset className="register__form-field">
          <label
            className="register__form-label"
            htmlFor="register__form-input_type_name"
          >
            Имя
          </label>
          <input
            className="register__form-input register__form-input_type_name"
            id="register__form-input_type_name"
            type="text"
            name="name"
            required
          />
        </fieldset>
        <fieldset className="register__form-field">
          <label
            className="register__form-label"
            htmlFor="register__form-input_type_email"
          >
            E-mail
          </label>
          <input
            className="register__form-input register__form-input_type_email"
            id="register__form-input_type_email"
            type="email"
            name="email"
            required
          />
        </fieldset>
        <fieldset className="register__form-field">
          <label
            className="register__form-label"
            htmlFor="register__form-input_type_email"
          >
            Прароль
          </label>
          <input
            className="register__form-input register__form-input_type_password"
            id="register__form-input_type_password"
            type="password"
            name="password"
            required
          />
        </fieldset>
        <button type="submit" className="register__form-submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__link-container">
        <p className="register__link-description">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;
