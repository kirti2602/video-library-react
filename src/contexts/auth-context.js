import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: localStorage.getItem("AUTH_TOKEN") ? true : false,
    token: localStorage.getItem("AUTH_TOKEN"),
    user: JSON.parse(localStorage.getItem("user")),
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
