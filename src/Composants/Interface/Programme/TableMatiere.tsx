import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Events, scrollSpy } from "react-scroll";

const Conteneur = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 50px;
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
    margin-left: 8px;
`;

const El2 = styled.div`
    margin-left: 16px;
`;

const El3 = styled.div`
    margin-left: 24px;
`;

const TableMatiere = (props: any) => {
    const [state] = useState(props.state);

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
            {state.Cours.map((element: any, index: number) => {
                if (element.TableMatiere.actif) {
                    switch (element.TableMatiere.type) {
                        case "titre":
                            return (
                                <Link
                                    key={`TABMAT-${index}`}
                                    activeClass="active"
                                    to={`element-${index}`}
                                    spy={true}
                                    smooth={true}
                                    duration={350}
                                    containerId="ScrollConteneur"
                                >
                                    <Titre>{element.TableMatiere.value}</Titre>
                                </Link>
                            );
                        case "1":
                            return (
                                <Link
                                    key={`TABMAT-${index}`}
                                    activeClass="active"
                                    to={`element-${index}`}
                                    spy={true}
                                    smooth={true}
                                    duration={350}
                                    containerId="ScrollConteneur"
                                >
                                    <El1>{element.TableMatiere.value}</El1>
                                </Link>
                            );
                        case "2":
                            return (
                                <Link
                                    key={`TABMAT-${index}`}
                                    activeClass="active"
                                    to={`element-${index}`}
                                    spy={true}
                                    smooth={true}
                                    duration={350}
                                    containerId="ScrollConteneur"
                                >
                                    <El2 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El2>
                                </Link>
                            );
                        case "3":
                            return (
                                <Link
                                    key={`TABMAT-${index}`}
                                    activeClass="active"
                                    to={`element-${index}`}
                                    spy={true}
                                    smooth={true}
                                    duration={350}
                                    containerId="ScrollConteneur"
                                >
                                    <El3 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El3>
                                </Link>
                            );

                        default:
                            return (
                                <Link
                                    key={`TABMAT-${index}`}
                                    activeClass="active"
                                    to={`element-${index}`}
                                    spy={true}
                                    smooth={true}
                                    duration={350}
                                    containerId="ScrollConteneur"
                                >
                                    <El0 key={`TABMAT-${index}`}>
                                        {element.TableMatiere.value}
                                    </El0>
                                </Link>
                            );
                    }
                }
                return null;
            })}
        </Conteneur>
    );
};
export default TableMatiere;
