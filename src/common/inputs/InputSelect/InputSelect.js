import React from "react";
import "./InputSelect.scss";

const InputSelect = ({ label, options, value, onChange  }) => {
  return (
    <div className="input-select-container">

      {label && (
        <label>{label}</label>
      )}
      <select value={value} onChange={onChange}>
        {options.map((option , index) => (
          <option key={index} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
