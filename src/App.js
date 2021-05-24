import React, { useState, useEffect, useMemo } from "react";
import { ApolloProvider } from "@apollo/client"; /* Context Api, que permite envolver toda la aplicación y 
que esta a su vez, tenga acceso a las peticiones del servidor, cache, basicamente a todo.*/
import client from "./config/apollo";
import { ToastContainer } from "react-toastify";
import { getToken, decodeToken, removeToken } from "./utils/token";
import AuthContext from "./context/AuthContext";
import Auth from "./pages/Auth/index";
import Navigation from "./routes/Navigation";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    // useMemo: es un hook que compara los cambios, si llegan los mismos datos el componente no se recarga.
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if(auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer
          position="top-right" // Posición del toast: parte superior derecha.
          autoClose={5000} // Para que se cierre luego de 5000 ms = 5 segundos.
          hideProgressBar // Esconde la barra de progeso del toast.
          newestOnTop // Cuando haya un nuevo toast, este aparezca arriba y los demás abajo.
          closeOnClick // Para cerrar el toast cuando se clicke en el.
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover // Para pausar el tiempo del cerrado automático cuando se pose el mouse sobre el toast.
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
