import React from 'react';
import { useForm, useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'semantic-ui-react';
import "./PasswordForm.scss";

export default function PasswordForm() {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")])
        }),
        onSubmit: (formValueData) => {
            console.log("Formulario enviado");
            console.log(formValueData);
        }
    });
    return (
        <Form className='password-form' onSubmit={formik.handleSubmit}>
            <Form.Input
                type="password"
                placeholder="Ingresa tu contraseña actual" 
                name="currentPassword" 
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />
            <Form.Input
                type="password"
                placeholder="Nueva contraseña" 
                name="newPassword" 
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
                
            />
            <Form.Input
                type="password"
                placeholder="Repite la nueva contraseña" 
                name="repeatNewPassword" 
                onChange={formik.handleChange}
                error={formik.errors.repeatNewPassword && true}
                value={formik.values.repeatNewPassword}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>

    );
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    }
}