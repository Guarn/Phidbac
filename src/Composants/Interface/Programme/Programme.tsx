import * as React from "react";
import styled from "styled-components";
import Axios from "../../Fonctionnels/Axios";
import Slate from "../../Fonctionnels/Slate";
import { useLocation } from "react-router";
import { Popover } from "antd";
import { animateScroll, Element } from "react-scroll";
import TableMatiere from "./TableMatiere";
import { Transition } from "react-transition-group";
import "./Programme.css";
import { userContext } from "../../../App";
export interface Programme {
    id: number;
    paragraphe?: number;
}
interface State {
    Cours: any;
    Titre: any;
    Description: any;
}
interface WidthProps {
    width: number;
}
const ConteneurGlobal = styled.div<WidthProps>`
    width: ${(props) => props.width + "px"};
    overflow: auto;
    margin-top: 30px;
    padding-right: 30px;
    position: relative;
    padding-left: 10%;
    height: 95%;
`;
interface SelectedProps {
    selected: boolean;
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
const Conteneur = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;
const PuceLien = styled.div`
    opacity: 0;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 20px;
    width: 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: salmon;
    transform: translate3d(-50px, 0, 0);
`;
const ConteneurSlate = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px dashed transparent;
    transition: all 0.2s;
    &:hover ${PuceLien} {
        opacity: 1;
    }
`;

const Programme: React.FC<Programme> = ({ id, paragraphe }) => {
    const [user, userDispatch] = React.useContext(userContext);
    const [state, setState] = React.useState<State>({
        Cours: [],
        Description: "",
        Titre: ""
    });

    const [indexLu, setIndexLu] = React.useState(0);

    const location = useLocation();
    let loc = React.useMemo(() => location.hash.replace("#", ""), [
        location.hash
    ]);
    const [TabMatiere, setTabMat] = React.useState(false);

    React.useEffect(() => {
        if (state.Titre === "") {
            Axios.get(`/Cours/${id}`).then((rep) => {
                setState({
                    Titre: rep.data.Titre,
                    Description: rep.data.Description,
                    Cours: JSON.parse(rep.data.Contenu)
                });
                setTabMat(true);
            });
        } else {
            let el1: HTMLElement | null = document.getElementById("element-0");
            let el1Bis: HTMLElement | null = document.getElementById(
                "element1-0"
            );
            let el2: HTMLElement | null = document.getElementById(
                `element-${loc}`
            );
            let el3: HTMLElement | null = document.getElementById(
                `element1-${paragraphe}`
            );

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
            if (paragraphe) {
                setTabMat(false);
                if (el3) {
                    el3.scrollIntoView();
                }
            }
        }
    });
    return (
        <Conteneur>
            <Transition
                appear
                enter
                mountOnEnter
                unmountOnExit
                in={true}
                timeout={{ appear: 200, enter: 200, exit: 200 }}
            >
                {(state2) => (
                    <ConteneurGlobal
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
                                elementIndexLu &&
                                elementConteneurScroll &&
                                elementConteneurScroll.getBoundingClientRect()
                                    .height +
                                    110 >
                                    elementIndexLu.getBoundingClientRect()
                                        .top &&
                                indexLu < state.Cours.length
                            ) {
                                Axios.post(`/Progression/${id}`, {
                                    progression: Math.round(
                                        (100 / (state.Cours.length - 1)) *
                                            indexLu
                                    )
                                });
                                if (indexLu < state.Cours.length - 1)
                                    setIndexLu((c) => c + 1);
                            }
                        }}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state2]
                        }}
                    >
                        {state.Cours.map((element: any, index: number) => {
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
                                    <ConteneurSlate
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
                                        {user.connecte &&
                                            (user.grade === "Administrateur" ||
                                                user.grade === "Visiteur") && (
                                                <PuceLien>{index}</PuceLien>
                                            )}
                                        {element.image && (
                                            <Popover
                                                placement="bottom"
                                                content={
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                            alignItems:
                                                                "center",
                                                            margin: "-10px",
                                                            maxWidth: "400px"
                                                        }}
                                                    >
                                                        {element.imageOptions
                                                            .lienActif && (
                                                            <div
                                                                style={{
                                                                    borderRight:
                                                                        "1px solid rgba(0,0,0,0.1)",
                                                                    padding:
                                                                        "5px",
                                                                    marginRight:
                                                                        "10px",
                                                                    fontWeight:
                                                                        "bold",
                                                                    maxWidth:
                                                                        "200px"
                                                                }}
                                                            >
                                                                {
                                                                    element
                                                                        .imageOptions
                                                                        .lienType
                                                                }
                                                            </div>
                                                        )}
                                                        {
                                                            element.imageOptions
                                                                .legende
                                                        }
                                                    </div>
                                                }
                                            >
                                                <div
                                                    style={{
                                                        float:
                                                            element.imageOptions
                                                                .align ===
                                                            "center"
                                                                ? "none"
                                                                : element
                                                                      .imageOptions
                                                                      .align,
                                                        display: "flex",

                                                        justifyContent:
                                                            "center",
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
                                                                element
                                                                    .imageOptions
                                                                    .height +
                                                                "px",
                                                            width:
                                                                element
                                                                    .imageOptions
                                                                    .width +
                                                                "px",
                                                            cursor: element
                                                                .imageOptions
                                                                .lienActif
                                                                ? "pointer"
                                                                : "arrow"
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                height:
                                                                    "inherit",
                                                                width:
                                                                    "inherit",
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
                                                                element
                                                                    .imageOptions
                                                                    .src
                                                            }
                                                            alt={
                                                                element
                                                                    .imageOptions
                                                                    .legende
                                                            }
                                                            onMouseDown={() => {
                                                                if (
                                                                    element
                                                                        .imageOptions
                                                                        .lienActif
                                                                ) {
                                                                    window.open(
                                                                        "http://" +
                                                                            element
                                                                                .imageOptions
                                                                                .lien,
                                                                        "_blank"
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </Popover>
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
                                    </ConteneurSlate>
                                </Element>
                            );
                        })}
                    </ConteneurGlobal>
                )}
            </Transition>
            <Transition
                appear
                enter
                mountOnEnter
                unmountOnExit
                in={TabMatiere}
                timeout={{ appear: 500, enter: 500, exit: 200 }}
            >
                {(state3) => (
                    <TableMatiere
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state3]
                        }}
                        state={state}
                    />
                )}
            </Transition>
        </Conteneur>
    );
};
export default Programme;
