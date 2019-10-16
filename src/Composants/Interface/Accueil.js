import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../Assets/LOG.svg";
import { Icon } from "antd";
import "./Accueil.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { transform } from "@babel/core";

//SECTION STYLED-COMPONENTS

const PartieG = styled.div`
    flex: 1;
    z-index: 2;
    display: flex;
    font-size: 16px;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
`;

const PartieD = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 2;
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
    height: 150px;
    z-index: 30;
`;

const TitreCat = styled.div`
    margin-left: 125px;
    &:hover {
        color: orange;
        cursor: pointer;
    }
`;

//!SECTION

const contenuTexte = [
    {
        Titre: "Présentation du programme et des épreuves",
        Description:
            "Les textes officiels définissent précisément ce qui est attendu des candidats. Ils fournissent des renseignements particulièrement utiles à une préparation efficace."
    },
    {
        Titre: "Des leçons progressives",
        Description:
            "φ’ propose un ensemble de leçons traitant le programme à partir de problèmes, comme le ferait un professeur sur l’ensemble de l’année. Des tests réguliers permettent de vérifier que l’on a bien assimilé le contenu de la leçon."
    },
    {
        Titre: "Des exercices pas à pas",
        Description:
            "Les exercices proposés au bac : la dissertation et l’explication de texte, ne sont pas aussi difficiles qu’on le croit parfois. Mais ils supposent que l’on comprenne bien ce qui est demandé, et pas mal d’entraînement. φ’ devrait vous faciliter la tâche."
    },
    {
        Titre: "L’étude suivie d’œuvres",
        Description:
            "φ’ propose l’étude suivie de trois œuvres philosophiques. En liaison avec les leçons, cela devrait vous permettre d’acquérir une culture philosophique initiale, et par la même occasion de vous préparer à un éventuel oral…"
    },
    {
        Titre: "Des index",
        Description:
            "Notions, repères, concepts, auteurs, œuvres… il y a de quoi se perdre. Les index permettent de retrouver sans perte de temps les moments du cours qui en parlent."
    },
    {
        Titre: "1142 sujets de bac en libre consultation !",
        Description:
            "φ’ propose une base de données comportant la quasi-totalité des sujets de baccalauréat donnés depuis… 1996, soit environ 1200 sujets complets, autant de textes, et près de 2400 sujets de dissertation."
    }
];

const Accueil = () => {
    const [descriptionAff, setDescriptionAff] = useState(false);
    const [descriptionAff2, setDescriptionAff2] = useState(true);
    const [numDescription, setnumDescription] = useState(0);
    return (
        <>
            <PartieG>
                <div>
                    <TexteTitre>
                        <span
                            style={{
                                color: "orange",
                                fontFamily: "Century Gothic"
                            }}
                        >
                            φ
                        </span>
                        d<span style={{ color: "orange" }}>'</span>
                        bac
                        <span style={{ color: "orange" }}>'</span>!
                    </TexteTitre>
                    <TexteContenu>
                        « <span style={{ color: "orange" }}>φ</span> », c’est la
                        lettre grecque phi, <br />
                        <span style={{ color: "orange" }}>bac</span>
                        , c’est le bac. <br />
                        <span
                            style={{
                                color: "orange"
                            }}
                        >
                            φ
                        </span>
                        d<span style={{ color: "orange" }}>'</span>
                        bac
                        <span style={{ color: "orange" }}>'</span>! c’est la
                        philosophie du bac.
                    </TexteContenu>
                </div>

                <div>
                    <TexteContenu>
                        <span
                            style={{
                                color: "orange"
                            }}
                        >
                            φ
                        </span>
                        d<span style={{ color: "orange" }}>'</span>
                        bac
                        <span style={{ color: "orange" }}>'</span>! (désormais,
                        ce sera φ’ tout court) propose de A à Z une préparation
                        à l’épreuve de philosophie du nouveau bac (juin 2021) :
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
                                        <TitreCat
                                            style={{ fontWeight: "bold" }}
                                        >
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
                        La présentation du programme et des épreuves, ainsi que
                        la base de sujets de bac sont en libre consultation. En
                        revanche, vous devez vous identifier pour accéder aux
                        autres ressources : leçons, exercices, étude d’œuvres,
                        index.
                    </TexteContenuFooter>
                    <TexteContenu>
                        <span
                            style={{
                                color: "orange"
                            }}
                        >
                            φ'
                        </span>{" "}
                        vous souhaite un bon travail, couronné de succès !
                    </TexteContenu>
                </div>
            </PartieG>
            <PartieD>
                <Logo height="85%" width="85%" />
            </PartieD>
        </>
    );
};

export default Accueil;
