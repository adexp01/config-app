import React from "react";
const InputField = ({
  type,
  name,
  value,
  isSearch = false,
  placeholder,
  label = null,
  onChange,
  onBlur,
  ...additionalProps
}) => {
  return label ? (
    <div className="input-field-input">
      <label htmlFor={name}>{label}</label>
      <div className="form-group">
        <input
          className="form-control"
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          name={name}
          {...additionalProps}
        />
      </div>
    </div>
  ) : (
    <div className="form-group">
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        {...additionalProps}
      />
    </div>
  );
};

export default InputField;
