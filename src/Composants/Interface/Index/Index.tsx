import * as React from "react";
import styled from "styled-components";
import "./Index.css";
import Axios from "../../Fonctionnels/Axios";
import { Popover, Radio } from "antd";
import Slate from "../../Fonctionnels/Slate";
import { Styled } from "./Styled";
import { Link, Events, scrollSpy, Element } from "react-scroll";
import { RadioChangeEvent } from "antd/lib/radio";

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

interface stateProps {
    id: number;
    nom?: string;
    Cours?: any;
    type?: string;
    lettre?: string;
    description?: string;
}

type filtres = "tous" | "notion" | "terme" | "auteur";

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

const Index = () => {
    const [state, setState] = React.useState<stateProps[]>([]);
    const [indexSel, setIndexSel] = React.useState<stateProps>({
        Cours: [],
        id: 0
    });

    const [id, setId] = React.useState<number>(50);
    const [filtre, setFiltre] = React.useState<filtres>("tous");
    const refListe = React.useRef<HTMLDivElement>(null);
    const [menuPos, setMenuPos] = React.useState([0, 0]);

    function changeIndex(id: number) {
        if (id !== indexSel.id) {
            setIndexSel({ Cours: [], id: 0 });
            setId(id);
        }
    }

    React.useEffect(() => {
        Events.scrollEvent.register("begin", function() {});

        Events.scrollEvent.register("end", function() {});

        scrollSpy.update();
        if (
            refListe.current &&
            (refListe.current.getBoundingClientRect().left !== menuPos[0] ||
                refListe.current.getBoundingClientRect().top !== menuPos[1])
        ) {
            setMenuPos([
                refListe.current.getBoundingClientRect().left,
                refListe.current.getBoundingClientRect().top
            ]);
        }
        if (state.length === 0) {
            Axios.get("/Indexes").then((rep) => {
                setState(rep.data);
            });
        }
        if (indexSel.id !== id) {
            Axios.get(`/Indexes/${id}`).then((rep) => {
                setIndexSel({
                    id: rep.data.id,
                    nom: rep.data.nom,
                    Cours: rep.data.description,
                    type: rep.data.type,
                    lettre: rep.data.lettre
                });
            });
        }
        return () => {
            Events.scrollEvent.remove("begin");
            Events.scrollEvent.remove("end");
        };
    }, [filtre, id]);

    function filtres(event: RadioChangeEvent) {
        setFiltre(event.target.value);
    }
    return (
        <Styled.Conteneur>
            <Styled.ConteneurLettres>
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
                                    <Styled.Lettre>{item}</Styled.Lettre>
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
                                    <Styled.Lettre>{item}</Styled.Lettre>
                                </Link>
                            );
                        }
                        return null;
                    })}
                </Styled.LettresD>
            </Styled.ConteneurLettres>
            <div
                style={{
                    position: "absolute",
                    top: menuPos[1] - 40 + "px",
                    left: menuPos[0] + "px"
                }}
            >
                <Radio.Group
                    defaultValue="tous"
                    buttonStyle="outline"
                    size="small"
                    onChange={filtres}
                >
                    <Styled.RadioButton value="tous">Tous</Styled.RadioButton>
                    <Styled.RadioButton value="notion">
                        Notions
                    </Styled.RadioButton>
                    <Styled.RadioButton value="terme">
                        Termes
                    </Styled.RadioButton>
                    <Styled.RadioButton value="auteur">
                        Auteurs
                    </Styled.RadioButton>
                </Radio.Group>
            </div>
            <Styled.ConteneurListe ref={refListe} id="ConteneurListe">
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
                                            el.lettre === item &&
                                            ((filtre !== "tous" &&
                                                filtre === el.type) ||
                                                filtre === "tous")
                                    )
                                    .map((element) => {
                                        return (
                                            <ElementListe
                                                selected={element.id === id}
                                                onMouseDown={() => {
                                                    changeIndex(element.id);
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
            </Styled.ConteneurListe>
            <Styled.ConteneurDescription>
                {indexSel.Cours !== null &&
                    indexSel.Cours.length > 0 &&
                    indexSel.Cours.map((element: any, index: number) => {
                        return (
                            <Styled.ConteneurSlate
                                key={`partie-${index}`}
                                style={{
                                    backgroundColor:
                                        element.options.backgroundColor,
                                    marginTop: element.options.marginTop + "px",
                                    marginBottom:
                                        element.options.marginBottom + "px",
                                    marginLeft:
                                        element.options.marginLeft + "px",
                                    paddingLeft:
                                        element.options.paddingLeft + "px",
                                    marginRight:
                                        element.options.marginRight + "px",
                                    paddingRight:
                                        element.options.paddingRight + "px",
                                    paddingTop:
                                        element.options.paddingTop + "px",
                                    paddingBottom:
                                        element.options.paddingBottom + "px",
                                    fontFamily: "Century Gothic",
                                    fontSize: "16px",
                                    minHeight: element.image
                                        ? element.imageOptions.height + "px"
                                        : ""
                                }}
                            >
                                {element.image && (
                                    <Popover
                                        placement="bottom"
                                        content={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
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
                                                            padding: "5px",
                                                            marginRight: "10px",
                                                            fontWeight: "bold",
                                                            maxWidth: "200px"
                                                        }}
                                                    >
                                                        {
                                                            element.imageOptions
                                                                .lienType
                                                        }
                                                    </div>
                                                )}
                                                {element.imageOptions.legende}
                                            </div>
                                        }
                                    >
                                        <div
                                            style={{
                                                float:
                                                    element.imageOptions
                                                        .align === "center"
                                                        ? "none"
                                                        : element.imageOptions
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
                                                    cursor: element.imageOptions
                                                        .lienActif
                                                        ? "pointer"
                                                        : "arrow"
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        height: "inherit",
                                                        width: "inherit",
                                                        paddingBottom: "10px",
                                                        paddingLeft:
                                                            element.imageOptions
                                                                .align ===
                                                            "right"
                                                                ? "10px"
                                                                : "0px",
                                                        paddingRight:
                                                            element.imageOptions
                                                                .align ===
                                                            "left"
                                                                ? "10px"
                                                                : "0px"
                                                    }}
                                                    src={
                                                        element.imageOptions.src
                                                    }
                                                    alt={
                                                        element.imageOptions
                                                            .legende
                                                    }
                                                    onMouseDown={() => {
                                                        if (
                                                            element.imageOptions
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
                                <Slate
                                    index={index}
                                    value={element.value}
                                    readOnly={true}
                                />
                            </Styled.ConteneurSlate>
                        );
                    })}
            </Styled.ConteneurDescription>
        </Styled.Conteneur>
    );
};
export default Index;
