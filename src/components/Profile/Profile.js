import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Игорь!</h2>

      <form className="profile__form" name="profile__form" method="post">
        <fieldset className="profile__form-field">
          <label
            className="profile__form-label"
            htmlFor="profile__form-input_type_name"
          >
            Имя
          </label>
          <input
            className="profile__form-input profile__form-input_type_name"
            id="profile__form-input_type_name"
            type="text"
            name="name"
            value={"Игорь"}
            required
          />
        </fieldset>
        <fieldset className="profile__form-field">
          <label
            className="profile__form-label"
            htmlFor="profile__form-input_type_email"
          >
            E-mail
          </label>
          <input
            className="profile__form-input profile__form-input_type_email"
            id="profile__form-input_type_email"
            type="email"
            name="name"
            value={"pochta@yandex.ru"}
            required
          />
        </fieldset>
        <button type="submit" className="profile__form-submit">
          Редактировать
        </button>
        <Link className="profile__out-link" to="/">
          Выйти из аккаунта
        </Link>
      </form>
    </section>
  );
}

export default Profile;
