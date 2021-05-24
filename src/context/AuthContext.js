import { createContext } from "react";

const AuthContext = createContext({
  // Se crea un contexto con el valor de usuario indefinido (los cuales no estan logueados).
  user: undefined,
});

export default AuthContext;
