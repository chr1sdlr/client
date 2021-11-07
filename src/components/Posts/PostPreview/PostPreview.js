import React from "react";
import "./PostPreview.scss";
import { Image } from "semantic-ui-react";

export default function PostPreview(props) {
    const { post } = props;

    return (
        <>
            <div className="post-preview">
                <Image className="post-preview__image" src={post.file} />
            </div>
        </>
    );
}
