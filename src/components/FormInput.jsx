import React from "react";

const FormInput = ({ label, type, name }) => {
  return (
    <div className="form-group mb-3 w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder="Type here"
        className="input input-bordered w-full"
        required
      />
    </div>
  );
};

export default FormInput;
