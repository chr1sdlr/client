import React from "react";
import "./SettingsForm.scss";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import WebSiteForm from "../WebSiteForm/WebSiteForm";
import useAuth from "../../../hooks/useAuth";
import { Button } from "semantic-ui-react";

export default function SettingsForm(props) {
    const { setShowModal, setTitleModal, setChildreModal, getUser, refetch } =
        props;
    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onChangePswd = () => {
        setTitleModal("Cambia tu contraseña");
        setChildreModal(<PasswordForm logout={onLogout} />);
    };

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    };

    const onChangeEmail = () => {
        setTitleModal("Cambia tu email asociado");
        setChildreModal(
            <EmailForm
                setShowModal={setShowModal}
                currentEmail={getUser.email}
                refetch={refetch}
            />
        );
    };

    const onChangeWebsiteForm = () => {
        setTitleModal("Cambia tu sitio web");
        setChildreModal(
            <WebSiteForm
                setShowModal={setShowModal}
                currentWebSite={getUser.webSite}
                refetch={refetch}
            />
        );
    };

    const onChangeDescription = () => {
        setTitleModal("Actualiza la descripción de tu perfil");
        setChildreModal(
            <DescriptionForm
                setShowModal={setShowModal}
                currentDescription={getUser.description}
                refetch={refetch}
            />
        );
    };

    return (
        <div className="settings-form">
            <Button onClick={onChangePswd}>Cambia tu contraseña</Button>
            <Button onClick={onChangeEmail}>Cambia tu email</Button>
            <Button onClick={onChangeDescription}>Descripción</Button>
            <Button onClick={onChangeWebsiteForm}>Sitio web</Button>
            <Button onClick={onLogout}>Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    );
}
