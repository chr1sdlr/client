import React from "react";
import "./EmailForm.scss";
import { Form, Button } from "semantic-ui-react";

export default function EmailForm() {
    return (
        <Form className="email-form">
            <Form.Input placeholder="Escribe tu nuevo email" name="email" />
            <Button className="btn-submit" type="submit">
                Actualizar email
            </Button>
        </Form>
    );
}
