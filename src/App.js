import React, { useState, useEffect, Suspense, useReducer } from "react";
import "./App.css";
import styled from "styled-components";
import ico from "./Assets/ICONE-PHI.jpg";
import { useCookies } from "react-cookie";
import Login from "./Composants/Interface/Login/Login";
import { userReducer } from "./Composants/Interface/reducers";
import Axios from "./Composants/Fonctionnels/Axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import {
    Modal,
    Input,
    Dropdown,
    Menu,
    Icon,
    Divider,
    Popover,
    Form
} from "antd";

import Accueil from "./Composants/Interface/Accueil/Accueil";
import Sujets from "./Composants/Interface/Sujets";

//SECTION STYLED-COMPONENTS

const ConteneurGlobal = styled.div`
    height: 100%;
    width: 100%;
    color: #5e5e5e;
    display: flex;
    flex-direction: column;
    font-family: century-gothic, sans-serif;
    font-display: optional;
`;

const ConteneurHeader = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 2;
`;

const ConteneurLiensPage = styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    align-content: center;
    user-select: none;
    font-weight: bold;
    cursor: pointer;
`;

const BoutonHome = styled.div`
    height: 80px;
    width: 80px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const BoutonPage = styled.div`
    margin-right: 60px;
    font-size: 16px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    &:hover {
        color: orange;
    }
`;

const ConteneurContenu = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const ConteneurFooter = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
    z-index: 2;
`;

const Cercle = styled.div`
    position: absolute;
    top: ${(props) => props.animate.Top};
    left: ${(props) => props.animate.Left};
    width: 100%;
    height: 200%;
    background-color: #e9e7e1;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50% /50%;
    z-index: 1;
`;

const initialUser = { connecte: false };

//!SECTION

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [user, setUser] = useReducer(userReducer, initialUser);
    const [redActive, setRedActive] = useState(false);

    const [page, setPage] = useState("");
    const [coordsCercle, setCoordsCercle] = useState({
        Top: "-10%",
        Left: "-40%"
    });

    let changementPage = (UrlPage) => {
        switch (UrlPage) {
            case "/":
                setCoordsCercle({
                    Top: "-10%",
                    Left: "-40%"
                });
                break;
            case "/Sujets":
                setCoordsCercle({
                    Top: "-60%",
                    Left: "50%"
                });
                break;
            default:
                break;
        }
        setPage(UrlPage);
        setRedActive(true);
    };

    const menu = (
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
                    setUser({ type: "REMOVE" });
                    removeCookie("token");
                }}
            >
                Se déconnecter
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        if (cookies["token"] && !user.connecte) {
            Axios.get("/p")
                .then((rep) => {
                    setUser({ type: "UPDATE", user: rep.data });
                })
                .catch((err) => {
                    console.log(err);
                    //removeCookie("token");
                });
        }
    }, [user.connecte]);

    return (
        <Router>
            <ConteneurGlobal>
                <Cercle animate={coordsCercle} />

                <ConteneurHeader>
                    {redActive && <Redirect push to={page} />}
                    <BoutonHome onClick={() => changementPage("/")}>
                        <img
                            height="50"
                            width="50"
                            src={ico}
                            alt="Bouton Home"
                        />
                    </BoutonHome>
                    <ConteneurLiensPage>
                        <BoutonPage style={{ color: "rgba(0,0,0,0.3" }}>
                            Programmes / Epreuves
                        </BoutonPage>
                        <BoutonPage onClick={() => changementPage("/Sujets")}>
                            Sujets
                        </BoutonPage>
                        <BoutonPage style={{ color: "rgba(0,0,0,0.3" }}>
                            Cours
                        </BoutonPage>
                        <BoutonPage style={{ color: "rgba(0,0,0,0.3" }}>
                            Exercices
                        </BoutonPage>
                        <BoutonPage>
                            {user.connecte && (
                                <Dropdown overlay={menu}>
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
                                            setUser={(val) => setUser(val)}
                                        />
                                    }
                                    trigger="click"
                                >
                                    <span>Se connecter</span>
                                </Popover>
                            )}
                        </BoutonPage>
                    </ConteneurLiensPage>
                </ConteneurHeader>
                <Switch>
                    <ConteneurContenu>
                        <Suspense fallback={<div>Chargement...</div>}>
                            <Route exact path="/" component={Accueil} />
                            <Route path="/Sujets" component={Sujets} />
                        </Suspense>
                    </ConteneurContenu>
                </Switch>

                <ConteneurFooter>Copyright 2019</ConteneurFooter>
            </ConteneurGlobal>
        </Router>
    );
};

const Identification = Form.create({ name: "login" })(Login);

export default App;
