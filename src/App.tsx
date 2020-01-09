import React, { createContext, Dispatch } from "react";
import "./App.css";
import * as Styled from "./App.Styled";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Menu from "./Composants/Interface/Header/Menu";
import { Desktop } from "./responsive";
import Accueil from "./Composants/Interface/Accueil/Accueil";
import Sujets from "./Composants/Interface/Sujets/Sujets";
import Programme from "./Composants/Interface/Programme/Programme";
import Cours from "./Composants/Interface/Cours/Cours";
import Index from "./Composants/Interface/Index/Index";
import { userReducer, userInit, Action, State } from "./reducers";
import { theme } from "./Shared/Styled";
import { HelmetProvider } from "react-helmet-async";

/**
 * Reducer de gestion de connection de l'utilisateur
 */
export const userContext = createContext<[State, Dispatch<Action>]>(
    {} as [State, Dispatch<Action>]
);

const App = () => {
    const [user, userDispatch] = React.useReducer(userReducer, userInit);

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
