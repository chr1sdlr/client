import React from "react";
import "./SettingsForm.scss";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../../PasswordForm";
import useAuth from "../../../hooks/useAuth";
import { Button } from "semantic-ui-react";

export default function SettingsForm(props) {
    const { setShowModal, setTitleModal, setChildreModal } = props;
    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onChangePswd = () => {
        setTitleModal("Cambia tu contraseña");
        setChildreModal(<PasswordForm />);
    };

    const onlogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    };

    return (
        <div className="settings-form">
            <Button onClick={onChangePswd}>Cambia tu contraseña</Button>
            <Button>Cambia tu email</Button>
            <Button>Descripción</Button>
            <Button>Sitio web</Button>
            <Button onClick={onlogout}>Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    );
}
