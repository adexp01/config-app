import React from "react";

const Radio = ({ label, options, selectedOption, name, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {options.map((option) => (
        <div
          className="custom-control custom-radio"
          key={option.label + option.value}
        >
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            className="custom-control-input"
            checked={String(selectedOption) === String(option.value)}
            value={option.value}
            onChange={(e) => {
              e.stopPropagation();
              onChange(e);
            }}
          />
          <label
            className="custom-control-label"
            htmlFor={`${name}-${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
