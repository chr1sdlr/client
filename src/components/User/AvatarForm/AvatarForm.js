import React, { useCallback, useState } from 'react';
import "./AvatarForm.scss";
import { toast } from "react-toastify"
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";

export default function AvatarForm(props) {

    const { setShowModal, auth } = props;
    const [loading, setLoading] = useState(false);

    const [ updateAvatar ] = useMutation(UPDATE_AVATAR, {
        update(cache, { data: { updateAvatar } }) { // Actualiza la foto desde el cache del server de Apollo
            const { getUser } = cache.readQuery({ // Obtiene los datos almacenados en la cache del server
                query: GET_USER,
                variables: {
                    username: auth.username
                },
            });

            cache.writeQuery({ // Función para reescribir la query a actualizar
                query: GET_USER,
                variables: {
                    username: auth.username
                },
                data: { // Datos que se van a actualizar
                    getUser: {
                        ...getUser,
                        avatar: updateAvatar.urlAvatar
                    },
                }, 
            });
        },
    });

    const [ deleteAvatar ] = useMutation(DELETE_AVATAR, {
        update(cache) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                },
            });

            cache.writeQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                },
                data: {
                    getUser: { ...getUser, avatar: "" },
                }
            });
        }
    });

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];

        try {
            setLoading(true);
            const result = await updateAvatar({ variables: { file }});
            const { data } = result;

            if(!data.updateAvatar.status) {
                toast.error("Tu imagen no ha podido ser actualizada :C");
                setLoading(false);
            } else {
                toast.success("Haz actualizado tu imagen :)");
                setLoading(false);
                setShowModal(false);
            }
            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
    }, []);

    // El useDropZone acepta parámetros de configuración acerca del tipo de archivo que se puede subir
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    const onDeleteAvatar = async () => {
        
        try {
            const result = await deleteAvatar();
            const { data } = result;

            if(!data.deleteAvatar) {
                toast.warning("Error: No hemos podido eliminar tu avatar D:");
            } else {
                toast.success("Bye bye, avatar eliminado");
                setShowModal(false);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="avatar-form">
            <Button {...getRootProps()} loading={loading}>
                Sube tu foto <i className="file image icon"></i>
            </Button>
            <Button onClick={() => onDeleteAvatar()}>
                Elimina tu foto actual <i className="trash alternate icon"></i>
            </Button>
            <Button onClick={() => setShowModal(false)} >
                No hacer nada <i className="american sign language interpreting icon"></i>
            </Button>
            <input {...getInputProps()} />
        </div>
    )
}
