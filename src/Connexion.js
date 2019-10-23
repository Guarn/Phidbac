import React, { useEffect, useReducer } from "react";
import { Dropdown, Menu, Icon, Popover, Form } from "antd";
import Login from "./Composants/Interface/Login/Login";
import { userReducer, userInit } from "./Composants/Interface/reducers";
import Axios from "./Composants/Fonctionnels/Axios";
import { useCookies } from "react-cookie";

const Lien = (props) => {
    return (
        <Menu style={{ marginLeft: "-25px" }}>
            <Menu.Item>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://admin.phidbac.fr"
                >
                    Administration
                </a>
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    props.userDispatch({ type: "REMOVE" });
                    props.removeCookie();
                }}
            >
                Se déconnecter
            </Menu.Item>
        </Menu>
    );
};

const Header = () => {
    const [user, userDispatch] = useReducer(userReducer, userInit);
    const [cookies, , removeCookie] = useCookies();

    useEffect(() => {
        console.log("UE Connex");
        if (Object.keys(cookies).length >= 1) {
            console.log("OBJECT KEYS");
            if (!user.connecte) {
                console.log("USER PAS CONNECTE");
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
                <Dropdown
                    overlay={
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
                </Dropdown>
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
