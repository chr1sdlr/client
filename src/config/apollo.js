import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { getToken } from "../utils/token";

const httpLink = createUploadLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  
  const token = getToken();

  return {
    headers: {
      ...headers, // Uso del spread operator: Para llenar dentro de lo que hay en el objeto headers y no hacer otro objeto.
      Authorization: token ? `Bearer ${token}`: "",
    }
  }
});

const client = new ApolloClient({
  connectToDevTools: true, // Esto es para usar la herramienta de Google Chrome.
  cache: new InMemoryCache(), // Para poder almacenar cosas en el cache.
  link: authLink.concat(httpLink), // El link de la página que verifica si un usuario tiene token o no.
});

export default client;
