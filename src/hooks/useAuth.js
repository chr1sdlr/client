import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default () => useContext(AuthContext); // Devuelve el valor que tiene el contexto.
