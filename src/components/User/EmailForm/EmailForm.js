import React from "react";
import "./EmailForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EmailForm(props) {
    const { setShowModal, currentEmail } = props;

    const formik = useFormik({
        initialValues: {
            email: currentEmail || "",
            newEmail: "",
        },
        validationSchema: Yup.object({
            newEmail: Yup.string().email().required(),
        }),
        onSubmit: (FormData) => {
            console.log(FormData);
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
