import * as React from "react";
import styled from "styled-components";
import "./Index.css";
import Axios from "../../Fonctionnels/Axios";
import { Popover, Radio } from "antd";
import Slate from "../../Fonctionnels/Slate";
import Scroll, {
    Link,
    Events,
    scrollSpy,
    animateScroll,
    Element
} from "react-scroll";
import { RadioChangeEvent } from "antd/lib/radio";

const Conteneur = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

const ConteneurLettres = styled.div`
    display: flex;
`;

const LettresG = styled.div`
    display: flex;
    flex-direction: column;
`;
const LettresD = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const ConteneurSlate = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px dashed transparent;
    transition: all 0.2s;
`;

const Lettre = styled.div`
    height: 40px;
    width: 40px;
    text-align: center;
    border: 1px solid #707070;
    color: #707070;
    font-size: 24px;
    margin-bottom: 2px;
    margin-right: 2px;
    user-select: none;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: grey;
        color: white;
    }
`;

const ConteneurListe = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    height: 90%;
    overflow: auto;
    padding-right: 10px;
    width: 270px;
`;
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

const BlocLettre = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Lettre2 = styled.div`
    font-size: 24px;
    color: orange;
`;

const ConteneurDescription = styled.div`
    width: 500px;
    margin-left: 40px;
    overflow: auto;
    height: 100%;
    padding-right: 10px;
`;

interface stateProps {
    id: number;
    nom?: string;
    Cours?: any;
    type?: string;
    lettre?: string;
    description?: string;
}

const RadioButton = styled(Radio.Button)`
    background-color: rgba(0, 0, 0, 0);
`;

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
        console.log("raté");

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
        <Conteneur>
            <ConteneurLettres>
                <LettresG>
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
                                    <Lettre>{item}</Lettre>
                                </Link>
                            );
                        }
                    })}
                </LettresG>
                <LettresD>
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
                                    <Lettre>{item}</Lettre>
                                </Link>
                            );
                        }
                    })}
                </LettresD>
            </ConteneurLettres>
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
                    <RadioButton value="tous">Tous</RadioButton>
                    <RadioButton value="notion">Notions</RadioButton>
                    <RadioButton value="terme">Termes</RadioButton>
                    <RadioButton value="auteur">Auteurs</RadioButton>
                </Radio.Group>
            </div>
            <ConteneurListe ref={refListe} id="ConteneurListe">
                {alphabet.map((item) => {
                    return (
                        <div key={`Bloclettre-${item}`}>
                            <Element
                                id={`Lettre-${item}`}
                                name={`Lettre-${item}`}
                                key={`Lettre-${item}`}
                                className="element"
                            >
                                <Lettre2>{item}</Lettre2>
                            </Element>

                            <BlocLettre>
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
                            </BlocLettre>
                        </div>
                    );
                })}
            </ConteneurListe>
            <ConteneurDescription>
                {indexSel.Cours !== null &&
                    indexSel.Cours.length > 0 &&
                    indexSel.Cours.map((element: any, index: number) => {
                        return (
                            <ConteneurSlate
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
                            </ConteneurSlate>
                        );
                    })}
            </ConteneurDescription>
        </Conteneur>
    );
};
export default Index;
