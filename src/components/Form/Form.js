import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

function Form(props) {
  return (
    <form className="form" name={props.formName} method="post" onSubmit={props.onSubmit}>
      <div className="form__top-container">
        <h2 className="form__title">{props.title}</h2>
        {props.children}
      </div>
      <div className="form__bottom-container">
        <button type="submit" className="form__submit-btn" disabled={props.onDisabled}>
          {props.buttonText}
        </button>
        <div className="form__link-container">
          <p className="form__link-description">{props.linkDescription}</p>
          <Link to={props.linkPach} className="form__link">
            {props.linkText}
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Form;
