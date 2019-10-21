import React, { useEffect, useReducer } from "react";
import { Dropdown, Menu, Icon, Popover, Form } from "antd";
import Login from "./Composants/Interface/Login/Login";
import { userReducer, userInit } from "./Composants/Interface/reducers";
import Axios from "./Composants/Fonctionnels/Axios";
import { useCookies } from "react-cookie";

const Lien = (props) => {
    useEffect(() => {
        console.log("UUE LIEN");
    });
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
                    //removeCookie("token");
                }}
            >
                Se déconnecter
            </Menu.Item>
        </Menu>
    );
};

const Header = () => {
    const [user, userDispatch] = useReducer(userReducer, userInit);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        console.log("UE CONNEXION");
        console.log(user);
        console.log(cookies);
        if (Object.keys(cookies).length >= 1) {
            console.log("IF");
            if (user.connecte === false)
                Axios.get("/p")
                    .then((rep) => {
                        setCookie("token", "Bearer " + rep.data.token, {
                            path: "/",
                            domain: ".phidbac.fr"
                        });
                        userDispatch({ type: "UPDATE", user: rep.data });
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
        } else {
            console.log("SANS IF");
        }
    });

    return (
        <>
            {user.connecte && (
                <Dropdown
                    overlay={<Lien userDispatch={(val) => userDispatch(val)} />}
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
