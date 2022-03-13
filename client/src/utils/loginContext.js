import React, { createContext, useContext } from 'react';

// Initialize new context for login
const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

// loginProvider component that holds initial state, returns provider component
export const LoginProvider = ({ children }) => {
  const initialState = {
    email: "",
    password: ""
  };

  // Provider components expect a value prop to be passed
  return (
    <LoginContext.Provider value={initialState}>
      {/* Render children passed from props */}
      {children}
    </LoginContext.Provider>
  );
};