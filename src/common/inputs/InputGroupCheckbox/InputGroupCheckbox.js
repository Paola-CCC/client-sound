import React from "react";
import "./InputGroupCheckbox.scss";

const InputGroupCheckbox = ({ labelCheckboxGroup,listInstrumentsPlayed, options, handleChange }) => {
  return (
    <>
      {labelCheckboxGroup && labelCheckboxGroup !== undefined && (
        <label>{labelCheckboxGroup}</label>
      )}
      <div className="checkbox-wrapper">
        {options?.map((option, index) => (
          <label key={index} className="form-control">
            <input
              type="checkbox"
              value={option.value}
              name="checkbox-checked"
              checked={listInstrumentsPlayed?.includes(option.value)}
              onChange={handleChange}
            />
            <span> {option.label} </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default InputGroupCheckbox;
