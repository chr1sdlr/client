import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import PostPreview from "./PostPreview";
import "./Posts.scss";

export default function Posts(props) {
    const { getUserPosts, username } = props;
    const { auth } = useAuth();

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
                        <PostPreview post={post} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}
