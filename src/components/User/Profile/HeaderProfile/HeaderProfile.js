import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderProfile.scss";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOWER, FOLLOWER, UN_FOLLOW } from "../../../../gql/follower";

export default function HeaderProfile(props) {
    const { getUser, auth, handlerModal } = props;
    const [follower] = useMutation(FOLLOWER);
    const [unFollow] = useMutation(UN_FOLLOW);
    const { data, loading, refetch } = useQuery(IS_FOLLOWER, {
        variables: {
            username: getUser.username,
        },
    });

    const buttonFollow = () => {
        if (data.isFollower) {
            return (
                <Button className="btn-danger" onClick={onUnFollow}>
                    Dejar de seguir
                </Button>
            );
        } else {
            return (
                <Button className="btn-action" onClick={onFollow}>
                    Seguir
                </Button>
            );
        }
    };

    const onFollow = async () => {
        try {
            await follower({
                variables: {
                    username: getUser.username,
                },
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const onUnFollow = async () => {
        try {
            await unFollow({
                variables: {
                    username: getUser.username,
                },
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="header-profile">
            <h2>{getUser.username}</h2>
            {getUser.username === auth.username ? (
                <Button onClick={() => handlerModal("settings")}>
                    Ajustes
                </Button>
            ) : (
                !loading && buttonFollow()
            )}
        </div>
    );
}
