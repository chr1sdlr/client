import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import PostPreview from "./PostPreview";
import { useQuery } from "@apollo/client";
import { GET_USER_DESCRIPTION_POSTS } from "../../gql/post";
import "./Posts.scss";

export default function Posts(props) {
    const { getUserPosts, username } = props;
    const { auth } = useAuth();

    const RenderDescription = (post) => {
        const { data } = useQuery(GET_USER_DESCRIPTION_POSTS, {
            variables: { search: post.id },
        });

        if (data) {
            const { getPostDescription } = data;
            if (getPostDescription[0] && getPostDescription[0].idPublication) {
                return getPostDescription[0].description;
            } else {
                return "";
            }
        }
    };

    return (
        <div className="posts">
            {username === auth.username ? (
                <h1>Tus publicaciones</h1>
            ) : (
                <h1>Publicaciones del usuario</h1>
            )}

            <Grid columns={4}>
                {map(getUserPosts, (post, index) => (
                    <Grid.Column key={index}>
                        <p>
                            <i className="description_post">
                                {RenderDescription(post)}
                            </i>
                        </p>
                        <PostPreview post={post} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}
