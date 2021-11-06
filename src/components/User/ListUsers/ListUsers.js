import React from "react";
import { useHistory } from "react-router-dom";
import { Image } from "semantic-ui-react";
import ImageNotFound from "../../../assets/png/avatar.png";
import { size, map } from "lodash";
import "./ListUsers.scss";

export default function ListUsers(props) {
    const { users, setShowModal } = props;
    const history = useHistory();

    const goToUser = (username) => {
        setShowModal(false);
        history.push(`/${username}`);
    };

    return (
        <div className="list-users">
            {size(users) === 0 ? (
                <p className="list-users__not-users">
                    No se han encontrado usuarios
                </p>
            ) : (
                map(users, (user, index) => (
                    <div
                        key={index}
                        className="list-users__users"
                        onClick={() => goToUser(user.username)}
                    >
                        <Image src={user.avatar || ImageNotFound} avatar />
                        <div>
                            <p>
                                {user.name} {user.surname}
                            </p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
