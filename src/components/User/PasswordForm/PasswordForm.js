import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import { toast } from "react-toastify";
import "./PasswordForm.scss";

export default function PasswordForm(props) {
    const { logout } = props;
    const [updateUser] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit: async (formValueData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formValueData.currentPassword,
                            newPassword: formValueData.newPassword,
                        },
                    },
                });

                if (!result.data.updateUser) {
                    toast.error(
                        "Error: No se ha podido cambiar la contraseña."
                    );
                } else {
                    logout();
                }
            } catch (error) {
                toast.error("Error: No se ha podido cambiar la contraseña.");
            }
        },
    });
    return (
        <Form className="password-form" onSubmit={formik.handleSubmit}>
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
            <Button type="submit" className="btn-submit">
                Actualizar
            </Button>
        </Form>
    );
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    };
}
