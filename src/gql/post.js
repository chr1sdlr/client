import { gql } from "@apollo/client";

export const POST = gql`
    mutation post($file: Upload) {
        post(file: $file) {
            status
            urlFile
        }
    }
`;

export const GET_USER_DESCRIPTION_POSTS = gql`
    query getPostDescription($search: String!) {
        getPostDescription(search: $search) {
            description
            idPublication
        }
    }
`;

export const GET_USER_POSTS = gql`
    query getUserPosts($username: String!) {
        getUserPosts(username: $username) {
            id
            idUser
            file
            fileType
        }
    }
`;
