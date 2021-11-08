import React from "react";
import "./CommentForm.scss";
import { Form, Button } from "semantic-ui-react";

export default function CommentForm(props) {
    const { post } = props;
    return (
        <Form className="comment-form">
            <Form.Input
                placeholder="Escribe tu comentario..."
                name="comment-input"
            />
            <Button type="submit">Postear</Button>
        </Form>
    );
}
