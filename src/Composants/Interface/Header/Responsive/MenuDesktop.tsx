import * as React from "react";
import { useHistory } from "react-router-dom";
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
    const history = useHistory();

    return (
        <>
            <BoutonHome onClick={() => history.push("/")}>
                <img height="50" width="50" src={ico} alt="Bouton Home" />
            </BoutonHome>
            <ConteneurLiensPage>
                <BoutonPage
                    onClick={() =>
                        history.push(
                            "/Presentation-du-programme-et-des-epreuves"
                        )
                    }
                >
                    Programmes / Epreuves
                </BoutonPage>
                <BoutonPage
                    onClick={() =>
                        history.push("/Annales-Bac-Sujets-Philosophie")
                    }
                >
                    Sujets
                </BoutonPage>
                <BoutonPage onClick={() => history.push("/Liste-des-cours")}>
                    Cours
                </BoutonPage>

                <BoutonPage
                    onClick={() => history.push("/Liste-des-exercices")}
                >
                    Exercices
                </BoutonPage>
                <BoutonPage onClick={() => history.push("/Liste-des-index")}>
                    Index
                </BoutonPage>
                <BoutonPage>
                    <Connexion />
                </BoutonPage>
            </ConteneurLiensPage>
        </>
    );
};
export default Desktop;
