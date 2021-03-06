import React from "react";
import "./DescriptionForm.scss";
import { Form, TextArea, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function DescriptionForm(props) {
    const { setShowModal, currentDescription, refetch } = props;
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            description: currentDescription || "",
        },
        validationSchema: Yup.object({
            description: Yup.string().required(),
        }),
        onSubmit: async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: formData,
                    },
                });
                refetch();
                toast.success("Tu descripción se ha actualizado!");
                setShowModal(false);
            } catch (error) {
                toast.error("Error al actualizar tu descripción :c");
            }
        },
    });

    return (
        <Form className="description-form" onSubmit={formik.handleSubmit}>
            <TextArea
                placeholder=""
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={formik.errors.description && "error"}
            />
            <Button type="submit" className="btn-submit">
                Actualizar descripción
            </Button>
        </Form>
    );
}
