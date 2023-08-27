import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import FormFieldset from "../FormFieldset/FormFieldset";

function Login(props) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    email: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });
  const isValid = formValue.email.isValid && formValue.password.isValid;
  React.useEffect(() => {
    isValid ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [isValid]);
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
    const { email, password } = formValue;
    props.onLogin(email.value, password.value);
  }

  return (
    <section className="login">
      <Form
        title={"Рады видеть!"}
        formName={"login"}
        buttonText={"Войти"}
        linkDescription={"Ещё не зарегистрированы?"}
        linkPach={"/sign-up"}
        linkText={"Регистрация"}
        onSubmit={handleSubmit}
        onDisabled={buttonDisabled}
        children={
          <>
            <FormFieldset
              onChange={handleChange}
              value={formValue.email.value || ""}
              inputName={"email"}
              labelText={"E-mail"}
              inputType={"email"}
              errorMessage={formValue.email.errorMessage}
            />
            <FormFieldset
              onChange={handleChange}
              value={formValue.password.value || ""}
              inputName={"password"}
              labelText={"Пароль"}
              inputType={"password"}
              errorMessage={formValue.password.errorMessage}
            />
          </>
        }
      />
    </section>
  );
}

export default Login;
