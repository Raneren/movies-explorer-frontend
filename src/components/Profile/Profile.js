import React from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [alarmActive, setAlarmActive] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    name: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    email: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });
  const isValid = formValue.name.isValid && formValue.email.isValid;
  React.useEffect(() => {
    isValid &&
    (currentUser.name !== formValue.name.value ||
      currentUser.email !== formValue.email.value)
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [isValid, formValue]);
  function handleChange(evt) {
    const { name, value, validity, validationMessage } = evt.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: {
        ...formValue[name],
        value,
        isValid: validity.valid,
        errorMessage: validationMessage,
      },
    }));
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUserInfo({
      name: formValue.name.value,
      email: formValue.email.value,
    });
    props.onEditToggle();
    setAlarmActive(true);
  }
  React.useEffect(() => {
    setFormValue({
      name: {
        value: currentUser.name,
        isValid: true,
        errorMessage: "",
      },
      email: {
        value: currentUser.email,
        isValid: true,
        errorMessage: "",
      },
    });
    setAlarmActive(false);
  }, []);
  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
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
            value={formValue.name.value || ""}
            onChange={handleChange}
            required
            style={props.isActive ? {} : { pointerEvents: "none" }}
          />
          <span className="profile__form-input-error">
            {formValue.name.errorMessage}
          </span>
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
            pattern=".+@.+\..+"
            value={formValue.email.value || ""}
            onChange={handleChange}
            required
            style={props.isActive ? {} : { pointerEvents: "none" }}
          />
          <span className="profile__form-input-error">
            {formValue.email.errorMessage}
          </span>
        </fieldset>
        {props.isActive ? (
          <button
            type="submit"
            className="profile__form-submit "
            disabled={buttonDisabled}
          >
            Сохранить
          </button>
        ) : (
          <>
            {alarmActive && (
              <p className="profile__alert">Данные успешно сохранены</p>
            )}
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
