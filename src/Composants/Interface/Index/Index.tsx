import * as React from "react";
import styled from "styled-components";
import "./Index.css";
import Axios from "../../Fonctionnels/Axios";
import { Popover } from "antd";
import Slate from "../../Fonctionnels/Slate";

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

const Index = () => {
    const [state, setState] = React.useState([]);
    const [indexSel, setIndexSel] = React.useState<stateProps>({
        Cours: [],
        id: 0
    });
    const [id, setId] = React.useState(50);

    React.useEffect(() => {
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
    });
    return (
        <Conteneur>
            <ConteneurLettres>
                <LettresG>
                    <Lettre>A</Lettre>
                    <Lettre>C</Lettre>
                    <Lettre>E</Lettre>
                    <Lettre>G</Lettre>
                    <Lettre>I</Lettre>
                    <Lettre>K</Lettre>
                    <Lettre>M</Lettre>
                    <Lettre>O</Lettre>
                    <Lettre>Q</Lettre>
                    <Lettre>S</Lettre>
                    <Lettre>U</Lettre>
                    <Lettre>W</Lettre>
                    <Lettre>Y</Lettre>
                </LettresG>
                <LettresD>
                    <Lettre>B</Lettre>
                    <Lettre>D</Lettre>
                    <Lettre>F</Lettre>
                    <Lettre>H</Lettre>
                    <Lettre>J</Lettre>
                    <Lettre>L</Lettre>
                    <Lettre>N</Lettre>
                    <Lettre>P</Lettre>
                    <Lettre>R</Lettre>
                    <Lettre>T</Lettre>
                    <Lettre>V</Lettre>
                    <Lettre>X</Lettre>
                    <Lettre>Z</Lettre>
                </LettresD>
            </ConteneurLettres>
            <ConteneurListe>
                <Lettre2>A</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "A")
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
                <Lettre2>B</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "B")
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
                <Lettre2>C</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "C")
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
                <Lettre2>D</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "D")
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
                <Lettre2>E</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "E")
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
                <Lettre2>F</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "F")
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
                <Lettre2>G</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "G")
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
                <Lettre2>H</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "H")
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
                <Lettre2>I</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "I")
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
                <Lettre2>J</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "J")
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
                <Lettre2>K</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "K")
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
                <Lettre2>L</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "L")
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
                <Lettre2>M</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "M")
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
                <Lettre2>N</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "N")
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
                <Lettre2>O</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "O")
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
                <Lettre2>P</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "P")
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
                <Lettre2>Q</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "Q")
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
                <Lettre2>R</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "R")
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
                <Lettre2>S</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "S")
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
                <Lettre2>T</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "T")
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
                <Lettre2>U</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "U")
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
                <Lettre2>V</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "V")
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
                <Lettre2>W</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "W")
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
                <Lettre2>X</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "X")
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
                <Lettre2>Y</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "Y")
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
                <Lettre2>Z</Lettre2>
                {state.length > 0 && (
                    <BlocLettre>
                        {state
                            .filter((el) => el.lettre === "Z")
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
                {indexSel.Cours.length > 0 &&
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
