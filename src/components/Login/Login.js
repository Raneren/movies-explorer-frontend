import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import FormFieldset from "../FormFieldset/FormFieldset";

function Login() {
  return (
    <section className="login">
      <Form
        title={"Рады видеть!"}
        formName={"login"}
        buttonText={"Войти"}
        linkDescription={"Ещё не зарегистрированы?"}
        linkPatch={"/sign-up"}
        linkText={"Регистрация"}
        children={
          <>
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

export default Login;