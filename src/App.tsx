import React, { useContext, createContext, Dispatch } from "react";
import "./App.css";
import * as Styled from "./App.Styled";
import { Switch, Route } from "react-router-dom";
import Menu from "./Composants/Interface/Header/Menu";
import { Desktop } from "./responsive";
import Accueil from "./Composants/Interface/Accueil/Accueil";
import Sujets from "./Composants/Interface/Sujets/Sujets";
import Programme from "./Composants/Interface/Programme/Programme";
import Cours from "./Composants/Interface/Cours/Cours";
import Index from "./Composants/Interface/Index/Index";
import { userReducer, userInit, Action, State } from "./reducers";

export const userContext = createContext<[State, Dispatch<Action>]>(
    {} as [State, Dispatch<Action>]
);

const App = () => {
    const [user, userDispatch] = React.useReducer(userReducer, userInit);

    return (
        <Styled.ConteneurGlobal>
            <userContext.Provider value={[user, userDispatch]}>
                <Styled.ConteneurHeader>
                    <Menu />
                </Styled.ConteneurHeader>
                <Styled.ConteneurContenu>
                    <Switch>
                        <Route exact path="/" component={Accueil} />
                        <Route path="/Sujets" component={Sujets} />
                        <Route path="/Programme">
                            <Programme id={1} />
                        </Route>
                        <Route path="/Cours" component={Cours} />
                        <Route path="/Index" component={Index} />
                    </Switch>
                </Styled.ConteneurContenu>

                <Desktop>
                    <Styled.ConteneurFooter>
                        Copyright 2019
                    </Styled.ConteneurFooter>
                </Desktop>
            </userContext.Provider>
        </Styled.ConteneurGlobal>
    );
};

export default App;
