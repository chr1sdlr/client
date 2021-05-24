import React from 'react';
import "./UserNotFound.scss";
import { Link } from "react-router-dom"

export default function UserNotFound() {
    return (
        <div className="user-not-found">
            <p>Ups...! No se hemos encontrado ese usuario <i class="frown outline icon"></i></p>
            <p>
                Es posible que el enlace este roto o que tu amigo haya eliminado su cuenta.
            </p>
            <Link to="/">Regresa a home <i class="angellist icon"></i></Link>
        </div>
    )
}
