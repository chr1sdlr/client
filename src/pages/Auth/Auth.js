import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import workbook from "../../assets/png/WorkBook.png";

import "./Auth.scss";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container fluid className="auth">
            <Image src={workbook} className="workbook-img" />

            <div className="container-form">
                {showLogin ? (
                    <LoginForm />
                ) : (
                    <RegisterForm setShowLogin={setShowLogin} />
                )}
            </div>

            <div className="change-form">
                <p>
                    {showLogin ? (
                        <>
                            ¿Aún no tienes una cuenta?
                            <span onClick={() => setShowLogin(!showLogin)}>
                                ¡A crear una!
                            </span>
                        </>
                    ) : (
                        <>
                            ¡Ingresa a tu cuenta!
                            <span onClick={() => setShowLogin(!showLogin)}>
                                Vamos
                            </span>
                        </>
                    )}
                </p>
            </div>
        </Container>
    );
}
