import React, { useEffect, useReducer } from "react";
import { Menu, Icon, Popover, Form } from "antd";
import Login from "./Composants/Interface/Login/Login";
import { userReducer, userInit } from "./Composants/Interface/reducers";
import Axios from "./Composants/Fonctionnels/Axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";

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

const Lien = (props) => {
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
            {user.connecte && (
                <Popover
                    trigger="click"
                    placement="bottomRight"
                    content={
                        <Lien
                            removeCookie={() =>
                                removeCookie("token", { domain: ".phidbac.fr" })
                            }
                            userDispatch={(val) => userDispatch(val)}
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
                            userDispatch={(val) => userDispatch(val)}
                        />
                    }
                    trigger="click"
                >
                    <span>Se connecter</span>
                </Popover>
            )}
        </>
    );
};

const Identification = Form.create({ name: "login" })(Login);

export default Header;
