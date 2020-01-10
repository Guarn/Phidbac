import React, { useRef, useState } from "react";
import styled from "styled-components";
import "./Index.css";
import Axios from "../../Fonctionnels/Axios";
import { Radio, Icon, Modal } from "antd";
import Slate from "../../Fonctionnels/Slate";
import * as Styled from "./Index.Styled";
import { Link, Events, scrollSpy, Element } from "react-scroll";
import { Transition } from "react-transition-group";
import { userContext } from "../../../App";
import { DesktopTablet, Desktop, Mobile } from "../../../responsive";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

interface elementProps {
    selected: boolean;
}

const ElementListe = styled.div<elementProps>`
    cursor: pointer;
    font-weight: ${(props) => (props.selected ? "bold" : null)};
    &:hover {
        font-weight: bold;
    }
`;

interface stateI {
    id: number;
    nom?: string;
    Cours?: any;
    type?: string;
    lettre: string;
    description?: string;
}

type FiltresT = "tous" | "notion" | "terme" | "auteur";

const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

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

const Index = () => {
    const [id, setId] = useState<number>(50);
    const [modalShow, setModalShow] = useState(false);
    const refListe = useRef<HTMLDivElement>(null);
    const location = useLocation();

    React.useEffect(() => {
        Events.scrollEvent.register("begin", function() {});

        Events.scrollEvent.register("end", function() {});

        scrollSpy.update();

        if (location.pathname.substring(16)) {
            setId(parseInt(location.pathname.substring(17).split("-")[0]));
        }

        return () => {
            Events.scrollEvent.remove("begin");
            Events.scrollEvent.remove("end");
        };
    }, [location.pathname]);

    return (
        <Styled.Conteneur>
            <Desktop>
                <Transition
                    appear
                    enter
                    mountOnEnter
                    unmountOnExit
                    in={true}
                    timeout={{ appear: 100, enter: 100, exit: 200 }}
                >
                    {(state) => (
                        <Styled.ConteneurLettres
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <Styled.LettresG>
                                {alphabet.map((item, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <Link
                                                activeClass="active"
                                                to={`Lettre-${item}`}
                                                spy={true}
                                                smooth={true}
                                                duration={350}
                                                containerId="ConteneurListe"
                                                key={item + "-" + index}
                                            >
                                                <Styled.Lettre>
                                                    {item}
                                                </Styled.Lettre>
                                            </Link>
                                        );
                                    }
                                    return null;
                                })}
                            </Styled.LettresG>
                            <Styled.LettresD>
                                {alphabet.map((item, index) => {
                                    if (index % 2) {
                                        return (
                                            <Link
                                                activeClass="active"
                                                to={`Lettre-${item}`}
                                                spy={true}
                                                smooth={true}
                                                duration={350}
                                                containerId="ConteneurListe"
                                                key={item + "-" + index}
                                            >
                                                <Styled.Lettre>
                                                    {item}
                                                </Styled.Lettre>
                                            </Link>
                                        );
                                    }
                                    return null;
                                })}
                            </Styled.LettresD>
                        </Styled.ConteneurLettres>
                    )}
                </Transition>
            </Desktop>
            <Transition
                appear
                enter
                mountOnEnter
                unmountOnExit
                in={true}
                timeout={{ appear: 300, enter: 300, exit: 200 }}
            >
                {(state) => (
                    <Styled.ConteneurListe
                        ref={refListe}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                    >
                        <ListeIndex
                            id={id}
                            setModalShow={(val: boolean) => setModalShow(val)}
                            setId={(val: number) => setId(val)}
                        />
                    </Styled.ConteneurListe>
                )}
            </Transition>
            <Mobile>
                <Modal
                    visible={modalShow}
                    footer={null}
                    destroyOnClose
                    onCancel={() => setModalShow(false)}
                    onOk={() => setModalShow(false)}
                >
                    <DescriptionIndex id={id} />
                </Modal>
            </Mobile>
            <DesktopTablet>
                <Transition
                    appear
                    enter
                    mountOnEnter
                    unmountOnExit
                    in={true}
                    timeout={{ appear: 500, enter: 500, exit: 200 }}
                >
                    {(state) => (
                        <Styled.ConteneurDescription
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <DescriptionIndex id={id} />
                        </Styled.ConteneurDescription>
                    )}
                </Transition>
            </DesktopTablet>
        </Styled.Conteneur>
    );
};
export default Index;

interface ListeIndexI {
    id: number;
    setId: any;
    setModalShow: any;
}

/**
 * Affichage de la liste des index triés par ordre alphabétique.
 *
 */

const ListeIndex: React.FC<ListeIndexI> = ({ id, setId, setModalShow }) => {
    const [state, setState] = React.useState<stateI[]>([]);
    const [filtre, setFiltre] = React.useState<FiltresT>("tous");

    React.useEffect(() => {
        Axios.get("/Indexes").then((rep) => {
            setState(rep.data);
        });
    }, []);
    return (
        <>
            <ChoixFiltre setFiltre={(val: FiltresT) => setFiltre(val)} />
            <Styled.ConteneurListeIndex id="ConteneurListe">
                {alphabet.map((item) => {
                    return (
                        <div key={`Bloclettre-${item}`}>
                            <Element
                                id={`Lettre-${item}`}
                                name={`Lettre-${item}`}
                                key={`Lettre-${item}`}
                                className="element"
                            >
                                <Styled.Lettre2>{item}</Styled.Lettre2>
                            </Element>

                            <Styled.BlocLettre>
                                {state
                                    .filter(
                                        (el) =>
                                            el.lettre
                                                .charAt(0)
                                                .toUpperCase() === item &&
                                            ((filtre !== "tous" &&
                                                filtre === el.type) ||
                                                filtre === "tous")
                                    )
                                    .map((element) => {
                                        return (
                                            <ElementListe
                                                selected={element.id === id}
                                                onMouseDown={() => {
                                                    setId(element.id);
                                                    setModalShow(true);
                                                }}
                                                key={element.id}
                                            >
                                                {element.nom}
                                            </ElementListe>
                                        );
                                    })}
                            </Styled.BlocLettre>
                        </div>
                    );
                })}
            </Styled.ConteneurListeIndex>
        </>
    );
};

const ChoixFiltre: React.FC<any> = ({ setFiltre }) => {
    React.useEffect(() => {}, []);
    return (
        <Radio.Group
            defaultValue="tous"
            buttonStyle="outline"
            size="small"
            onChange={(val) => setFiltre(val.target.value)}
        >
            <Styled.RadioButton value="tous">Tous</Styled.RadioButton>
            <Styled.RadioButton value="notion">Notions</Styled.RadioButton>
            <Styled.RadioButton value="terme">Termes</Styled.RadioButton>
            <Styled.RadioButton value="auteur">Auteurs</Styled.RadioButton>
        </Radio.Group>
    );
};

interface DescriptionIndexI {
    id: number;
}

/**
 * Affichage de la description de l'index sélectionné
 * @id Index sélectionné
 */

export const DescriptionIndex: React.FC<DescriptionIndexI> = ({ id }) => {
    const [user] = React.useContext(userContext);

    const [state, setState] = React.useState<stateI>({
        Cours: [],
        lettre: "",
        id: 0
    });
    React.useEffect(() => {
        Axios.get(`/Indexes/${id}`)
            .then((rep) => {
                setState({
                    id: rep.data.id,
                    nom: rep.data.nom,
                    Cours: rep.data.description || [],
                    type: rep.data.type,
                    lettre: rep.data.lettre
                });
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            {state.Cours.map((element: any, index: number) => {
                return (
                    <Styled.ConteneurSlate
                        key={`partie-${index}`}
                        style={{
                            backgroundColor: element.options.backgroundColor,
                            marginTop: element.options.marginTop + "px",
                            marginBottom: element.options.marginBottom + "px",
                            marginLeft: element.options.marginLeft + "px",
                            paddingLeft: element.options.paddingLeft + "px",
                            marginRight: element.options.marginRight + "px",
                            paddingRight: element.options.paddingRight + "px",
                            paddingTop: element.options.paddingTop + "px",
                            paddingBottom: element.options.paddingBottom + "px",
                            fontFamily: "Century Gothic",
                            minHeight: element.image
                                ? element.imageOptions.height + "px"
                                : ""
                        }}
                    >
                        <Helmet>
                            <title>{`${state.type?.toUpperCase()} : ${
                                state.nom
                            }`}</title>
                            <meta charSet="utf-8" />
                            <meta
                                name="description"
                                content={`Définition de  l'index ${state.nom}.`}
                            />
                            <link
                                rel="canonical"
                                href={`https://www.phidbac.fr/Liste-des-index/${
                                    state.id
                                }-${state.nom
                                    ?.trim()
                                    .replace(" ", "-")
                                    .replace("/", "-")}`}
                            />
                        </Helmet>
                        {user.connecte &&
                            (user.grade === "Administrateur" ||
                                user.grade === "Visiteur") &&
                            index === 0 && (
                                <Styled.LienAdmin
                                    onMouseDown={() => {
                                        window.open(
                                            `https://phidbac.fr:3001/Index/Gestion#${state.id}`,
                                            "_blank"
                                        );
                                    }}
                                >
                                    <Icon type="edit" />
                                </Styled.LienAdmin>
                            )}
                        {element.image && (
                            <div
                                style={{
                                    float:
                                        element.imageOptions.align === "center"
                                            ? "none"
                                            : element.imageOptions.align,
                                    display: "flex",

                                    justifyContent: "center",
                                    zIndex: -1,

                                    marginLeft: element.imageOptions.marginLeft,
                                    marginRight:
                                        element.imageOptions.marginRight,
                                    marginBottom:
                                        element.imageOptions.marginBottom
                                }}
                            >
                                <div
                                    style={{
                                        height:
                                            element.imageOptions.height + "px",
                                        width: element.imageOptions.width + "px"
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "inherit",
                                            width: "inherit",
                                            paddingBottom: "10px",
                                            paddingLeft:
                                                element.imageOptions.align ===
                                                "right"
                                                    ? "10px"
                                                    : "0px",
                                            paddingRight:
                                                element.imageOptions.align ===
                                                "left"
                                                    ? "10px"
                                                    : "0px"
                                        }}
                                        src={element.imageOptions.src}
                                        alt={element.imageOptions.legende}
                                    />
                                </div>
                            </div>
                        )}
                        <Slate
                            index={index}
                            value={element.value}
                            readOnly={true}
                        />
                    </Styled.ConteneurSlate>
                );
            })}
        </>
    );
};
