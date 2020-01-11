import React, { createContext, Dispatch, useEffect } from "react";
import "./App.css";
import * as Styled from "./App.Styled";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Menu from "./Composants/Interface/Header/Menu";
import { Desktop } from "./responsive";
import Accueil from "./Composants/Interface/Accueil/Accueil";
import Sujets from "./Composants/Interface/Sujets/Sujets";
import Programme from "./Composants/Interface/Programme/Programme";
import Cours from "./Composants/Interface/Cours/Cours";
import Index from "./Composants/Interface/Index/Index";
import Exercices from "./Composants/Interface/Exercices/Exercices";
import { userReducer, userInit, Action, State } from "./reducers";
import { theme } from "./Shared/Styled";
import { HelmetProvider } from "react-helmet-async";
import Axios from "./Composants/Fonctionnels/Axios";
import { useCookies } from "react-cookie";

/**
 * Reducer de gestion de connection de l'utilisateur
 */
export const userContext = createContext<[State, Dispatch<Action>]>(
    {} as [State, Dispatch<Action>]
);

const App = () => {
    const [user, userDispatch] = React.useReducer(userReducer, userInit);
    const [cookies, , removeCookie] = useCookies();

    useEffect(() => {
        if (cookies.token) {
            if (!user.connecte) {
                Axios.get("/p")
                    .then((rep) => {
                        userDispatch({ type: "UPDATE", user: rep.data });
                    })
                    .catch((err) => {
                        removeCookie("token", { domain: ".phidbac.fr" });
                        userDispatch({ type: "REMOVE" });
                    });
            }
        }
    });
    return (
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <Styled.ConteneurGlobal>
                    <userContext.Provider value={[user, userDispatch]}>
                        <Styled.ConteneurHeader>
                            <Menu />
                        </Styled.ConteneurHeader>
                        <Styled.ConteneurContenu>
                            <Switch>
                                <Redirect
                                    exact
                                    from="/Programme"
                                    to="/Presentation-du-programme-et-des-epreuves"
                                />
                                <Route exact path="/" component={Accueil} />
                                <Route
                                    path="/Annales-Bac-Sujets-Philosophie"
                                    component={Sujets}
                                />
                                <Route path="/Presentation-du-programme-et-des-epreuves">
                                    <Programme id={1} tableMatiereShow />
                                </Route>

                                <Route
                                    path="/Liste-des-cours"
                                    component={Cours}
                                />
                                <Route
                                    path="/Liste-des-index"
                                    component={Index}
                                />
                                <Route
                                    path="/Liste-des-exercices"
                                    component={Exercices}
                                />
                                <Route>
                                    <div>TEST</div>
                                </Route>
                            </Switch>
                        </Styled.ConteneurContenu>

                        <Desktop>
                            <Styled.ConteneurFooter>
                                Copyright 2019
                            </Styled.ConteneurFooter>
                        </Desktop>
                    </userContext.Provider>
                </Styled.ConteneurGlobal>
            </ThemeProvider>
        </HelmetProvider>
    );
};

export default App;
