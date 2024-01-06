import React from "react";
import "./InputGroupCheckbox.scss";

const InputGroupCheckbox = ({ labelCheckboxGroup, options, handleChange }) => {
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
