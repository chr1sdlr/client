import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash" // lodash es una librería externa de js con diferentes funciones.

export default function Navigation() {
    return(
        <Router>
            <Switch> {/* Se llama a "map" (que es un bucle) y se le pasa la conf de "routes" (la cual va a estar renderizando su contenido) */}
                {map(routes, (route, index) => (
                    <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props) => (
                        <route.layout>
                            <route.component {... props} />
                        </route.layout>
                    )}
                    />
                ))} 
            </Switch>
        </Router>
    );
}