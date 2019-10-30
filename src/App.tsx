import React, { Suspense } from "react";
import "./App.css";
import styled from "styled-components";
import { Switch, Route, useLocation } from "react-router-dom";
import Menu from "./Composants/Interface/Header/Menu";
import { Desktop, Tablet } from "./responsive";
const Accueil = React.lazy(() =>
    import("./Composants/Interface/Accueil/Accueil")
);
const Sujets = React.lazy(() => import("./Composants/Interface/Sujets/Sujets"));

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
    height: 100%;
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
    let location = useLocation();

    return (
        <ConteneurGlobal>
            <ConteneurHeader>
                <Menu />
            </ConteneurHeader>
            <Switch>
                <ConteneurContenu>
                    <Suspense fallback={<div></div>}>
                        <Route exact path="/" component={Accueil} />
                        <Route path="/Sujets" component={Sujets} />
                    </Suspense>
                </ConteneurContenu>
            </Switch>

            <Desktop>
                <ConteneurFooter>Copyright 2019</ConteneurFooter>
            </Desktop>
        </ConteneurGlobal>
    );
};

export default App;
