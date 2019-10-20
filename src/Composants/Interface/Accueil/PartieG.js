import React, { useState } from "react";
import styled from "styled-components";
import { contenuTexte } from "./initialState";
import { Icon } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Conteneur = styled.div`
    flex: 1;
    z-index: 2;
    display: flex;
    font-size: 16px;
    height: 100%;
    flex-direction: column;
    justify-content: center;
`;

const Phi = styled.span`
    color: orange;
    font-family: "Century Gothic";
`;

const TexteTitre = styled.div`
    width: 100%;
    font-size: 5vw;
    padding-left: 125px;
`;

const TexteContenu = styled.p`
    padding-left: 125px;
    padding-right: 125px;
`;
const TexteContenuFooter = styled.p`
    text-align: justify;
    position: relative;
    padding-left: 125px;
`;

const ConteneurCat = styled.div`
    height: 180px;
    z-index: 30;
`;

const TitreCat = styled.div`
    margin-left: 125px;
    &:hover {
        color: orange;
        cursor: pointer;
    }
`;

const PartieG = (props) => {
    const [descriptionAff, setDescriptionAff] = useState(false);
    const [descriptionAff2, setDescriptionAff2] = useState(true);
    const [numDescription, setnumDescription] = useState(0);
    return (
        <Conteneur>
            <div>
                <TexteTitre>
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>!
                </TexteTitre>
                <TexteContenu>
                    « <Phi>φ</Phi> », c’est la lettre grecque phi, <br />
                    <Phi>bac</Phi>
                    , c’est le bac. <br />
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>! c’est la philosophie du bac.
                </TexteContenu>
            </div>

            <div>
                <TexteContenu>
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>! (désormais, ce sera φ’ tout court) propose de
                    A à Z une préparation à l’épreuve de philosophie du nouveau
                    bac (juin 2021) :
                </TexteContenu>
                <ConteneurCat>
                    <TransitionGroup>
                        {!descriptionAff && (
                            <CSSTransition
                                classNames="titres"
                                unmountOnExit
                                timeout={200}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        zIndex: "100"
                                    }}
                                >
                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(0);
                                            setDescriptionAff2(false);
                                            setDescriptionAff(true);
                                        }}
                                    >
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[0].Titre}
                                    </TitreCat>

                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(1);
                                            setDescriptionAff2(false);
                                            setDescriptionAff(true);
                                        }}
                                    >
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[1].Titre}
                                    </TitreCat>
                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(2);
                                            setDescriptionAff2(false);
                                            setDescriptionAff(true);
                                        }}
                                    >
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[2].Titre}
                                    </TitreCat>
                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(3);
                                            setDescriptionAff2(false);
                                            setDescriptionAff(true);
                                        }}
                                    >
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[3].Titre}
                                    </TitreCat>
                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(4);
                                            setDescriptionAff2(false);
                                            setDescriptionAff(true);
                                        }}
                                    >
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[4].Titre}
                                    </TitreCat>
                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(5);
                                            setDescriptionAff2(false);
                                            setDescriptionAff(true);
                                        }}
                                    >
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[5].Titre}
                                    </TitreCat>
                                </div>
                            </CSSTransition>
                        )}
                        {descriptionAff && (
                            <CSSTransition
                                timeout={200}
                                unmountOnExit
                                classNames="descriptifs"
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        textAlign: "justify",
                                        zIndex: "100"
                                    }}
                                    onClick={() => {
                                        setDescriptionAff(false);
                                        setTimeout(
                                            () => setDescriptionAff2(true),
                                            200
                                        );
                                    }}
                                >
                                    <TitreCat style={{ fontWeight: "bold" }}>
                                        <Icon
                                            type="right"
                                            style={{
                                                color: "orange",
                                                transform: descriptionAff
                                                    ? "rotate(180deg)"
                                                    : "",
                                                marginRight: "10px"
                                            }}
                                        />
                                        {contenuTexte[numDescription].Titre}
                                    </TitreCat>
                                    <div
                                        style={{
                                            marginLeft: "145px",
                                            width: "calc(50% - 300px)",
                                            textAlign: "justify"
                                        }}
                                    >
                                        {
                                            contenuTexte[numDescription]
                                                .Description
                                        }
                                    </div>
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </ConteneurCat>
            </div>
            <div>
                <TexteContenuFooter>
                    La présentation du programme et des épreuves, ainsi que la
                    base de sujets de bac sont en libre consultation. En
                    revanche, vous devez vous identifier pour accéder aux autres
                    ressources : leçons, exercices, étude d’œuvres, index.
                </TexteContenuFooter>
                <TexteContenu>
                    <Phi>φ'</Phi> vous souhaite un bon travail, couronné de
                    succès !
                </TexteContenu>
            </div>
        </Conteneur>
    );
};

export default PartieG;
