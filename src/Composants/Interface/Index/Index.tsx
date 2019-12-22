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

const DescriptionTitre = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
`;
const DescriptionContenu = styled.div`
    text-align: justify;
`;

interface stateProps {
    id?: number;
    nom?: string;
    Cours?: any;
    type?: string;
    lettre?: string;
}

const RadioButton = styled(Radio.Button)`
    background-color: rgba(0, 0, 0, 0);
`;

const Index = () => {
    const [state, setState] = React.useState([]);
    const [indexSel, setIndexSel] = React.useState<stateProps>({
        Cours: [],
        id: 0
    });
    const [id, setId] = React.useState(50);
    const [filtre, setFiltre] = React.useState("tous");
    const refListe = React.useRef(null);
    const [menuPos, setMenuPos] = React.useState([0, 0]);

    React.useEffect(() => {
        Events.scrollEvent.register("begin", function() {});

        Events.scrollEvent.register("end", function() {});

        scrollSpy.update();
        if (
            refListe.current.getBoundingClientRect().left !== menuPos[0] ||
            refListe.current.getBoundingClientRect().top !== menuPos[1]
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
    }, [filtre, id, menuPos]);

    function filtres(event) {
        setFiltre(event.target.value);
    }
    return (
        <Conteneur>
            <ConteneurLettres>
                <LettresG>
                    <Link
                        activeClass="active"
                        to={`Lettre-A`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>A</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-C`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>C</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-E`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>E</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-G`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>G</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-I`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>I</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-K`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>K</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-M`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>M</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-O`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>O</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-Q`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>Q</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-S`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>S</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-U`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>U</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-W`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>W</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-Y`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>Y</Lettre>
                    </Link>
                </LettresG>
                <LettresD>
                    <Link
                        activeClass="active"
                        to={`Lettre-B`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>B</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-D`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>D</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-F`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>F</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-H`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>H</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-J`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>J</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-L`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>L</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-N`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>N</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-P`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>P</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-R`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>R</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-T`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>T</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-V`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>V</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-X`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>X</Lettre>
                    </Link>
                    <Link
                        activeClass="active"
                        to={`Lettre-Z`}
                        spy={true}
                        smooth={true}
                        duration={350}
                        containerId="ConteneurListe"
                    >
                        <Lettre>Z</Lettre>
                    </Link>
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
                <Element
                    id="Lettre-A"
                    name="Lettre-A"
                    key="Lettre-A"
                    className="element"
                >
                    <Lettre2>A</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "A" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                        key={element.id}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-B"
                    name="Lettre-B"
                    key="Lettre-B"
                    className="element"
                >
                    <Lettre2>B</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "B" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-C"
                    name="Lettre-C"
                    key="Lettre-C"
                    className="element"
                >
                    <Lettre2>C</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "C" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-D"
                    name="Lettre-D"
                    key="Lettre-D"
                    className="element"
                >
                    <Lettre2>D</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "D" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-E"
                    name="Lettre-E"
                    key="Lettre-E"
                    className="element"
                >
                    <Lettre2>E</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "E" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-F"
                    name="Lettre-F"
                    key="Lettre-F"
                    className="element"
                >
                    <Lettre2>F</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "F" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-G"
                    name="Lettre-G"
                    key="Lettre-G"
                    className="element"
                >
                    <Lettre2>G</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "G" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-H"
                    name="Lettre-H"
                    key="Lettre-H"
                    className="element"
                >
                    <Lettre2>H</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "H" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-I"
                    name="Lettre-I"
                    key="Lettre-I"
                    className="element"
                >
                    <Lettre2>I</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "I" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-J"
                    name="Lettre-J"
                    key="Lettre-J"
                    className="element"
                >
                    <Lettre2>J</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "J" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-K"
                    name="Lettre-K"
                    key="Lettre-K"
                    className="element"
                >
                    <Lettre2>K</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "K" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-L"
                    name="Lettre-L"
                    key="Lettre-L"
                    className="element"
                >
                    <Lettre2>L</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "L" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-M"
                    name="Lettre-M"
                    key="Lettre-M"
                    className="element"
                >
                    <Lettre2>M</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "M" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-N"
                    name="Lettre-N"
                    key="Lettre-N"
                    className="element"
                >
                    <Lettre2>N</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "N" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-O"
                    name="Lettre-O"
                    key="Lettre-O"
                    className="element"
                >
                    <Lettre2>O</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "O" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-P"
                    name="Lettre-P"
                    key="Lettre-P"
                    className="element"
                >
                    <Lettre2>P</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "P" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-Q"
                    name="Lettre-Q"
                    key="Lettre-Q"
                    className="element"
                >
                    <Lettre2>Q</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "Q" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-R"
                    name="Lettre-R"
                    key="Lettre-R"
                    className="element"
                >
                    <Lettre2>R</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "R" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-S"
                    name="Lettre-S"
                    key="Lettre-S"
                    className="element"
                >
                    <Lettre2>S</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "S" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-T"
                    name="Lettre-T"
                    key="Lettre-T"
                    className="element"
                >
                    <Lettre2>T</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "T" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-U"
                    name="Lettre-U"
                    key="Lettre-U"
                    className="element"
                >
                    <Lettre2>U</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "U" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-V"
                    name="Lettre-V"
                    key="Lettre-V"
                    className="element"
                >
                    <Lettre2>V</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "V" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-W"
                    name="Lettre-W"
                    key="Lettre-W"
                    className="element"
                >
                    <Lettre2>W</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "W" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-X"
                    name="Lettre-X"
                    key="Lettre-X"
                    className="element"
                >
                    <Lettre2>X</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "X" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-Y"
                    name="Lettre-Y"
                    key="Lettre-Y"
                    className="element"
                >
                    <Lettre2>Y</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "Y" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
                <Element
                    id="Lettre-Z"
                    name="Lettre-Z"
                    key="Lettre-Z"
                    className="element"
                >
                    <Lettre2>Z</Lettre2>
                </Element>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter(
                                (el) =>
                                    el.lettre === "Z" &&
                                    ((filtre !== "tous" &&
                                        filtre === el.type) ||
                                        filtre === "tous")
                            )
                            .map((element) => {
                                return (
                                    <ElementListe
                                        key={element.id}
                                        selected={element.id === id}
                                        onMouseDown={() => setId(element.id)}
                                    >
                                        {element.nom}
                                    </ElementListe>
                                );
                            })}
                    </BlocLettre>
                )}
            </ConteneurListe>
            <ConteneurDescription>
                {indexSel.Cours !== null &&
                    indexSel.Cours.length > 0 &&
                    indexSel.Cours.map((element, index) => {
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
