import React from "react";
import CustomQRCodeGenerator from "./CustomQRCodeGenerator";
import "./app.css";
const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen h-fit w-full">
      <CustomQRCodeGenerator />
    </div>
  );
};

export default App;
