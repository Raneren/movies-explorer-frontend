import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import FormFieldset from "../FormFieldset/FormFieldset";

function Register(props) {
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
    password: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });
  const isValid =
    formValue.name.isValid &&
    formValue.email.isValid &&
    formValue.password.isValid;
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
    const { name, email, password } = formValue;
    props.onRegister(name.value, email.value, password.value);
  }
  return (
    <section className="register">
      <Form
        title={"Добро пожаловать!"}
        formName={"register"}
        buttonText={"Зарегистрироваться"}
        linkDescription={"Уже зарегистрированы?"}
        linkPach={"/sign-in"}
        linkText={"Войти"}
        onSubmit={handleSubmit}
        onDisabled={buttonDisabled}
        children={
          <>
            <FormFieldset
              onChange={handleChange}
              value={formValue.name.value || ""}
              inputName={"name"}
              labelText={"Имя"}
              inputType={"text"}
              errorMessage={formValue.name.errorMessage}
            />
            <FormFieldset
              onChange={handleChange}
              value={formValue.email.value || ""}
              inputName={"email"}
              labelText={"E-mail"}
              inputType={"email"}
              pattern={"[\\w\\-]+@[\\w\\-]+\\.[a-zA-Z]{2,}"}
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

export default Register;
