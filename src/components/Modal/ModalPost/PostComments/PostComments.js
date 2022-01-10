import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import ImageNotFound from "../../../../assets/png/avatar.png";
import { useQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "../../../../gql/comment";
import "./PostComments.scss";

export default function PostComments(props) {
    const { post } = props;

    const { data, loading } = useQuery(GET_POST_COMMENTS, {
        variables: {
            idPublication: post.id,
        },
    });

    if (loading) {
        return null;
    }

    const { getPostComments } = data;
    console.log(getPostComments);

    return (
        <div className="post-comments">
            {map(getPostComments, (comment, index) => (
                <Link
                    key={index}
                    to={`/${comment.idUser.username}`}
                    className="comments"
                >
                    <Image
                        src={comment.idUser.avatar || ImageNotFound}
                        avatar
                    />
                    <div>
                        <p>{comment.idUser.username}</p>
                        <p>{comment.userComment}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
