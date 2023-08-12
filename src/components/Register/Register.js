import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import FormFieldset from "../FormFieldset/FormFieldset";

function Register() {
  return (
    <section className="register">
      <Form
        title={"Добро пожаловать!"}
        formName={"register"}
        buttonText={"Зарегистрироваться"}
        linkDescription={"Уже зарегистрированы?"}
        linkPach={"/sign-in"}
        linkText={"Войти"}
        children={
          <>
            <FormFieldset
              inputName={"name"}
              labelText={"Имя"}
              inputType={"text"}
            />
            <FormFieldset
              inputName={"email"}
              labelText={"E-mail"}
              inputType={"email"}
            />
            <FormFieldset
              inputName={"password"}
              labelText={"Прароль"}
              inputType={"password"}
            />
          </>
        }
      />
    </section>
  );
}

export default Register;
