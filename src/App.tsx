import React, { Suspense } from "react";
import "./App.css";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Menu from "./Composants/Interface/Header/Menu";
import { Desktop } from "./responsive";
import Accueil from "./Composants/Interface/Accueil/Accueil";
import Sujets from "./Composants/Interface/Sujets/Sujets";
import Programme from "./Composants/Interface/Programme/Programme";
import Cours from "./Composants/Interface/Cours/Cours";
import Index from "./Composants/Interface/Index/Index"; /*
const Accueil = React.lazy(() =>
    import("./Composants/Interface/Accueil/Accueil")
);
const Sujets = React.lazy(() => import("./Composants/Interface/Sujets/Sujets"));
const Programme = React.lazy(() =>
    import("./Composants/Interface/Programme/Programme")
);
const Cours = React.lazy(() => import("./Composants/Interface/Cours/Cours"));
const Index = React.lazy(() => import("./Composants/Interface/Index/Index"));
*/
//SECTION STYLED-COMPONENTS

const ConteneurGlobal = styled.div`
    height: 100%;
    width: 100%;
    color: #5e5e5e;
    display: flex;
    flex-direction: column;
    font-family: century-gothic, sans-serif;
    font-display: optional;
    overflow: hidden;
`;

const ConteneurHeader = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 100;
`;

const ConteneurContenu = styled.div`
    width: 100%;
    height: calc(100vh - 160px);
    display: flex;
`;

const ConteneurFooter = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
    z-index: 2;
`;

export interface animateProps {
    animate: {
        Top: string;
        Left: string;
    };
}

//!SECTION

const App = () => {
    return (
        <ConteneurGlobal>
            <ConteneurHeader>
                <Menu />
            </ConteneurHeader>
            <ConteneurContenu>
                <Switch>
                    <Route exact path="/" component={Accueil} />
                    <Route path="/Sujets" component={Sujets} />
                    <Route path="/Programme" component={Programme} />
                    <Route path="/Cours" component={Cours} />
                    <Route path="/Index" component={Index} />
                </Switch>
            </ConteneurContenu>

            <Desktop>
                <ConteneurFooter>Copyright 2019</ConteneurFooter>
            </Desktop>
        </ConteneurGlobal>
    );
};

export default App;
