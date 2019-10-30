import * as React from "react";
import { Redirect } from "react-router-dom";
import ico from "../../../../Assets/ICONE-PHI.jpg";
import styled from "styled-components";
import Connexion from "../Connexion";

const ConteneurLiensPage = styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    align-content: center;
    user-select: none;
    font-weight: bold;
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

const BoutonHome = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 100;
    position: relative;
`;

const Desktop = () => {
    const [redActive, setRedActive] = React.useState(false);
    const [page, setPage] = React.useState("");

    let changementPage = (UrlPage: string) => {
        setPage(UrlPage);
        setRedActive(true);
    };
    return (
        <>
            {redActive && <Redirect push to={page} />}
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
        </>
    );
};
export default Desktop;
