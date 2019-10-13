import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../Assets/LOG.svg";
import { ReactComponent as Roulette } from "../../Assets/Roulette.svg";

//SECTION STYLED-COMPONENTS

const PartieG = styled.div`
    flex: 1;
    z-index: 2;
    display: flex;
    font-size: 16px;
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

const ConteneurRoulette = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
    position: relative;
    margin-top: -30px;
    margin-bottom: -30px;
    left: -100px;

    .cls-1 {
        fill: #e2e0d8;
        transform-origin: 50%;
        transition: all 1s ease-in-out;

        transform: ${(props) => `rotate(${props.rotation}deg)`};
    }

    .cls-2 {
        transform-origin: 227.624px 123.972px;
        transition: all 0.3s ease-in-out;
        transform: ${(props) => (props.enRotation ? "scale(0.5)" : "scale(1)")};
        stroke: ${(props) => (props.enRotation ? "#c5c5c5" : "orange")};
    }
    .cls-3 {
        fill: #e2e0d8;
        stroke: #c5c5c5;
    }
`;

const DivRoulette = styled.div`
    flex: 1;
    border-left: 2px solid rgba(0, 0, 0, 0.2);
    padding-left: 5px;
    margin-left: 52px;
    animation: ${(props) => (props.rotation ? "fondu 1s ease-in-out" : null)};
    @keyframes fondu {
        0% {
            opacity: 1;
        }
        45% {
            opacity: 0;
        }
        55% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const RouletteTitre = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
`;
const RouletteDescription = styled.div`
    text-align: justify;
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
            "φ’ propose un ensemble de leçon traitant l’ensemble du programme à partir de problèmes, comme le ferait un professeur sur l’ensemble de l’année. Des tests réguliers permettent de vérifier que l’on a bien assimilé le contenu de la leçon."
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
    const [fctInterval, setFctInterval] = useState(true);
    const [stateRoulette, setStateRoulette] = useState(0);
    const [enRotation, setEnRotation] = useState(false);
    const [indexDescription, setIndexDescription] = useState(0);
    const UseRoulette = (event) => {
        if (!enRotation) {
            setEnRotation(true);
            if (event > 0) {
                setStateRoulette((a) => a + 30);

                setTimeout(() => {
                    setIndexDescription((c) =>
                        c === contenuTexte.length - 1 ? 0 : c + 1
                    );
                }, 500);
            }

            if (event < 0) {
                setStateRoulette((a) => a - 30);
                if (indexDescription === 0) {
                    setTimeout(() => {
                        setIndexDescription(contenuTexte.length - 1);
                    }, 500);
                } else {
                    setTimeout(() => {
                        setIndexDescription((b) => b - 1);
                    }, 500);
                }
            }
            setTimeout(() => {
                setEnRotation(false);
            }, 700);
        }
    };
    useEffect(() => {
        console.log("USE");
        if (fctInterval) {
            let interval = setInterval(() => {
                UseRoulette(100);
            }, 4000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [fctInterval]);

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
                    <ConteneurRoulette
                        enRotation={enRotation}
                        rotation={stateRoulette}
                        onWheel={(e) => UseRoulette(e.nativeEvent.deltaY)}
                        onClick={() => {
                            setFctInterval(!fctInterval);
                        }}
                    >
                        <Roulette alt="" height="200" width="200" />
                        <DivRoulette rotation={enRotation}>
                            <RouletteTitre>
                                {contenuTexte[indexDescription].Titre}
                            </RouletteTitre>
                            <RouletteDescription>
                                {contenuTexte[indexDescription].Description}
                            </RouletteDescription>
                        </DivRoulette>
                    </ConteneurRoulette>
                    <TexteContenuFooter>
                        La présentation du programme et des épreuves, ainsi que
                        la base de sujets de bac sont en libre consultation. En
                        revanche, vous devez vous identifier pour accéder aux
                        autres ressources : leçons, exercices, étude d’œuvres,
                        index.
                    </TexteContenuFooter>
                </div>
                <div>
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
