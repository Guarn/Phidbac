import React, { useState, useContext } from "react";
import * as Styled from "./Programme.styled";
import Axios from "../../Fonctionnels/Axios";
import Slate from "../../Fonctionnels/Slate";
import { useLocation } from "react-router";
import { animateScroll, Element } from "react-scroll";
import TableMatiere from "./TableMatiere";
import { Transition } from "react-transition-group";
import "./Programme.css";
import { userContext } from "../../../App";
import { useCookies } from "react-cookie";

export interface ProgrammeI {
    id: number;
    paragraphe?: number;
    tableMatiereShow?: boolean;
}

export interface ContenuCoursI {
    value: any[];
    type: string;
    TableMatiere?: {
        actif: boolean;
        value: string;
        titre: boolean;
        position: number;
    };
    options?: {
        marginTop: number;
        marginBottom: number;
        marginLeft: number;
        marginRight: number;
        backgroundColor: string;
        paddingTop: number;
        paddingLeft: number;
        paddingRight: number;
        paddingBottom: number;
    };
    imageOptions?: {
        align: "left" | "right" | "center";
        height: number;
        width: number;
        legende: string;
        ratioActif: boolean;
        ratio: number;
        lienActif: boolean;
        lienType: string;
        src: string;
    };
    image?: boolean;
}

export interface CoursI {
    Contenu: ContenuCoursI[];
    Titre: string;
    Description: string;
    type: "Cours" | "Exercice" | "PageUnique";
}

const duration = 200;
const defaultStyle = {
    transition: `all ${duration}ms `,
    opacity: 0
};
const transitionStyles: any = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};

/**
 * Affichage d'un cours, soit sur la page programme/épreuves, soit dans la page cours,
 * soit dans  un lien/tooltip, auquel cas le numéro de paragraphe vers lequel scroll est requis.
 * C'est le paramètre @paragraphe qui permet de définir si le cours sera affiché dans un tooltip
 * ou normalement.
 * @param id Int | Id du cours à afficher
 * @param paragraphe Int | (optionnel) Numéro de paragraphe vers lequel scroll au chargement.
 * @param tableMatiereShow Boolean | (optionnel) Affichage de la table des matieres
 */

const Programme: React.FC<ProgrammeI> = ({
    id,
    paragraphe,
    tableMatiereShow
}) => {
    const [user] = useContext(userContext);
    const [cours, setCours] = useState<CoursI>({
        Contenu: [],
        Titre: "",
        Description: "",
        type: "Cours"
    });
    const [cookies] = useCookies();

    const [indexLu, setIndexLu] = React.useState(0);

    const location = useLocation();
    let loc = React.useMemo(() => location.hash.replace("#", ""), [
        location.hash
    ]);

    React.useEffect(() => {
        // Fetch du cours si pas téléchargé
        if (cours.Titre === "") {
            Axios.get(`/Cours/${id}`).then((rep) => {
                setCours({
                    Titre: rep.data.Titre,
                    Description: rep.data.Description,
                    Contenu: JSON.parse(rep.data.Contenu),
                    type: rep.data.type
                });
            });
        } else {
            let el1: HTMLElement | null = document.getElementById("element-0");

            let el2: HTMLElement | null = document.getElementById(
                `element-${loc}`
            );
            let el3: HTMLElement | null = document.getElementById(
                `element1-${paragraphe}`
            );
            // Scroll automatique si hash url externe avec #Num_Paragraphe
            if (loc !== "") {
                let elBase: number | null = el1
                    ? el1.getBoundingClientRect().top
                    : null;
                let elLien: number | null = el2
                    ? el2.getBoundingClientRect().top
                    : null;
                if (elBase && elLien)
                    animateScroll.scrollTo(elLien - elBase, {
                        containerId: "ScrollConteneur"
                    });
            }
            // Scroll automatique si cours appelé dans un Tooltip
            if (paragraphe) {
                if (el3) {
                    el3.scrollIntoView();
                }
            }
        }
    });
    return (
        <Styled.Conteneur
            decalage={
                location.pathname.substring(0, 6) === "/Cours" &&
                !!tableMatiereShow
            }
        >
            <Transition
                appear
                enter
                mountOnEnter
                unmountOnExit
                in={true}
                timeout={{ appear: 200, enter: 200, exit: 200 }}
            >
                {(state2) => (
                    <Styled.ConteneurGlobal
                        id={paragraphe ? "ScrollConteneur1" : "ScrollConteneur"}
                        className="element"
                        width={847}
                        onScroll={(e: any) => {
                            let elementIndexLu = document.getElementById(
                                `element-${indexLu}`
                            );
                            let elementConteneurScroll = document.getElementById(
                                `ScrollConteneur`
                            );

                            if (
                                id !== 1 &&
                                cookies.token &&
                                user.connecte &&
                                tableMatiereShow &&
                                elementIndexLu &&
                                elementConteneurScroll &&
                                elementConteneurScroll.getBoundingClientRect()
                                    .height +
                                    110 >
                                    elementIndexLu.getBoundingClientRect()
                                        .top &&
                                indexLu < cours.Contenu.length
                            ) {
                                Axios.post(`/Progression/${id}`, {
                                    progression: Math.round(
                                        (100 / (cours.Contenu.length - 1)) *
                                            indexLu
                                    )
                                });
                                if (indexLu < cours.Contenu.length - 1)
                                    setIndexLu((c) => c + 1);
                            }
                        }}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state2]
                        }}
                    >
                        {cours.Contenu.map(
                            (element: ContenuCoursI, index: number) => {
                                return (
                                    <Element
                                        id={
                                            paragraphe
                                                ? `element1-${index}`
                                                : `element-${index}`
                                        }
                                        name={
                                            paragraphe
                                                ? `element1-${index}`
                                                : `element-${index}`
                                        }
                                        key={
                                            paragraphe
                                                ? `element1-${index}`
                                                : `element-${index}`
                                        }
                                        className="element"
                                    >
                                        <Styled.ConteneurSlate
                                            options={element.options}
                                            imageOptions={element.imageOptions}
                                            type={element.type}
                                            image={element.image}
                                        >
                                            {// Affichage du numéro de Bloc en fonction du grade de l'utilisateur
                                            user.connecte &&
                                                (user.grade ===
                                                    "Administrateur" ||
                                                    user.grade ===
                                                        "Visiteur") && (
                                                    <Styled.PuceLien>
                                                        {index}
                                                    </Styled.PuceLien>
                                                )}
                                            {// Gestion de l'affichage d'une image dans un  bloc Slate
                                            element.image && (
                                                <Styled.ConteneurImage
                                                    imageOptions={
                                                        element.imageOptions
                                                    }
                                                >
                                                    <Styled.TailleImage
                                                        imageOptions={
                                                            element.imageOptions
                                                        }
                                                    >
                                                        <Styled.BlocImage
                                                            imageOptions={
                                                                element.imageOptions
                                                            }
                                                        />
                                                    </Styled.TailleImage>
                                                </Styled.ConteneurImage>
                                            )}
                                            {element.type === "citation" && (
                                                <Styled.BlocCitation>
                                                    <Styled.BarreCitation />
                                                    <Slate
                                                        index={index}
                                                        value={element.value}
                                                        readOnly={false}
                                                    />
                                                </Styled.BlocCitation>
                                            )}
                                            {element.type !== "citation" && (
                                                <Slate
                                                    index={index}
                                                    value={element.value}
                                                    readOnly={false}
                                                />
                                            )}
                                        </Styled.ConteneurSlate>
                                    </Element>
                                );
                            }
                        )}
                    </Styled.ConteneurGlobal>
                )}
            </Transition>

            {tableMatiereShow && <TableMatiere cours={cours} />}
        </Styled.Conteneur>
    );
};
export default Programme;
