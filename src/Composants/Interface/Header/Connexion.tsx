import React, { useEffect, useReducer, useState } from "react";
import { Icon, Popover, Form, Modal } from "antd";
import Login from "./Login";
import { userReducer, userInit, Action } from "../reducers";
import Axios from "../../Fonctionnels/Axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Desktop, Tablet, Mobile } from "../../../responsive";

const LienCo = styled.div`
    color: #1890ff;
    cursor: pointer;
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
    userDispatch: (arg0: Action) => void;
}

const Lien = (props: Lien_PROPS) => {
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
                    href="http://admin.phidbac.fr"
                >
                    Administration
                </a>
            </LienCo>
            <LienCo
                onClick={() => {
                    props.removeCookie();
                    props.userDispatch({ type: "REMOVE" });
                }}
            >
                Se déconnecter
            </LienCo>
        </div>
    );
};

const Header = () => {
    const [user, userDispatch] = useReducer(userReducer, userInit);
    const [cookies, , removeCookie] = useCookies();
    const [connexionDisplay, setConnexionDisplay] = useState(false);

    useEffect(() => {
        if (Object.keys(cookies).length >= 1) {
            if (!user.connecte) {
                Axios.get("/p")
                    .then((rep) => {
                        userDispatch({ type: "UPDATE", user: rep.data });
                    })
                    .catch((err) => {
                        removeCookie("token", { domain: ".phidbac.fr" });
                        console.log(err.response);
                    });
            }
        }
    }, [user.connecte]);

    return (
        <>
            <Desktop>
                {user.connecte && (
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={
                            <Lien
                                removeCookie={() =>
                                    removeCookie("token", {
                                        domain: ".phidbac.fr"
                                    })
                                }
                                userDispatch={(val: Action) =>
                                    userDispatch(val)
                                }
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
            </Desktop>
            <Tablet>
                {user.connecte && (
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        content={
                            <Lien
                                removeCookie={() =>
                                    removeCookie("token", {
                                        domain: ".phidbac.fr"
                                    })
                                }
                                userDispatch={(val: Action) =>
                                    userDispatch(val)
                                }
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
                            <Lien
                                removeCookie={() =>
                                    removeCookie("token", {
                                        domain: ".phidbac.fr"
                                    })
                                }
                                userDispatch={(val: Action) =>
                                    userDispatch(val)
                                }
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
