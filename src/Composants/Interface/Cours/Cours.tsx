import * as React from "react";
import styled from "styled-components";
import { Timeline, Icon, Tooltip, Button } from "antd";
import "./Cours.css";
import { userContext } from "../../../App";
import Axios from "../../Fonctionnels/Axios";
import { Transition } from "react-transition-group";
import Programme from "../Programme/Programme";

const Conteneur = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ConteneurCours = styled.div`
    display: flex;
    position: relative;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
        color: orange;
    }
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    margin-left: 30px;
`;

const Details = styled.div`
    position: absolute;
    font-size: 16px;
    text-align: right;
    width: 200px;
    left: -240px;
`;

const TitreEtape = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const DescriptionEtape = styled.div`
    font-size: 16px;
    text-align: justify;
`;

interface DotProps {
    color?: string;
}

const ConteneurProgression = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Dot = styled.div<DotProps>`
    height: 16px;
    width: 16px;
    border: 2px solid #707070;
    border-radius: 50%;
    background-color: ${(props) => (props.color ? props.color : "salmon")};
    box-sizing: border-box;
    margin-top: 8px;
`;

const ConteneurIcoProgress = styled.div`
    display: flex;
`;

const IcoProgress = styled.div`
    background-color: ${(props) => props.color};
    height: 24px;
    width: 24px;
    border: 1px solid #707070;
    margin-right: 5px;
    border-radius: 2px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;

const ConteneurTimeline = styled.div`
    overflow: auto;
    padding-right: 50px;
    padding-left: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    margin-top: 20px;
`;

type coursT = {
    id: number;
    Titre: string;
    Description: string;
    Contenu: any;
    type: "Cours" | "PageUnique" | "Index";
    position: number;
};

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

const Cours = () => {
    const [user, userDispatch] = React.useContext(userContext);
    const [state, setState] = React.useState<coursT[]>([]);
    const [lecture, setLecture] = React.useState(false);
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        Axios.get("/Cours").then((rep) => setState(rep.data));
    }, []);
    return (
        <Conteneur>
            {lecture && (
                <div
                    style={{
                        position: "relative",
                        top: "0px",
                        left: "0px",
                        height: "100%"
                    }}
                >
                    <Transition
                        appear
                        enter
                        mountOnEnter
                        unmountOnExit
                        in={true}
                        timeout={{ appear: 200, enter: 0, exit: 200 }}
                    >
                        {(state3) => (
                            <Button
                                type="ghost"
                                icon="arrow-left"
                                onMouseDown={() => setLecture(false)}
                                style={{
                                    position: "absolute",
                                    top: "0px",
                                    ...defaultStyle,
                                    ...transitionStyles[state3]
                                }}
                            >
                                Revenir à la liste de cours
                            </Button>
                        )}
                    </Transition>
                    <Programme id={id} />
                </div>
            )}
            {!lecture && (
                <Transition
                    appear
                    enter
                    mountOnEnter
                    unmountOnExit
                    in={true}
                    timeout={{ appear: 200, enter: 0, exit: 200 }}
                >
                    {(state3) => (
                        <ConteneurProgression
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state3]
                            }}
                        >
                            <div>
                                <span style={{ fontWeight: "bold" }}>17%</span>{" "}
                                du programme terminés
                            </div>
                            <ConteneurIcoProgress>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#85E27B" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#85E27B" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#BFE4F5" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                                <Tooltip placement="bottom" title="Semaine 21">
                                    <IcoProgress color="#FF8E9D" />
                                </Tooltip>
                            </ConteneurIcoProgress>
                        </ConteneurProgression>
                    )}
                </Transition>
            )}
            {user.connecte && !lecture && (
                <ConteneurTimeline>
                    <Timeline>
                        {state.map((element, index) => {
                            return (
                                <Transition
                                    key={`Cours-${index}`}
                                    appear
                                    enter
                                    mountOnEnter
                                    unmountOnExit
                                    in={true}
                                    timeout={{
                                        appear: 200 * index,
                                        enter: 0,
                                        exit: 200
                                    }}
                                >
                                    {(state3) => (
                                        <Timeline.Item
                                            style={{
                                                ...defaultStyle,
                                                ...transitionStyles[state3]
                                            }}
                                            dot={
                                                <Icon
                                                    type="check-circle"
                                                    theme="twoTone"
                                                    twoToneColor="#85E27B"
                                                    style={{ fontSize: "16px" }}
                                                />
                                            }
                                        >
                                            <ConteneurCours
                                                onMouseDown={() => {
                                                    setId(element.id);
                                                    setLecture(true);
                                                }}
                                            >
                                                <Description>
                                                    <TitreEtape>
                                                        {element.Titre}
                                                    </TitreEtape>
                                                    <DescriptionEtape>
                                                        {element.Description}
                                                    </DescriptionEtape>
                                                </Description>

                                                <Details>
                                                    Terminé le 21/12
                                                </Details>
                                            </ConteneurCours>
                                        </Timeline.Item>
                                    )}
                                </Transition>
                            );
                        })}
                    </Timeline>
                </ConteneurTimeline>
            )}
            {!user.connecte && (
                <Transition
                    appear
                    enter
                    mountOnEnter
                    unmountOnExit
                    in={true}
                    timeout={{
                        appear: 200,
                        enter: 200,
                        exit: 200
                    }}
                >
                    {(state3) => (
                        <div
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state3]
                            }}
                        >
                            Vous n'avez pas la permission de consulter cette
                            page
                        </div>
                    )}
                </Transition>
            )}
        </Conteneur>
    );
};
export default Cours;
