import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import FormFieldset from "../FormFieldset/FormFieldset";

function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    props.onLogin(email, password);
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
        children={
          <>
            <FormFieldset
              onChange={handleChange}
              value={formValue.email || ""}
              inputName={"email"}
              labelText={"E-mail"}
              inputType={"email"}
            />
            <FormFieldset
              onChange={handleChange}
              value={formValue.password || ""}
              inputName={"password"}
              labelText={"Пароль"}
              inputType={"password"}
            />
          </>
        }
      />
    </section>
  );
}

export default Login;
