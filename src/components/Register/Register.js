import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import FormFieldset from "../FormFieldset/FormFieldset";

function Register(props) {
  const [formValue, setFormValue] = React.useState({
    name: "",
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
    const { name, email, password } = formValue;
    props.onRegister(name, email, password);
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
        children={
          <>
            <FormFieldset
              onChange={handleChange}
              value={formValue.name || ""}
              inputName={"name"}
              labelText={"Имя"}
              inputType={"text"}
            />
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

export default Register;
