import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "./Profile.scss";
import useAuth from "../../../hooks/useAuth";
import { Grid, Image } from "semantic-ui-react";
import imageNotFound from "../../../assets/png/avatar.png";
import { GET_USER } from "../../../gql/user";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";

export default function Profile(props) {
    const { username } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childreModal, setChildreModal] = useState(null);
    const { auth } = useAuth();
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { username },
    });

    if (loading) return null;
    if (error) return <UserNotFound />;
    const { getUser } = data;

    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambia tu foto de perfil");
                setChildreModal(
                    <AvatarForm setShowModal={setShowModal} auth={auth} />
                );
                setShowModal(true);
                break;
            case "settings":
                setTitleModal("Ajustes");
                setChildreModal(
                    <SettingsForm
                        setShowModal={setShowModal}
                        setTitleModal={setTitleModal}
                        setChildreModal={setChildreModal}
                        getUser={getUser}
                        refetch={refetch}
                    />
                );
                setShowModal(true);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image
                        src={getUser.avatar ? getUser.avatar : imageNotFound}
                        avatar
                        onClick={() =>
                            username === auth.username && handlerModal("avatar")
                        }
                    />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <HeaderProfile
                        getUser={getUser}
                        auth={auth}
                        handlerModal={handlerModal}
                    />
                    <div>Followers</div>
                    <div className="others">
                        <p className="name">
                            <i>
                                {getUser.name} {getUser.surname}
                            </i>
                        </p>
                        {getUser.webSite && (
                            <a
                                href="{getUser.webSite}"
                                className="webSite"
                                target="_blank"
                            >
                                {getUser.webSite}
                            </a>
                        )}
                        {getUser.description && (
                            <p className="description">{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
            >
                {childreModal}
            </ModalBasic>
        </>
    );
}
