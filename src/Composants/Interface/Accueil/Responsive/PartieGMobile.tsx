import * as React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../../Assets/LOG.svg";

const Phi = styled.span`
    color: orange;
    font-family: "Century Gothic";
`;

const TexteContenu = styled.p`
    padding-left: 20px;
    padding-right: 20px;
    text-align: justify;
`;
const TexteContenuFooter = styled.p`
    text-align: justify;
    padding-right: 20px;
    padding-left: 20px;
`;

const PartieGMobile = () => {
    return (
        <>
            <div style={{ overflow: "auto" }}>
                <Logo
                    width="60%"
                    style={{
                        marginLeft: "20%",
                        marginTop: "30px",
                        marginBottom: "20px"
                    }}
                />
                <TexteContenu>
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>! propose de A à Z une préparation à l’épreuve
                    de philosophie du nouveau bac (juin 2021).
                </TexteContenu>
                <TexteContenuFooter>
                    La présentation du programme et des épreuves, ainsi que la
                    base de sujets de bac sont en libre consultation. En
                    revanche, vous devez vous identifier pour accéder aux autres
                    ressources : leçons, exercices, étude d’œuvres, index.
                </TexteContenuFooter>
                <TexteContenu>
                    <Phi>φ'</Phi> vous souhaite un bon travail, couronné de
                    succès !
                </TexteContenu>
                <TexteContenuFooter style={{ textAlign: "right" }}>
                    Copyright 2019
                </TexteContenuFooter>
            </div>
        </>
    );
};
export default PartieGMobile;
