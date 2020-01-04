import * as React from "react";
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
    tableMatiereShow?: Boolean;
}

export type CoursT = {
    Cours: any;
};

export interface CoursI {
    Cours: CoursT[];
    Titre: String;
    Description: String;
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
 * @param id Int | Id du cours à afficher
 * @param paragraphe Int | (optionnel) Numéro de paragraphe vers lequel scroll au chargement.
 * @param tableMatiereShow Boolean | (optionnel) Affichage de  la table des matieres
 */

const Programme: React.FC<ProgrammeI> = ({
    id,
    paragraphe,
    tableMatiereShow
}) => {
    const [user] = React.useContext(userContext);
    const [cours, setCours] = React.useState<CoursI>({
        Cours: [],
        Description: "",
        Titre: ""
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
                    Cours: JSON.parse(rep.data.Contenu)
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
        <Styled.Conteneur>
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
                                indexLu < cours.Cours.length
                            ) {
                                Axios.post(`/Progression/${id}`, {
                                    progression: Math.round(
                                        (100 / (cours.Cours.length - 1)) *
                                            indexLu
                                    )
                                });
                                if (indexLu < cours.Cours.length - 1)
                                    setIndexLu((c) => c + 1);
                            }
                        }}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state2]
                        }}
                    >
                        {cours.Cours.map((element: any, index: number) => {
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
                                        style={{
                                            backgroundColor:
                                                element.options.backgroundColor,
                                            marginTop:
                                                element.options.marginTop +
                                                "px",
                                            marginBottom:
                                                element.options.marginBottom +
                                                "px",
                                            marginLeft:
                                                element.options.marginLeft +
                                                "px",
                                            paddingLeft:
                                                element.options.paddingLeft +
                                                "px",
                                            marginRight:
                                                element.options.marginRight +
                                                "px",
                                            paddingRight:
                                                element.options.paddingRight +
                                                "px",
                                            paddingTop:
                                                element.options.paddingTop +
                                                "px",
                                            paddingBottom:
                                                element.options.paddingBottom +
                                                "px",
                                            fontFamily: "Century Gothic",
                                            display:
                                                element.type === "citation"
                                                    ? "flex"
                                                    : "t",
                                            fontSize: "16px",
                                            minHeight: element.image
                                                ? element.imageOptions.height +
                                                  "px"
                                                : "",
                                            position: "relative"
                                        }}
                                    >
                                        {// Affichage du numéro de Bloc en fonction du grade de l'utilisateur
                                        user.connecte &&
                                            (user.grade === "Administrateur" ||
                                                user.grade === "Visiteur") && (
                                                <Styled.PuceLien>
                                                    {index}
                                                </Styled.PuceLien>
                                            )}
                                        {// Gestion de l'affichage d'une image dans un  bloc Slate
                                        element.image && (
                                            <div
                                                style={{
                                                    float:
                                                        element.imageOptions
                                                            .align === "center"
                                                            ? "none"
                                                            : element
                                                                  .imageOptions
                                                                  .align,
                                                    display: "flex",

                                                    justifyContent: "center",
                                                    zIndex: -1,

                                                    marginLeft:
                                                        element.imageOptions
                                                            .marginLeft,
                                                    marginRight:
                                                        element.imageOptions
                                                            .marginRight,
                                                    marginBottom:
                                                        element.imageOptions
                                                            .marginBottom
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        height:
                                                            element.imageOptions
                                                                .height + "px",
                                                        width:
                                                            element.imageOptions
                                                                .width + "px",
                                                        cursor: element
                                                            .imageOptions
                                                            .lienActif
                                                            ? "pointer"
                                                            : "arrow"
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            height: "inherit",
                                                            width: "inherit",
                                                            paddingBottom:
                                                                "10px",
                                                            paddingLeft:
                                                                element
                                                                    .imageOptions
                                                                    .align ===
                                                                "right"
                                                                    ? "10px"
                                                                    : "0px",
                                                            paddingRight:
                                                                element
                                                                    .imageOptions
                                                                    .align ===
                                                                "left"
                                                                    ? "10px"
                                                                    : "0px"
                                                        }}
                                                        src={
                                                            element.imageOptions
                                                                .src
                                                        }
                                                        alt={
                                                            element.imageOptions
                                                                .legende
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {element.type === "citation" && (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    display: "flex"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(0,0,0,0.2)",
                                                        minWidth: "6px",
                                                        marginRight: "30px"
                                                    }}
                                                />
                                                <Slate
                                                    index={index}
                                                    value={element.value}
                                                    readOnly={false}
                                                />
                                            </div>
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
                        })}
                    </Styled.ConteneurGlobal>
                )}
            </Transition>

            {tableMatiereShow && <TableMatiere cours={cours} />}
        </Styled.Conteneur>
    );
};
export default Programme;
