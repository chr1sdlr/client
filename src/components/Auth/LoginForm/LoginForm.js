import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Importación de Yup.
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user"; // Importación de la función LOGIN de GraphQL/user.
import { setToken, decodeToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";
import "./LoginForm.scss";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      // Se usa yup para la validación de formularios hechos con formik.
      email: Yup.string()
        .email("El email no es válido")
        .required("No puedes iniciar sesión sin tu correo eletrónico"),
      password: Yup.string().required(
        "Necesitas tu contraseña para iniciar sesión"
      ),
    }),
    onSubmit: async (formData) => {
      setError(""); // Limpia el error si existe (solamente usa el estado una única vez).
      try {
        const { data } = await login({
          variables: {
            input: formData,
          },
        });
        const { token } = data.login;
        setToken(token); // Se usa la función setToken para guardar el token generado en el localStorage.
        setUser(decodeToken(token)); // Se decodifica el token y se le pasa a setUser (setear el estado).
      } catch (error) {
        setError(error.message); // Muestra el mensaje de error.
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>¡Bienvenido otra vez!</h2>
      <Form.Input
        type="text"
        placeholder="Correo electrónico"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        placeholder="Contraseña"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesión
      </Button>
      {error && <p className="btn submit-error">{error}</p>}
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
