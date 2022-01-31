import React from "react";

export const Input = ({ change }) => {
  return (
    <>
      <a href="#" draggable="false">
        <label className="has-float-label">
          <input placeholder=" " type="url" required="required" onChange={change}/>
          <span className="label">Url *</span>
          <div className="error">Error: Please enter a valid Url</div>
        </label>
      </a>
    </>
  );
};
