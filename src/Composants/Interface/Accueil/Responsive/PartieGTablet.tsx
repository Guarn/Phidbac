import * as React from "react";
import styled from "styled-components";

const Phi = styled.span`
    color: orange;
    font-family: "Century Gothic";
`;

const TexteTitre = styled.div`
    width: 100%;
    font-size: 5vw;
    padding-left: 80px;
`;

const TexteContenu = styled.p`
    padding-left: 80px;
`;
const TexteContenuFooter = styled.p`
    text-align: justify;
    position: relative;
    padding-left: 80px;
`;

const PartieGTablet = () => {
    return (
        <>
            <div>
                <TexteTitre>
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>!
                </TexteTitre>
                <TexteContenu>
                    « <Phi>φ</Phi> », c’est la lettre grecque phi, <br />
                    <Phi>bac</Phi>
                    , c’est le bac. <br />
                    <Phi>φ</Phi>d<Phi>'</Phi>
                    bac
                    <Phi>'</Phi>! c’est la philosophie du bac.
                </TexteContenu>
            </div>

            <div>
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
            </div>
        </>
    );
};
export default PartieGTablet;
