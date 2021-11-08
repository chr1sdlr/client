import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { POST } from "../../../gql/post";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "./ModalPost.scss";

export default function ModalPost(props) {
    const { show, setShow } = props;
    const [fileUpload, setFileUpload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [post] = useMutation(POST);

    // eslint-disable-next-line
    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: "image",
            file,
            preview: URL.createObjectURL(file),
        });
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    const onClose = () => {
        setIsLoading(false);
        setFileUpload(null);
        setShow(false);
    };

    const onPublish = async () => {
        try {
            setIsLoading(true);
            const res = await post({
                variables: {
                    file: fileUpload.file,
                },
            });

            const { data } = res;

            if (!data.post.status) {
                toast.warning("Error publicando tu foto :c");
                isLoading(false);
            } else {
                toast.success("Se ha publicado tu foto ;)");
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            size="small"
            open={show}
            onClose={onClose}
            className="modal-post"
        >
            <div
                {...getRootProps()}
                className="dropzone"
                style={fileUpload && { border: 0 }}
            >
                {!fileUpload && (
                    <>
                        <Icon name="upload" />
                        <p>
                            Coloca aqui tu foto. Puedes arrastar la publicación.
                        </p>
                    </>
                )}

                <input {...getInputProps()} />
            </div>
            {fileUpload?.type === "image" && (
                <div
                    className="image"
                    style={{ backgroundImage: `url("${fileUpload.preview}")` }}
                />
            )}
            {fileUpload && (
                <Button className="btn-upload btn-publish" onClick={onPublish}>
                    Publicar
                </Button>
            )}
            {isLoading && (
                <Dimmer className="posting" active>
                    <Loader />
                    <p>Publicando tu imagen</p>
                </Dimmer>
            )}
        </Modal>
    );
}
