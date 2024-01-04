import React from "react";
import "./InputText.scss";
import classNames from 'classnames';

export const InputText = ({ type = "text", label, value, onChange,placeholder , className , id , isRequired , errorText , kind}) => {


  const btnClass = classNames(
    'input-text-grp',
    {
		'error': errorText && errorText !== "",
	  }
  );


  return (
    <div className="input-text-container">
      {label && label !== undefined  && (
          <label  htmlFor={id} className="form-label" >{label}</label>
      )}

      <div className={btnClass}>
          <input type={type} id={id} value={value} onChange={onChange}
          placeholder={placeholder} 
          required= {isRequired ?   true : false}
          className="form-control"
          />
          { errorText && errorText !== "" &&

          (
            <span> { errorText }  </span>

          )
             }
      </div>
    </div>
  );
};

export default InputText;
