import * as React from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Icon } from "antd";
import { contenuTexte } from "../initialState";

const Phi = styled.span`
    color: orange;
    font-family: "Century Gothic";
    z-index: 1000;
    position: relative;
`;

const TexteTitre = styled.div`
    width: 100%;
    font-size: 5vw;
    z-index: 100;
    position: relative;
`;

const TexteContenu = styled.div`
    text-align: justify;
    z-index: 100;
    position: relative;
`;
const TexteContenuFooter = styled.div`
    text-align: justify;
    position: relative;
    z-index: 100;
`;

const ConteneurCat = styled.div`
    height: 160px;
    z-index: 100;
    position: relative;
`;

const TitreCat = styled.div`
    &:hover {
        color: orange;
        cursor: pointer;
    }
    z-index: 100;
    position: relative;
`;

const SousConteneurCat = styled.div`
    position: absolute;
    z-index: 100;
`;

const SousConteneurDescription = styled.div`
    position: absolute;
    text-align: justify;
    z-index: 100;
`;

const DescriptionCat = styled.div`
    position: absolute;
    width: 400px;
    text-align: justify;
    z-index: 100;
`;

const PartieGDesktop = () => {
    const [descriptionAff, setDescriptionAff] = React.useState(false);
    const [numDescription, setnumDescription] = React.useState(0);
    return (
        <div
            style={{
                display: "flex",
                marginLeft: "5vw",
                flexDirection: "column",
                width: "40vw"
            }}
        >
            <TexteTitre>
                <Phi>φ</Phi>d<Phi>'</Phi>
                bac
                <Phi>'</Phi>!
            </TexteTitre>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        width: "2px",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        marginRight: "10px",
                        zIndex: 100,
                        position: "relative"
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <TexteContenu>
                        « <Phi>φ</Phi> », c’est la lettre grecque phi, <br />
                        <Phi>bac</Phi>
                        , c’est le bac. <br />
                        <Phi>φ</Phi>d<Phi>'</Phi>
                        bac
                        <Phi>'</Phi>! c’est la philosophie du bac.
                    </TexteContenu>
                </div>
            </div>
            <div style={{ marginTop: "60px" }}>
                <TexteContenu style={{ marginBottom: "20px" }}>
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>! (désormais, ce sera φ’ tout court) propose de
                    A à Z une préparation à l’épreuve de philosophie du nouveau
                    bac (juin 2021) :
                </TexteContenu>

                <ConteneurCat>
                    <TransitionGroup component={null}>
                        {!descriptionAff && (
                            <CSSTransition
                                classNames="titres"
                                unmountOnExit
                                timeout={200}
                            >
                                <SousConteneurCat>
                                    <TitreCat
                                        onClick={() => {
                                            setnumDescription(0);
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
                                </SousConteneurCat>
                            </CSSTransition>
                        )}
                        {descriptionAff && (
                            <CSSTransition
                                timeout={200}
                                unmountOnExit
                                classNames="descriptifs"
                            >
                                <SousConteneurDescription
                                    onClick={() => {
                                        setDescriptionAff(false);
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
                                    <DescriptionCat>
                                        {
                                            contenuTexte[numDescription]
                                                .Description
                                        }
                                    </DescriptionCat>
                                </SousConteneurDescription>
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
                <TexteContenu style={{ marginTop: "20px" }}>
                    <Phi>φ'</Phi> vous souhaite un bon travail, couronné de
                    succès !
                </TexteContenu>
            </div>
        </div>
    );
};
export default PartieGDesktop;
