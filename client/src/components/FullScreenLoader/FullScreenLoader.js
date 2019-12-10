import React from "react";

const FullScreenLoader = ({ children, background }) => {
  return (
    <div className="wrapper" style={{ background: background }}>
      {children}
    </div>
  );
};

export default FullScreenLoader;
