import React from "react";
import "../App.css";
const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="header bg-white flex justify-center items-center p-6 text-5xl font-mono italic font-semibold tracking-tight shadow-md text-slate-500 hover:text-sky-400 ">
        <h3>chat_App</h3>
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
