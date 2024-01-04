import React from "react";
import "./InputGroupCheckbox.scss";

const InputGroupCheckbox = ({ labelCheckboxGroup, options, selectedOptions, onChange }) => {

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
    ? selectedOptions.filter((selectedOption) => selectedOption !== option) // Remove option if already selected
    : [...selectedOptions, option];

    onChange(updatedOptions);
  };

  return (
    <div className="input-group-checkbox-container">
      {labelCheckboxGroup && labelCheckboxGroup !== undefined && (
      <label>{labelCheckboxGroup}</label>
      )}
      <div className="checkbox-wrapper">
        {options.map((option) => (
          <label key={option} className="form-control"  >
            <input
              type="checkbox"
              value={option}
              name="checkbox-checked"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />            
            <span> {option} </span>
          </label>
        ))}
      </div>

      
    </div>
  );
};

export default InputGroupCheckbox;


