import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import "./ModalPost.scss";
import PostComments from "./PostComments";
import CommentForm from "./CommentForm";

export default function ModalPost(props) {
    const { show, setShow, post } = props;

    const onClose = () => {
        setShow(false);
    };

    return (
        <Modal className="modal-post" open={show} onClose={onClose}>
            <Grid>
                <Grid.Column
                    className="modal-post__left"
                    width={10}
                    style={{ backgroundImage: `url("${post.file}")` }}
                />
                <Grid.Column className="modal-post__right" width={6}>
                    <PostComments post={post} />
                    <div>Acciones</div>
                    <CommentForm post={post} />
                </Grid.Column>
            </Grid>
        </Modal>
    );
}
