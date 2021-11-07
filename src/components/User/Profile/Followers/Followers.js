import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follower";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import { Icon } from "semantic-ui-react";
import "./Followers.scss";

export default function Followers(props) {
    const { username, allPublications } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    // Para crear un alias de la variable que se va a devolver basta con ponerle : nombre_alias
    // Esta peticion es para obtener las personas que nos siguen
    const {
        data: dataFollowers,
        loading: loadingFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers,
    } = useQuery(GET_FOLLOWERS, {
        variables: {
            username,
        },
    });

    // Esta peticion es para obtener las personas que seguimos
    const {
        data: dataFolloweds,
        loading: loadingFolloweds,
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds,
    } = useQuery(GET_FOLLOWEDS, {
        variables: {
            username,
        },
    });

    // Esta funcion configura un realtime para refrescar la pagina y verificar si esta obteniendo nuevos seguidores.
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        };
    }, [startPollingFollowers, stopPollingFollowers]);

    // Este useEffect recarga la pagina en cache para ver que usuarios seguimos
    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        };
    }, [startPollingFolloweds, stopPollingFolloweds]);

    const openFollowers = () => {
        setTitleModal("Mis seguidores");
        setChildrenModal(
            <ListUsers users={getFollowers} setShowModal={setShowModal} />
        );
        setShowModal(true);
    };

    const openFolloweds = () => {
        setTitleModal("Personas a quien sigo");
        setChildrenModal(
            <ListUsers users={getFolloweds} setShowModal={setShowModal} />
        );
        setShowModal(true);
    };

    if (loadingFollowers || loadingFolloweds) return null;
    const { getFollowers } = dataFollowers;
    const { getFolloweds } = dataFolloweds;

    return (
        <>
            <div className="followers">
                <p>
                    <Icon name="edit" className="followers__icon" />
                    <span>{allPublications}</span> publicaciones.
                </p>
                <p className="link" onClick={openFollowers}>
                    <Icon name="spy" className="followers__icon" />
                    <span>{size(getFollowers)}</span> seguidores.
                </p>
                <p className="link" onClick={openFolloweds}>
                    <Icon name="group" className="followers__icon" />
                    <span>{size(getFolloweds)}</span> seguidos.
                </p>
            </div>
            <ModalBasic
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
            >
                {childrenModal}
            </ModalBasic>
        </>
    );
}
