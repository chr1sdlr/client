import { gql } from "@apollo/client";

export const ADD_USER_COMMENT = gql`
    mutation addUserComment($input: CommentUserInput) {
        addUserComment(input: $input) {
            idPublication
            userComment
        }
    }
`;

export const GET_POST_COMMENTS = gql`
    query getPostComments($idPublication: ID!) {
        getPostComments(idPublication: $idPublication) {
            userComment
            idUser {
                username
                avatar
            }
        }
    }
`;
