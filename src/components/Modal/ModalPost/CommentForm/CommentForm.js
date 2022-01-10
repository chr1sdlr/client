import React from "react";
import "./CommentForm.scss";
import { useMutation } from "@apollo/client";
import { ADD_USER_COMMENT } from "../../../../gql/comment";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CommentForm(props) {
    const { post } = props;
    const [addUserComment] = useMutation(ADD_USER_COMMENT);

    const formik = useFormik({
        initialValues: {
            userComment: "",
        },
        validationSchema: Yup.object({
            userComment: Yup.string().required(),
        }),
        onSubmit: async (formValues) => {
            try {
                await addUserComment({
                    variables: {
                        input: {
                            idPublication: post.id,
                            userComment: formValues.userComment,
                        },
                    },
                });
                formik.handleReset();
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <Form className="comment-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder="Escribe tu comentario..."
                name="userComment"
                value={formik.values.userComment}
                onChange={formik.handleChange}
                error={formik.errors.userComment && true}
            />
            <Button type="submit">Postear</Button>
        </Form>
    );
}
