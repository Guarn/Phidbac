import React, { useState, useEffect, useRef, Suspense } from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import ico from "./Assets/ICONE-PHI.jpg";
import { withCookies } from "react-cookie";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { Modal, Input, Dropdown, Menu, Icon, Divider } from "antd";

import Accueil from "./Composants/Interface/Accueil";
import Sujets from "./Composants/Interface/Sujets";

//SECTION STYLED-COMPONENTS

const ConteneurGlobal = styled.div`
    height: 100%;
    width: 100%;
    color: #5e5e5e;
    display: flex;
    flex-direction: column;
    font-family: century-gothic, sans-serif;
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
    transition: all 0.5s linear;
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

//!SECTION

const App = (props) => {
    const ax = axios.create({
        baseURL: "http://phidbac.fr:4000/",
        headers: { Authorization: props.cookies.get("token") },
        responseType: "json"
    });
    const [connecte, setConnecte] = useState(false);
    const [user, setUser] = useState("");
    const [redActive, setRedActive] = useState(false);
    const [formIdent, setFormIdent] = useState("");
    const refNom = useRef(null);
    const refPass = useRef(null);
    const [formPass, setFormPass] = useState("");
    const [page, setPage] = useState("");
    const [identMod, setIdentMod] = useState(false);
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

    const identification = () => {
        if (formIdent !== "" && formPass !== "") {
            ax.post("/login", { email: formIdent, password: formPass })
                .then((rep) => {
                    props.cookies.set("token", "Bearer " + rep.data.token, {
                        path: "/"
                    });
                    setIdentMod(false);
                })
                .catch((err) => console.log(err));
            setFormIdent("");
            setFormPass("");
            refNom.current.value = "";
        }
    };

    const menu = (
        <Menu style={{ marginLeft: "-25px" }}>
            <Menu.Item>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.phidbac.fr:3001"
                >
                    Administration
                </a>
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    setConnecte(false);
                    props.cookies.remove("token", {
                        path: "/"
                    });
                }}
            >
                Se déconnecter
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        if (props.cookies.get("token") && !connecte) {
            ax.get("/p").then((rep) => {
                setUser(rep.data);
                setConnecte(true);
            });
        }
    }, [connecte, identMod]);

    return (
        <Router>
            <ConteneurGlobal>
                <Cercle animate={coordsCercle} />
                <Modal
                    title="Identification"
                    centered
                    visible={identMod}
                    onCancel={() => setIdentMod(false)}
                    okText="Se connecter"
                    cancelText="Annuler"
                    onOk={() => identification()}
                >
                    <Input
                        ref={refNom}
                        style={{ marginBottom: "10px" }}
                        autoFocus
                        placeholder="Identifiant"
                        onPressEnter={() => refPass.current.focus()}
                        onChange={(e) => setFormIdent(e.target.value)}
                    />
                    <Input.Password
                        ref={refPass}
                        placeholder="Mot de passe"
                        onChange={(e) => setFormPass(e.target.value)}
                        onPressEnter={() => identification()}
                    />
                </Modal>
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
                        <BoutonPage
                            onClick={() => {
                                if (!connecte) setIdentMod(true);
                            }}
                        >
                            {connecte && (
                                <Dropdown overlay={menu}>
                                    <span style={{ color: "orange" }}>
                                        {user.prenom + " " + user.nom}
                                        <Icon type="down" />
                                    </span>
                                </Dropdown>
                            )}
                            {!connecte && <span>Se connecter</span>}
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

export default withCookies(App);
