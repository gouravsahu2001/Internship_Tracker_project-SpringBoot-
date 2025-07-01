import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search by Student ID or Title"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;