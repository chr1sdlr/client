import React from "react";
import "./EmailForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function EmailForm(props) {
    const { setShowModal, currentEmail } = props;
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            email: currentEmail || "",
            newEmail: "",
        },
        validationSchema: Yup.object({
            newEmail: Yup.string().email().required(),
        }),
        onSubmit: async (FormData) => {
            try {
                await updateUser({
                    variables: {
                        input: {
                            email: FormData["newEmail"],
                        },
                    },
                });
                toast.success("Tu email ha sido cambiado!");
                setShowModal(false);
            } catch (error) {
                toast.error("Error al actualizar el email.");
            }
        },
    });
    return (
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <h1>{formik.values.email}</h1>
            <Form.Input
                placeholder="Escribe tu nuevo email"
                name="newEmail"
                value={formik.values.newEmail}
                onChange={formik.handleChange}
                error={formik.errors.newEmail && true}
            />
            <Button className="btn-submit" type="submit">
                Actualizar email
            </Button>
        </Form>
    );
}
