import React from "react";
import "./FormFieldset.css";

function FormFieldset(props) {
  return (
    <fieldset className="form-field">
      <label
        className="form-field__label"
        htmlFor={`form-field__input_type_${props.inputName}`}
      >
        {props.labelText}
      </label>
      <input
        className={`form-field__input form-field__input_type_${props.inputName}`}
        id={`form-field__input_type_${props.inputName}`}
        type={props.inputType}
        name={props.inputName}
        required
      />
    </fieldset>
  );
}

export default FormFieldset;
