import React from "react";
import "./InputRadio.scss";

const InputRadio = ({ labelRadioGroup, options, selectedOption, onChange }) => {
  return (
    <div className="container-inputradio">

      {labelRadioGroup && labelRadioGroup !== undefined  && (
      <label>{labelRadioGroup}</label>
      )}
      <div className="radio-zone">
        {options.map((option) => (
          <label key={option.value} className="">
            <input
              type="radio"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={onChange}
              name={option.valueLabel}
              id={option.valueLabel}
            />
            <span htmlFor={option.valueLabel}>{option.valueLabel}</span>
          </label>
        ))}
      </div>
     
    </div>
  );
};

export default InputRadio;
