import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile(props) {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Игорь!</h2>
      <form className="profile__form" name="profile__form" method="post">
        <fieldset className="profile__form-field">
          <label
            className="profile__form-label"
            htmlFor="profile__form-input_type_name"
            style={
              props.isActive
                ? {}
                : {pointerEvents: "none"}
            }
          >
            Имя
          </label>
          <input
            className="profile__form-input profile__form-input_type_name"
            id="profile__form-input_type_name"
            type="text"
            name="name"
            defaultValue={"Игорь"}
            required
            style={
              props.isActive
                ? {}
                : {pointerEvents: "none"}
            }
          />
        </fieldset>
        <fieldset className="profile__form-field">
          <label
            className="profile__form-label"
            htmlFor="profile__form-input_type_email"
            style={
              props.isActive
                ? {}
                : {pointerEvents: "none"}
            }
          >
            E-mail
          </label>
          <input
            className="profile__form-input profile__form-input_type_email"
            id="profile__form-input_type_email"
            type="email"
            name="email"
            defaultValue={"pochta@yandex.ru"}
            required
            style={
              props.isActive
                ? {}
                : {pointerEvents: "none"}
            }
          />
        </fieldset>
        {props.isActive ? (
          <button type="submit" className="profile__form-submit" onClick={props.onEditButtonClick}>
            Сохранить
          </button>
        ) : (
          <>
            <button type="button" className="profile__form-edit" onClick={props.onEditButtonClick}>
              Редактировать
            </button>
            <Link className="profile__out-link" to="/">
              Выйти из аккаунта
            </Link>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
