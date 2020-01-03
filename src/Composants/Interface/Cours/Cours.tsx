import * as React from "react";
import styled from "styled-components";
import { Timeline, Icon, Tooltip, Button } from "antd";
import "./Cours.css";
import { userContext } from "../../../App";
import Axios from "../../Fonctionnels/Axios";
import { Transition } from "react-transition-group";
import Programme from "../Programme/Programme";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";

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

type progT = {
    progression: number;
    idUser: number;
    idCours: number;
    updatedAt: string;
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

const Progression: React.FC<any> = ({ tab, idCours }) => {
    let newTab = tab ? tab.filter((el: any) => el.idCours === idCours) : [];
    if (tab && idCours) {
        if (newTab.length === 0) {
            return <div>Non commencé</div>;
        } else {
            if (newTab[0].progression < 100 && newTab[0].progression > 0) {
                return (
                    <div>{"En cours (" + newTab[0].progression + " %)"}</div>
                );
            }
            if (newTab[0].progression === 100) {
                let newTab = tab.filter((el: any) => el.idCours === idCours);
                let date = newTab[0].updatedAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/");
                return <div>Terminé le {date}</div>;
            }
            return newTab[0].progression;
        }
    } else {
        return 0;
    }
};

const SelIcone: React.FC<any> = ({ tab, idCours }) => {
    let newTab = tab ? tab.filter((el: any) => el.idCours === idCours) : [];
    if (tab && idCours) {
        if (newTab.length === 0) {
            return <Dot color="salmon" />;
        } else {
            if (newTab[0].progression < 100 && newTab[0].progression > 0) {
                return <Dot color="lightblue" />;
            }
            if (newTab[0].progression === 100) {
                return (
                    <Icon
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#85E27B"
                        style={{ fontSize: "16px" }}
                    />
                );
            }
            return newTab[0].progression;
        }
    } else {
        return 0;
    }
};

const ProgressionGenerale: React.FC<any> = ({ tab, nbCours }) => {
    let newTab = tab ? tab.filter((el: any) => el.progression === 100) : [];
    return (
        <div>
            <span style={{ fontWeight: "bold" }}>
                {tab.length > 0
                    ? Math.round((100 / nbCours) * newTab.length) + "%"
                    : "0%"}
            </span>{" "}
            du programme terminés
        </div>
    );
};

const ProgressIcone: React.FC<any> = ({ tab, idCours, tt }) => {
    let newTab = tab ? tab.filter((el: any) => el.idCours === idCours) : [];
    if (tab && idCours) {
        if (newTab.length === 0) {
            return (
                <Tooltip placement="bottom" title={tt}>
                    <IcoProgress color="#FF8E9D" />
                </Tooltip>
            );
        } else {
            if (newTab[0].progression < 100 && newTab[0].progression > 0) {
                return (
                    <Tooltip placement="bottom" title={tt}>
                        <IcoProgress color="#BFE4F5" />
                    </Tooltip>
                );
            }
            if (newTab[0].progression === 100) {
                return (
                    <Tooltip placement="bottom" title={tt}>
                        <IcoProgress color="#85E27B" />
                    </Tooltip>
                );
            }
            return newTab[0].progression;
        }
    } else {
        return 0;
    }
};

const Cours = () => {
    const [user, userDispatch] = React.useContext(userContext);
    const [state, setState] = React.useState<coursT[]>([]);
    const [progress, setProgress] = React.useState<progT[]>([]);
    const [lecture, setLecture] = React.useState(false);
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        if (state.length === 0 && progress.length === 0) {
            Axios.get("/Cours").then((rep) => setState(rep.data));
        }
        Axios.get(`/progression`).then((rep) => {
            setProgress(rep.data);
        });
    }, [lecture]);

    return (
        <Conteneur>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Phidbac : Liste des cours</title>
                <link rel="canonical" href="http://phidbac.fr" />
            </Helmet>
            {lecture && user.connecte && (
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
                                    top: "-10px",
                                    left: "110px",
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
            {!lecture && user.connecte && (
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
                            <ProgressionGenerale
                                tab={progress}
                                nbCours={state.length}
                            />
                            <ConteneurIcoProgress>
                                {state.map((element, index) => {
                                    return (
                                        <ProgressIcone
                                            key={`Icone - ${index}`}
                                            tab={progress}
                                            idCours={state[index].id}
                                            tt={element.Titre}
                                        />
                                    );
                                })}
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
                                                <SelIcone
                                                    tab={progress}
                                                    idCours={state[index].id}
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
                                                    <Progression
                                                        tab={progress}
                                                        idCours={
                                                            state[index].id
                                                        }
                                                    />
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
