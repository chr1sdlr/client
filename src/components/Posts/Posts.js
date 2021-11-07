import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import PostPreview from "./PostPreview";
import "./Posts.scss";

export default function Posts(props) {
    const { getUserPosts } = props;

    return (
        <div className="posts">
            <h1>Publicaciones del usuario</h1>
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
