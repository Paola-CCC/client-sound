import React from "react";
import "./Button.scss";
import classNames from 'classnames';

const Button = ({ children, kind , type,  onClick, disabled , id, isSelected}) => {

  const btnClass = classNames(
    'button',
    {
		'primary': kind && kind === "primary",
		'secondary': kind && kind === "secondary",
    'tertiary': kind && kind === "tertiary",
    'good-answers': kind && kind === "good-answers",
		'false-answers': kind && kind === "false-answers",
    'seletedAnswers': isSelected && isSelected == true
	});

  return (
    <button className={btnClass} type={type}  id={id} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
