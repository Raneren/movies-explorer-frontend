import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

function Form(props) {
  return (
    <form className="form" name={props.formName} method="post">
      <h2 className="form__title">{props.title}</h2>
      {props.children}
      <button type="submit" className="form__submit-btn">
        {props.buttonText}
      </button>
      <div className="form__link-container">
        <p className="form__link-description">{props.linkDescription}</p>
        <Link to={props.linkPatch} className="form__link">
          {props.linkText}
        </Link>
      </div>
    </form>
  );
}

export default Form;
