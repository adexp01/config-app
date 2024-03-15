import React, { useEffect, useState } from "react";

const CheckboxGroup = ({ name, options, selectedValues, onChange, label }) => {
  const [selectionOrder, setSelectionOrder] = useState([]);

  const handleCheckboxChange = (value) => {
    let newSelectedValues, newSelectionOrder;

    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((v) => v !== value);
      newSelectionOrder = selectionOrder.filter((v) => v !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
      newSelectionOrder = [...selectionOrder, value];
    }

    onChange(newSelectedValues);
    setSelectionOrder(newSelectionOrder);
  };

  const renderLabelWithOrder = (option) => {
    const orderIndex = selectionOrder.indexOf(option.value) + 1;
    return orderIndex ? `${orderIndex}. ${option.label}` : option.label;
  };

  useEffect(() => {
    const initialOrder = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.value);
    setSelectionOrder(initialOrder);
  }, []);

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
            {renderLabelWithOrder(option)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
