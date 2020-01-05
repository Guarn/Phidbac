import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, Events, scrollSpy } from "react-scroll";

const Conteneur = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 50px;
    font-size: 14px;
`;

const Titre = styled.h2`
    text-align: center;
    cursor: arrow;
`;

const El0 = styled.div`
    margin-left: 0px;
    &:hover {
        font-weight: bold;
    }
`;

const El1 = styled.div`
    margin-left: 15px;
    &:hover {
        font-weight: bold;
    }
`;

const El2 = styled.div`
    margin-left: 30px;
    &:hover {
        font-weight: bold;
    }
`;

const El3 = styled.div`
    margin-left: 45px;
    &:hover {
        font-weight: bold;
    }
`;
const El4 = styled.div`
    margin-left: 60px;
    &:hover {
        font-weight: bold;
    }
`;

type GlobalLinkT = {
    index: Number;
};

const GlobalLink: React.FC<GlobalLinkT> = ({ index, children }) => {
    return (
        <Link
            activeClass="active"
            to={`element-${index}`}
            spy={true}
            smooth={true}
            duration={350}
            containerId="ScrollConteneur"
        >
            {children}
        </Link>
    );
};

/**
 * Génération de la table des matières d'un cours. Cette valeur est stockée lors
 * de la création d'un cours et intégrée à la valeur SlateJs.
 * @param cours Définition d'un cours avec Titre, description et valeur SlateJs
 */
const TableMatiere: React.FC<any> = ({ cours }) => {
    useEffect(() => {
        Events.scrollEvent.register("begin", function() {});

        Events.scrollEvent.register("end", function() {});

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove("begin");
            Events.scrollEvent.remove("end");
        };
    });
    return (
        <Conteneur>
            {cours.Contenu.map((element: any, index: Number) => {
                if (element.TableMatiere.actif) {
                    switch (element.TableMatiere.type) {
                        case "titre":
                            return (
                                <GlobalLink
                                    key={`TABMAT-${index}`}
                                    index={index}
                                >
                                    <Titre>{element.TableMatiere.value}</Titre>
                                </GlobalLink>
                            );
                        case "1":
                            return (
                                <GlobalLink
                                    key={`TABMAT-${index}`}
                                    index={index}
                                >
                                    <El1>{element.TableMatiere.value}</El1>
                                </GlobalLink>
                            );
                        case "2":
                            return (
                                <GlobalLink
                                    key={`TABMAT-${index}`}
                                    index={index}
                                >
                                    <El2 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El2>
                                </GlobalLink>
                            );
                        case "3":
                            return (
                                <GlobalLink
                                    key={`TABMAT-${index}`}
                                    index={index}
                                >
                                    <El3 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El3>
                                </GlobalLink>
                            );
                        case "4":
                            return (
                                <GlobalLink
                                    key={`TABMAT-${index}`}
                                    index={index}
                                >
                                    <El4 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El4>
                                </GlobalLink>
                            );

                        default:
                            return (
                                <GlobalLink
                                    key={`TABMAT-${index}`}
                                    index={index}
                                >
                                    <El0 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El0>
                                </GlobalLink>
                            );
                    }
                }
                return null;
            })}
        </Conteneur>
    );
};
export default TableMatiere;
