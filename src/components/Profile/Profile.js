import React from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUserInfo({
      name,
      email,
    });
    props.onEditToggle();
  }
  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${name}!`}</h2>
      <form
        className="profile__form"
        name="profile__form"
        method="post"
        onSubmit={handleSubmit}
      >
        <fieldset className="profile__form-field">
          <label
            className="profile__form-label"
            htmlFor="profile__form-input_type_name"
            style={props.isActive ? {} : { pointerEvents: "none" }}
          >
            Имя
          </label>
          <input
            className="profile__form-input profile__form-input_type_name"
            id="profile__form-input_type_name"
            type="text"
            name="name"
            value={name || ""}
            onChange={handleChangeName}
            required
            style={props.isActive ? {} : { pointerEvents: "none" }}
          />
        </fieldset>
        <fieldset className="profile__form-field">
          <label
            className="profile__form-label"
            htmlFor="profile__form-input_type_email"
            style={props.isActive ? {} : { pointerEvents: "none" }}
          >
            E-mail
          </label>
          <input
            className="profile__form-input profile__form-input_type_email"
            id="profile__form-input_type_email"
            type="email"
            name="email"
            value={email || ""}
            onChange={handleChangeEmail}
            required
            style={props.isActive ? {} : { pointerEvents: "none" }}
          />
        </fieldset>
        {props.isActive ? (
          <button type="submit" className="profile__form-submit">
            Сохранить
          </button>
        ) : (
          <>
            <button
              type="button"
              className="profile__form-edit"
              onClick={props.onEditToggle}
            >
              Редактировать
            </button>
            <Link
              className="profile__out-link"
              to="/"
              onClick={props.onSignOut}
            >
              Выйти из аккаунта
            </Link>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
