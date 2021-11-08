import React, { useState } from "react";
import "./PostPreview.scss";
import ModalPost from "../../Modal/ModalPost";
import { Image } from "semantic-ui-react";

export default function PostPreview(props) {
    const { post } = props;
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="post-preview" onClick={() => setShowModal(true)}>
                <Image className="post-preview__image" src={post.file} />
            </div>

            <ModalPost show={showModal} setShow={setShowModal} post={post} />
        </>
    );
}
