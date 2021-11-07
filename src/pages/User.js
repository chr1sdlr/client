import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Profile from "../components/User/Profile";
import Posts from "../components/Posts";
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS } from "../gql/post";
import { size } from "lodash";

export default function User() {
    const { username } = useParams();
    const { data, loading, startPolling, stopPolling } = useQuery(
        GET_USER_POSTS,
        {
            variables: {
                username,
            },
        }
    );

    useEffect(() => {
        startPolling(1000);
        return () => {
            startPolling();
        };
    }, [startPolling, stopPolling]);

    if (loading) {
        return null;
    }

    const { getUserPosts } = data;

    return (
        <>
            <Profile username={username} allPublications={size(getUserPosts)} />
            <Posts getUserPosts={getUserPosts} />
        </>
    );
}
