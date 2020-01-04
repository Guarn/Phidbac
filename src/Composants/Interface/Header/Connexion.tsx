import React, { useEffect, useState, useContext } from "react";
import { Icon, Popover, Form, Modal } from "antd";
import Login from "./Login";
import Axios from "../../Fonctionnels/Axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Desktop, Tablet, Mobile } from "../../../responsive";
import { Transition } from "react-transition-group";
import { userContext } from "../../../App";
import { Action } from "../../../reducers";

const LienCo = styled.div`
    color: #1890ff;
    margin: 5px;
    padding: 5px;
    margin-left: -16px;
    padding-left: 16px;
    margin-right: -16px;
    padding-right: 16px;
    &:hover {
        background-color: rgba(0, 0, 255, 0.1);
    }
`;

export interface Lien_PROPS {
    removeCookie: () => void;
}

const Lien = (props: Lien_PROPS) => {
    const [, userDispatch] = useContext(userContext);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <LienCo>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://phidbac.fr:3001"
                >
                    Administration
                </a>
            </LienCo>
            <LienCo
                onClick={() => {
                    props.removeCookie();
                    userDispatch({ type: "REMOVE" });
                }}
            >
                Se déconnecter
            </LienCo>
        </div>
    );
};

const duration = 200;
const defaultStyle = {
    transition: `all ${duration}ms `,
    transform: "translate3d(0px,0px,0)"
};
const transitionStyles: any = {
    entering: { opacity: 0, transform: "translate3d(0px,-30px,0)" },
    entered: { opacity: 1, transform: "translate3d(0px,0px,0)" },
    exiting: { opacity: 0, transform: "translate3d(0px,-30px,0)" },
    exited: { opacity: 0, transform: "translate3d(0px,-30px,0)" }
};

const Header = () => {
    const [user, userDispatch] = useContext(userContext);
    const [cookies, , removeCookie] = useCookies();
    const [connexionDisplay, setConnexionDisplay] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (cookies.token) {
            if (!user.connecte) {
                Axios.get("/p")
                    .then((rep) => {
                        userDispatch({ type: "UPDATE", user: rep.data });
                    })
                    .catch((err) => {
                        removeCookie("token");
                        userDispatch({ type: "REMOVE" });
                    });
            }
        }
    });

    return (
        <>
            <Desktop>
                {user.connecte && (
                    <div
                        onMouseMove={() => setShowMenu(true)}
                        onMouseLeave={() => setShowMenu(false)}
                        style={{
                            color: "orange",
                            height: "80px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative"
                        }}
                    >
                        {user.prenom + " " + user.nom}
                        <Icon type="down" />
                        <Transition
                            appear
                            enter
                            mountOnEnter
                            unmountOnExit
                            in={showMenu}
                            timeout={{ appear: 200, enter: 50, exit: 200 }}
                        >
                            {(state) => (
                                <div
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state]
                                    }}
                                >
                                    <MenuConnecte
                                        user={user}
                                        userDispatch={(val: any) =>
                                            userDispatch(val)
                                        }
                                    />
                                </div>
                            )}
                        </Transition>
                    </div>
                )}
                {!user.connecte && (
                    <Popover
                        style={{ width: "100px" }}
                        placement="bottomRight"
                        content={
                            <Identification
                                userDispatch={(val: Action) =>
                                    userDispatch(val)
                                }
                            />
                        }
                        trigger="click"
                    >
                        <span>Se connecter</span>
                    </Popover>
                )}
            </Desktop>
            <Tablet>
                {user.connecte && (
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={
                            <Lien
                                removeCookie={() => removeCookie("token", {})}
                            />
                        }
                    >
                        <span style={{ color: "orange" }}>
                            {user.prenom + " " + user.nom}
                            <Icon type="down" />
                        </span>
                    </Popover>
                )}
                {!user.connecte && (
                    <Popover
                        style={{ width: "100px" }}
                        placement="bottomRight"
                        content={
                            <Identification
                                userDispatch={(val: Action) =>
                                    userDispatch(val)
                                }
                            />
                        }
                        trigger="click"
                    >
                        <span>Se connecter</span>
                    </Popover>
                )}
            </Tablet>
            <Mobile>
                {user.connecte && (
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={
                            <Lien removeCookie={() => removeCookie("token")} />
                        }
                    >
                        <span style={{ color: "orange" }}>
                            {user.prenom + " " + user.nom}
                            <Icon type="down" />
                        </span>
                    </Popover>
                )}
                {!user.connecte && (
                    <>
                        <span
                            onClick={() => {
                                setConnexionDisplay(true);
                            }}
                        >
                            Se connecter
                        </span>
                        <Modal
                            visible={connexionDisplay}
                            onCancel={() => setConnexionDisplay(false)}
                        >
                            <Identification
                                userDispatch={(val: Action) =>
                                    userDispatch(val)
                                }
                            />
                        </Modal>
                    </>
                )}
            </Mobile>
        </>
    );
};

export const Identification = Form.create<{
    userDispatch: (val: Action) => void;
    form: any;
}>({
    name: "login"
})(Login);

export default Header;

const ConteneurMenu = styled.div`
    position: absolute;
    right: 0px;
    top: 30px;
    width: 250px;
    background-color: #e9e7e1;
    border-radius: 5px;
    border: 1px solid rgba(112, 112, 112, 0.2);
    user-select: none;
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    align-items: center;
    cursor: default;
`;

const BlocAvatar = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #e2e0d8;
    border: 1px solid #707070;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #5e5e5e;
    font-size: 30px;
    font-weight: bold;
    margin-top: 10px;
`;
const BlocNomPrenom = styled.div`
    margin-top: 10px;
    font-size: 20px;
    color: #5e5e5e;
    font-weight: normal;
    line-height: 22px;
`;

const BlocGrade = styled.div`
    font-size: 16px;
    color: #5e5e5e;
    font-weight: normal;
    font-style: italic;
`;

const BlocIcones = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const IconeSimple = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #707070;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    color: #5e5e5e;
    font-weight: bold;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.2s;
    &:hover {
        transform: scale(1.2);
    }
`;

const BlocMessages = styled.div`
    display: flex;
    width: 100%;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

const Chiffre = styled.div`
    font-size: 16px;

    margin-left: 15px;
    width: 50px;
    text-align: left;
    color: #5e5e5e;
    font-weight: bold;
`;

const Texte = styled.div`
    font-weight: normal;
    font-size: 16px;
    color: #5e5e5e;
`;

const BlocDeco = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    background-color: #dbd9d5;
    color: #5e5e5e;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const MenuConnecte: React.FC<any> = ({ user, userDispatch }) => {
    const [, , removeCookie] = useCookies();
    return (
        <ConteneurMenu>
            <BlocAvatar>
                {user.prenom.charAt(0).toUpperCase() +
                    user.nom.charAt(0).toUpperCase()}
            </BlocAvatar>
            <BlocNomPrenom>{user.prenom + " " + user.nom}</BlocNomPrenom>
            <BlocGrade>{user.grade}</BlocGrade>
            <BlocIcones>
                <IconeSimple>
                    <Icon type="question" />
                </IconeSimple>
                <IconeSimple>
                    <Icon type="mail" />
                </IconeSimple>
                <IconeSimple
                    onMouseDown={() =>
                        window.open("https://phidbac.fr:3001", "_blank")
                    }
                >
                    <Icon type="setting" />
                </IconeSimple>
            </BlocIcones>
            <BlocMessages>
                <Chiffre>15</Chiffre>
                <Texte>Messages</Texte>
            </BlocMessages>
            <BlocMessages>
                <Chiffre>0</Chiffre>
                <Texte>Notifications</Texte>
            </BlocMessages>
            <BlocDeco
                onMouseDown={() => {
                    removeCookie("token");
                    userDispatch({ type: "REMOVE" });
                }}
            >
                Déconnexion
            </BlocDeco>
        </ConteneurMenu>
    );
};
