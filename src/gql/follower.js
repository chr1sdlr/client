import { gql } from "@apollo/client";

export const IS_FOLLOWER = gql`
    query isFollower($username: String!) {
        isFollower(username: $username)
    }
`;

export const FOLLOWER = gql`
    mutation follower($username: String!) {
        follower(username: $username)
    }
`;

export const UN_FOLLOW = gql`
    mutation unFollow($username: String!) {
        unFollow(username: $username)
    }
`;

export const GET_FOLLOWERS = gql`
    query getFollowers($username: String!) {
        getFollowers(username: $username) {
            username
            name
            surname
            avatar
        }
    }
`;
