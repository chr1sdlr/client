import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
// Si el formulario no cumple con las validaciones de Yup, el onSubmit jamás se va a ejecutar.
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setShowLogin } = props; // Aquí se hace un object destructuring

  const [register] = useMutation(REGISTER); // Se hace un array destruturing

  // La siguiente constante aloja la estructura de los datos del formulario
  const formik = useFormik({
    initialValues: initialFormValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("No puedes omitir tu nombre, es obligatorio"),
      surname: Yup.string().required("Tu apellido es requerido"),
      username: Yup.string()
        // Expresión regular: solamente caracteres alfanuméricos
        .matches(/^[a-zA-Z0-9-]*$/, "Carácter no permitido")
        .required("Necesitas un nombre de usuario"),
      email: Yup.string()
        .email("El email no es válido")
        .required("Es necesario que ingreses tu email"),
      password: Yup.string()
        .required("Contraseña obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no coinciden"),
      repeatPassword: Yup.string()
        .required("Debes repetir tu contraseña")
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    }),
    onSubmit: async (formValue) => {
      try {
        const newUser = formValue; // Variable para modificar los datos que lleguen desde formValue
        delete newUser.repeatPassword; // Elimina la propiedad "repeatPassword" para no enviarla al server

        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Usuario registrado satisfactoriamente");
        setShowLogin(true);
        /* Para mostrar el formulario de login:
        si anteriormente esta en false, se cambia para mostrar el formulario */
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Crea tu cuenta para que puedas publicar y ver tareas de tus compañeros.
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Aquí va tu nombre"
          name="name"
          onChange={formik.handleChange} // Propiedad para actulizar los datos de la const formik
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          type="text"
          placeholder="Ingresa aquí tu apellido"
          name="surname"
          onChange={formik.handleChange}
          value={formik.values.surname}
          error={formik.errors.surname}
        />
        <Form.Input
          type="text"
          placeholder="Escoge un nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Form.Input
          type="text"
          placeholder="Asocia un correo electrónico"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          type="password"
          placeholder="Crea una contraseña"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Input
          type="password"
          placeholder="Confirma tu contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />
        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
}

function initialFormValues() {
  return {
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
