import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PostDescription.scss";

export default function CommentForm(props) {
    const { post } = props;

    const formik = useFormik({
        initialValues: {
            description: "",
        },
        validationSchema: Yup.object({
            description: Yup.string().required(),
        }),
        onSubmit: (formData) => {
            console.log(formData);
        },
    });

    return (
        <Form
            className="modal-post-description-upload"
            onSubmit={formik.handleSubmit}
        >
            <Form.Input
                type="text"
                name="description"
                placeholder="Añade una descripción..."
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.errors.description && true}
            />
            <Button type="submit" className="btn-update-post-description">
                Actualizar descripción
            </Button>
        </Form>
    );
}
