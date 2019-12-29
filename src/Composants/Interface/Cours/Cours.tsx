import * as React from "react";
import styled from "styled-components";
import { Timeline, Icon } from "antd";
import "./Cours.css";
import { userContext } from "../../../App";

const Conteneur = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 100px;
`;

const ConteneurCours = styled.div`
    display: flex;
    position: relative;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    margin-left: 30px;
`;

const Details = styled.div`
    position: absolute;
    font-size: 20px;
    text-align: right;
    width: 200px;
    left: -240px;
`;

const TitreEtape = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const DescriptionEtape = styled.div`
    font-size: 16px;
    text-align: justify;
`;

interface DotProps {
    color?: string;
}

const Dot = styled.div<DotProps>`
    height: 24px;
    width: 24px;
    border: 2px solid #707070;
    border-radius: 50%;
    background-color: ${(props) => (props.color ? props.color : "salmon")};
    box-sizing: border-box;
    margin-top: 8px;
`;

const Cours = () => {
    const [user, userDispatch] = React.useContext(userContext);
    return (
        <Conteneur>
            {user.connecte && (
                <Timeline>
                    <Timeline.Item
                        dot={
                            <Icon
                                type="check-circle"
                                theme="twoTone"
                                twoToneColor="#85E27B"
                                style={{ fontSize: "25px" }}
                            />
                        }
                    >
                        <ConteneurCours>
                            <Description>
                                <TitreEtape>
                                    Etudier un programme de notions
                                </TitreEtape>
                                <DescriptionEtape>
                                    Les leçons ne traitent pas les notions une
                                    par une, dans des chapitres séparés (un
                                    chapitre = une notion, jusqu'à épuisement…),
                                    comme le font certains sites, certains
                                    manuels, parfois certains cours.
                                </DescriptionEtape>
                            </Description>

                            <Details>Terminé le 21/12</Details>
                        </ConteneurCours>
                    </Timeline.Item>
                    <Timeline.Item dot={<Dot color="lightblue" />}>
                        <ConteneurCours>
                            <Description>
                                <TitreEtape>
                                    Etudier un programme de notions
                                </TitreEtape>
                                <DescriptionEtape>
                                    Les leçons ne traitent pas les notions une
                                    par une, dans des chapitres séparés (un
                                    chapitre = une notion, jusqu'à épuisement…),
                                    comme le font certains sites, certains
                                    manuels, parfois certains cours.
                                </DescriptionEtape>
                            </Description>

                            <Details>En cours (19%)</Details>
                        </ConteneurCours>
                    </Timeline.Item>
                    <Timeline.Item dot={<Dot />}>
                        <ConteneurCours>
                            <Description>
                                <TitreEtape>
                                    Etudier un programme de notions
                                </TitreEtape>
                                <DescriptionEtape>
                                    Les leçons ne traitent pas les notions une
                                    par une, dans des chapitres séparés (un
                                    chapitre = une notion, jusqu'à épuisement…),
                                    comme le font certains sites, certains
                                    manuels, parfois certains cours.
                                </DescriptionEtape>
                            </Description>

                            <Details>Semaine 22</Details>
                        </ConteneurCours>
                    </Timeline.Item>
                    <Timeline.Item dot={<Dot />}>
                        <ConteneurCours>
                            <Description>
                                <TitreEtape>
                                    Etudier un programme de notions
                                </TitreEtape>
                                <DescriptionEtape>
                                    Les leçons ne traitent pas les notions une
                                    par une, dans des chapitres séparés (un
                                    chapitre = une notion, jusqu'à épuisement…),
                                    comme le font certains sites, certains
                                    manuels, parfois certains cours.
                                </DescriptionEtape>
                            </Description>

                            <Details>Semaine 23</Details>
                        </ConteneurCours>
                    </Timeline.Item>
                </Timeline>
            )}
            {!user.connecte && (
                <div>Vous n'avez pas la permission de consulter cette page</div>
            )}
        </Conteneur>
    );
};
export default Cours;
