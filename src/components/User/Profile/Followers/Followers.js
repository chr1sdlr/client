import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follower";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

export default function Followers(props) {
    const { username } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    // Para crear un alias de la variable que se va a devolver basta con ponerle : nombre_alias
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

    // Esta funcion configura un realtime para refrescar la pagina y verificar si esta obteniendo nuevos seguidores.
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        };
    }, [startPollingFollowers, stopPollingFollowers]);

    const openFollowers = () => {
        setTitleModal("Seguidores");
        setChildrenModal(
            <ListUsers users={getFollowers} setShowModal={setShowModal} />
        );
        setShowModal(true);
    };

    if (loadingFollowers) return null;
    const { getFollowers } = dataFollowers;

    return (
        <>
            <div className="followers">
                <p>
                    <span>**</span> publicaciones
                </p>
                <p className="link" onClick={openFollowers}>
                    <span>{size(getFollowers)}</span> seguidores
                </p>
                <p className="link">
                    <span>**</span> seguidos
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
