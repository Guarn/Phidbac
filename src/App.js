import React, { useState, Suspense } from "react";
import "./App.css";
import styled from "styled-components";
import ico from "./Assets/ICONE-PHI.jpg";
import Connexion from "./Connexion";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

const Accueil = React.lazy(() =>
    import("./Composants/Interface/Accueil/Accueil")
);
const Sujets = React.lazy(() => import("./Composants/Interface/Sujets"));

//SECTION STYLED-COMPONENTS

const ConteneurGlobal = styled.div`
    height: 100%;
    width: 100%;
    color: #5e5e5e;
    display: flex;
    flex-direction: column;
    font-family: century-gothic, sans-serif;
    font-display: optional;
`;

const ConteneurHeader = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 2;
`;

const ConteneurLiensPage = styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    align-content: center;
    user-select: none;
    font-weight: bold;
    cursor: pointer;
`;

const BoutonHome = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const BoutonPage = styled.div`
    margin-right: 60px;
    font-size: 16px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    &:hover {
        color: orange;
    }
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

const Cercle = styled.div`
    position: absolute;
    top: ${(props) => props.animate.Top};
    left: ${(props) => props.animate.Left};
    width: 100%;
    height: 200%;
    background-color: #e9e7e1;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50% /50%;
    z-index: 1;
`;

const coordsCercle = [
    { Top: "-10%", Left: "-40%" },
    {
        Top: "-60%",
        Left: "50%"
    }
];

//!SECTION

const App = (props) => {
    const [redActive, setRedActive] = useState(false);
    const [page, setPage] = useState("");

    let changementPage = (UrlPage) => {
        setPage(UrlPage);
        setRedActive(true);
    };

    let location = useLocation();

    return (
        <ConteneurGlobal>
            {location.pathname === "/" && <Cercle animate={coordsCercle[0]} />}
            {location.pathname === "/Sujets" && (
                <Cercle animate={coordsCercle[1]} />
            )}
            {redActive && <Redirect push to={page} />}

            <ConteneurHeader>
                <BoutonHome onClick={() => changementPage("/")}>
                    <img height="50" width="50" src={ico} alt="Bouton Home" />
                </BoutonHome>
                <ConteneurLiensPage>
                    <BoutonPage style={{ color: "rgba(0,0,0,0.3" }}>
                        Programmes / Epreuves
                    </BoutonPage>
                    <BoutonPage onClick={() => changementPage("/Sujets")}>
                        Sujets
                    </BoutonPage>
                    <BoutonPage style={{ color: "rgba(0,0,0,0.3" }}>
                        Cours
                    </BoutonPage>
                    <BoutonPage style={{ color: "rgba(0,0,0,0.3" }}>
                        Exercices
                    </BoutonPage>
                    <BoutonPage>
                        <Connexion />
                    </BoutonPage>
                </ConteneurLiensPage>
            </ConteneurHeader>
            <Switch>
                <ConteneurContenu>
                    <Suspense fallback={<div>Chargement...</div>}>
                        <Route exact path="/" component={Accueil} />
                        <Route path="/Sujets" component={Sujets} />
                    </Suspense>
                </ConteneurContenu>
            </Switch>

            <ConteneurFooter>Copyright 2019</ConteneurFooter>
        </ConteneurGlobal>
    );
};

export default App;
