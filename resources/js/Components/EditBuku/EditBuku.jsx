// src/components/FormComponents.jsx

import React from 'react';

// Profile Picture Uploader Component
export const BukuPictureUploader = () => {
  return (
    <div className="buku-picture-uploader">
      <img
        src="/path/to/buku-picture.png"
        alt="Profile"
        className="buku-picture"
      />
      <button className="upload-button">Upload</button>
      <button className="remove-button">Remove</button>
    </div>
  );
};

// Input Field Component
export const InputField = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

// Dropdown Field Component
export const DropdownField = ({ label, options, value, onChange }) => {
  return (
    <div className="dropdown-field">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Text Area Field Component
export const TextAreaField = ({ label, value, onChange }) => {
  return (
    <div className="textarea-field">
      <label>{label}</label>
      <textarea value={value} onChange={onChange} />
    </div>
  );
};
