import React, { FC } from "react";

const CheckboxGroup = ({ name, options, selectedValues, onChange, label }) => {
  const handleCheckboxChange = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  return (
    <div className="checkbox-group-container">
      {label && <div className="checkbox-group-label">{label}</div>}
      {options.map((option) => (
        <div key={option.value} className="checkbox-button-container">
          <input
            type="checkbox"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={(e) => handleCheckboxChange(Number(option.value))}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="checkbox-button-label"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
