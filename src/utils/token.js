import { TOKEN } from "./constants";
import jwtDecode from "jwt-decode";

export function setToken(token) {
  // Esta función guarda el token en el LocalStorage.
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  // Esta función obtiene el token guardado del LocalStorage.
  return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
  // Decodifica los datos que hay en el token
  return jwtDecode(token);
}

export function removeToken() {
  // Elimina el token del LocalStorage para cerrar sesión
  localStorage.removeItem(TOKEN);
}
