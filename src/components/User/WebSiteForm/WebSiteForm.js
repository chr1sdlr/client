import React from "react";
import "./WebSiteForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function WebSiteForm(props) {
    const { setShowModal, currentWebSite, refetch } = props;
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            webSite: currentWebSite || "",
            newWebsite: "",
        },
        validationSchema: Yup.object({
            newWebsite: Yup.string().required(),
        }),
        onSubmit: async (FormData) => {
            try {
                await updateUser({
                    variables: {
                        input: {
                            webSite: FormData["newWebsite"],
                        },
                    },
                });
                refetch();
                toast.success("Tu sitio web ha sido actualizado!");
                setShowModal(false);
            } catch (error) {
                toast.error("No se ha podido actualizar tu sitio web :c");
            }
        },
    });

    return (
        <div>
            <Form className="website-form" onSubmit={formik.handleSubmit}>
                <h2>{formik.values.webSite}</h2>
                <Form.Input
                    placeholder="Ingresa tu nuevo sitio web"
                    name="newWebsite"
                    value={formik.values.newWebsite}
                    onChange={formik.handleChange}
                    error={formik.errors.newWebsite && true}
                />
                <Button className="btn-submit" type="submit">
                    Actualizar email
                </Button>
            </Form>
        </div>
    );
}
