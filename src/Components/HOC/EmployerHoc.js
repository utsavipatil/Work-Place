import React from "react";

function EmployerHoc({ children }) {
  return (
    <div>
      <h2>EmployerHoc</h2>
      {children}
    </div>
  );
}

export default EmployerHoc;
