import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Divider, Select, Radio, Slider, Button, Icon } from "antd";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./Sujets.css";
import ReactQuill from "react-quill";

const { Option } = Select;
const ax = axios.create({
    baseURL: "http://192.168.0.85:4000/",
    responseType: "json"
});

//SECTION STYLED-COMPONENTS

const Conteneur = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;
const PartieG = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const PartieD = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
`;
const ConteneurFiltres = styled.div`
    width: 300px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 20px;
    background-color: #e2e0d8;
    z-index: 2;
`;

const ConteneurSuivPrec = styled.div`
    margin-left: calc(50% - 225px);
    display: flex;
    z-index: 2;
    margin-bottom: 20px;
`;
const ConteneurSujet = styled.div`
    z-index: 2;
    height: 75%;
    width: 75%;
    margin-left: 12.5%;
    overflow: auto;
`;

const NombreSujets = styled.div`
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Carre = styled.div`
    position: absolute;
    top: -20%;
    left: -83%;
    height: 200%;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.16);
`;

// ANCHOR Aff. Sujet !EDIT

const Sujet = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.16);
    background-color: #eeeeee;
    margin-top: 5px;
`;
const TitreNotions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Titre = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    padding: 5px 10px;
    font-style: italic;

    z-index: 1;
`;

const Notions = styled.div`
    color: black;
    font-family: "Century Gothic";
    font-style: italic;
    margin-top: 5px;
    margin-right: 5px;
`;

const CorpsSujet = styled.div``;
const Details = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    align-items: flex-start;
`;
const PartieGauche = styled.div`
    display: flex;
`;
const Etiquette = styled.div`
    text-align: center;
    margin: auto;
    margin-right: 10px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-top: none;
    border-radius: 0 0 5px 5px;
    background-color: #eeeeee;
`;

//!SECTION

const Sujets = (props) => {
    //SECTION STATE

    const [filtres, setFiltres] = useState(false);
    const [idSujet, setIdSujet] = useState(1);
    const [nbResultats, setNbResultats] = useState();
    const [loading, setLoading] = useState(true);
    const [sujets, setSujets] = useState([]);
    const [state, setState] = useState();
    const [menu, setMenu] = useState([]);
    const RefNotions = useRef(null);
    const RefSeries = useRef(null);
    const RefDestinations = useRef(null);
    const RefAuteurs = useRef(null);
    const RefSessions = useRef(null);
    const RefAnnees = useRef(null);
    const [elementsCoches, setElementsCoches] = useState({
        notions: [],
        series: [],
        annees: [
            1996,
            1997,
            1998,
            1999,
            2000,
            2001,
            2002,
            2003,
            2004,
            2005,
            2006,
            2007,
            2008,
            2009,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019
        ],
        destinations: [],
        auteurs: [],
        sessions: ["NORMALE", "REMPLACEMENT", "SECOURS", "NONDEFINI"],
        recherche: "",
        typeRecherche: "tousLesMots"
    });

    //!SECTION

    //SECTION FONCTIONS

    //NOTE : Gestion des boutons suivants/précédent
    const SwitchSujet = (val) => {
        setLoading(true);

        if (filtres) {
            if (val === "+") {
                if (idSujet === nbResultats - 1) {
                    setState(sujets[0]);
                    setIdSujet(0);
                } else {
                    setState(sujets[idSujet + 1]);
                    setIdSujet(idSujet + 1);
                }
            }
            if (val === "-") {
                if (idSujet === 0) {
                    setState(sujets[nbResultats - 1]);
                    setIdSujet(nbResultats - 1);
                } else {
                    setState(sujets[idSujet - 1]);
                    setIdSujet(idSujet - 1);
                }
            }
        } else {
            if (val === "+") {
                if (idSujet === nbResultats) {
                    setIdSujet(1);
                } else {
                    setIdSujet(idSujet + 1);
                }
            }
            if (val === "-") {
                if (idSujet === 1) {
                    setIdSujet(nbResultats);
                } else {
                    setIdSujet(idSujet - 1);
                }
            }
        }
        return null;
    };

    //NOTE Recherche par filtres avec récupération données sur base

    const RechercheFiltres = () => {
        ax.post("/resultatsAdmin", { elementsCoches }).then((rep) => {
            if (rep.data.count > 0) {
                setSujets(rep.data.rows);
                setNbResultats(rep.data.count);
                setState(rep.data.rows[0]);
                setFiltres(true);
                setIdSujet(0);
            } else {
                setSujets({});
                setNbResultats(0);
                setFiltres(true);
            }
        });
    };

    //NOTE Gestion cas particuuliers dans certains filtres

    const changeFiltres = (e, cat) => {
        if (cat === "annees") {
            let tabAnnees = [];
            for (let i = e[0]; i <= e[1]; i++) {
                tabAnnees.push(i);
            }
            let state = { ...elementsCoches, [cat]: tabAnnees };
            setElementsCoches(state);
        } else if (cat === "sessions") {
            let state = { ...elementsCoches, [cat]: [e] };
            setElementsCoches(state);
        } else {
            let state = { ...elementsCoches, [cat]: e };
            setElementsCoches(state);
        }
    };

    //!SECTION

    //SECTION USEEFFECT

    useEffect(() => {
        // ANCHOR Premier affichage ou filtres0
        if (sujets.length === 0) {
            ax.get(`/sujets/${idSujet}`).then((rep) => {
                if (
                    rep.data.Count > 0 &&
                    idSujet <= rep.data.Count &&
                    idSujet >= 1
                ) {
                    let state1 = rep.data.Sujet;
                    setSujets(state1);
                    setNbResultats(rep.data.Count);
                    setState(rep.data.Sujet);

                    setLoading(false);
                } else {
                    setNbResultats(0);
                }
            });
        } else {
            // ANCHOR Si Resultats > 0
            if (nbResultats > 0 && !filtres) {
                ax.get(`/sujets/${idSujet}`).then((rep) => {
                    if (
                        rep.data.Count > 0 &&
                        idSujet <= rep.data.Count &&
                        idSujet >= 1
                    ) {
                        let state1 = rep.data.Sujet;
                        setSujets(state1);
                        setNbResultats(rep.data.Count);
                        setState(rep.data.Sujet);

                        setLoading(false);
                    } else {
                        setNbResultats(0);
                    }
                });
            }
        }
        if (!menu.annees) {
            ax.get("/menu").then((rep) => {
                let state = rep.data;
                state.annees.sort((a, b) => a["Annee"] - b["Annee"]);
                state.auteurs.sort((a, b) =>
                    a["Auteur"].localeCompare(b["Auteur"])
                );
                state.destinations.sort((a, b) =>
                    a["Destination"].localeCompare(b["Destination"])
                );
                state.notions.sort((a, b) =>
                    a["Notion"].localeCompare(b["Notion"])
                );
                setMenu(state);
            });
        }
    }, [idSujet]);

    //!SECTION

    return (
        <Conteneur>
            <Carre />
            <PartieG>
                {
                    //SECTION FILTRES
                }
                <ConteneurFiltres>
                    <Divider>Notions</Divider>
                    <Select
                        ref={RefNotions}
                        mode="multiple"
                        style={{ width: "100%" }}
                        defaultValue={elementsCoches.Notions1}
                        placeholder="Toutes les notions"
                        onChange={(e) => changeFiltres(e, "notions")}
                    >
                        {menu.notions &&
                            menu.notions.map((el, index) => {
                                return (
                                    <Option key={el["Notion"]}>
                                        {el["Notion"]}
                                    </Option>
                                );
                            })}
                    </Select>

                    <Divider>Séries</Divider>
                    <Select
                        ref={RefSeries}
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Toutes les séries"
                        onChange={(e) => changeFiltres(e, "series")}
                    >
                        {menu.series &&
                            menu.series.map((el, index) => {
                                return (
                                    <Option key={el["Serie"]}>
                                        {el["Serie"]}
                                    </Option>
                                );
                            })}
                    </Select>
                    <Divider>Destinations</Divider>
                    <Select
                        ref={RefDestinations}
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Toutes les destinations"
                        onChange={(e) => changeFiltres(e, "destinations")}
                    >
                        {menu.destinations &&
                            menu.destinations.map((el, index) => {
                                return (
                                    <Option key={el["Destination"]}>
                                        {el["Destination"]}
                                    </Option>
                                );
                            })}
                    </Select>
                    <Divider>Auteurs</Divider>
                    <Select
                        ref={RefAuteurs}
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Tous les auteurs"
                        onChange={(e) => changeFiltres(e, "auteurs")}
                    >
                        {menu.auteurs &&
                            menu.auteurs.map((el) => {
                                return (
                                    <Option key={el["Auteur"]}>
                                        {el["Auteur"] +
                                            " (" +
                                            el["NbSujets"] +
                                            ")"}
                                    </Option>
                                );
                            })}
                    </Select>
                    <Divider>Sessions</Divider>
                    <Radio.Group
                        ref={RefSessions}
                        size="small"
                        defaultValue="TOUTES"
                        onChange={(e) =>
                            changeFiltres(e.target.value, "sessions")
                        }
                    >
                        <Radio.Button value="TOUTES">Toutes</Radio.Button>
                        <Radio.Button value="NORMALE">Norm.</Radio.Button>
                        <Radio.Button value="REMPLACEMENT">Rempl.</Radio.Button>
                        <Radio.Button value="SECOURS">Secours</Radio.Button>
                    </Radio.Group>
                    <Divider>Années</Divider>
                    <Slider
                        ref={RefAnnees}
                        range
                        marks={{
                            [elementsCoches
                                .annees[0]]: elementsCoches.annees[0].toString(),
                            [elementsCoches.annees[
                                elementsCoches.annees.length - 1
                            ]]: [
                                elementsCoches.annees[
                                    elementsCoches.annees.length - 1
                                ]
                            ].toString()
                        }}
                        max={2019}
                        min={1996}
                        tooltipVisible={false}
                        step={1}
                        defaultValue={[1996, 2019]}
                        onChange={(val) => changeFiltres(val, "annees")}
                    />

                    <Divider style={{ marginTop: "40px" }} />
                    <Button
                        onClick={() => {
                            RefNotions.current.rcSelect.state.value = [];
                            RefAuteurs.current.rcSelect.state.value = [];
                            RefSeries.current.rcSelect.state.value = [];
                            RefDestinations.current.rcSelect.state.value = [];
                            RefSessions.current.state.value = "TOUTES";
                            RefAnnees.current.rcSlider.state.bounds = [
                                1996,
                                2019
                            ];
                            setFiltres(false);
                            setIdSujet(1);
                            setSujets([]);

                            setElementsCoches({
                                notions: [],
                                series: [],
                                annees: [
                                    1996,
                                    1997,
                                    1998,
                                    1999,
                                    2000,
                                    2001,
                                    2002,
                                    2003,
                                    2004,
                                    2005,
                                    2006,
                                    2007,
                                    2008,
                                    2009,
                                    2010,
                                    2011,
                                    2012,
                                    2013,
                                    2014,
                                    2015,
                                    2016,
                                    2017,
                                    2018,
                                    2019
                                ],
                                destinations: [],
                                auteurs: [],
                                sessions: [
                                    "NORMALE",
                                    "REMPLACEMENT",
                                    "SECOURS",
                                    "NONDEFINI"
                                ],
                                recherche: "",
                                typeRecherche: "tousLesMots"
                            });
                        }}
                        size="small"
                        style={{
                            marginBottom: "10px",
                            backgroundColor: "#e2e0d8",
                            borderColor: "#919191"
                        }}
                        block
                    >
                        Réinitialiser les filtres
                        <Icon type="reload" />
                    </Button>
                    <Button
                        size="large"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            borderColor: "rgba(0,0,0,0.3)"
                        }}
                        block
                        onClick={() => RechercheFiltres()}
                    >
                        <Icon type="search" />
                        Recherche
                    </Button>
                </ConteneurFiltres>
                {
                    //!SECTION
                }
            </PartieG>
            <PartieD>
                {
                    //SECTION Sujet
                }
                <ConteneurSuivPrec>
                    <Button
                        style={{
                            width: "150px",
                            backgroundColor: "#e2e0d8",
                            borderColor: "#919191"
                        }}
                        onClick={() => SwitchSujet("-")}
                    >
                        Sujet précédent
                    </Button>
                    <NombreSujets>{`${
                        filtres ? (nbResultats > 0 ? idSujet + 1 : 0) : idSujet
                    } / ${nbResultats}`}</NombreSujets>
                    <Button
                        style={{
                            width: "150px",
                            backgroundColor: "#e2e0d8",
                            borderColor: "#919191"
                        }}
                        onClick={() => SwitchSujet("+")}
                    >
                        Sujet suivant
                    </Button>
                </ConteneurSuivPrec>
                {nbResultats > 0 && (
                    <ConteneurSujet>
                        <Sujet>
                            <TitreNotions>
                                <Titre>1</Titre>
                                <Notions>
                                    {state ? state.Notions1.join(" ") : ""}
                                </Notions>
                            </TitreNotions>
                            <ReactQuill
                                value={state ? state.Sujet1 : ""}
                                modules={{ toolbar: false }}
                                readOnly
                                theme="bubble"
                            />
                        </Sujet>
                        <Sujet>
                            <TitreNotions>
                                <Titre>2</Titre>
                                <Notions>
                                    {state ? state.Notions2.join(" ") : ""}
                                </Notions>
                            </TitreNotions>
                            <CorpsSujet>
                                <ReactQuill
                                    value={state ? state.Sujet2 : ""}
                                    modules={{ toolbar: false }}
                                    readOnly
                                    theme="bubble"
                                />
                            </CorpsSujet>
                        </Sujet>
                        <Sujet>
                            <TitreNotions>
                                <Titre>3</Titre>
                                <Notions>
                                    {state ? state.Notions3.join(" ") : ""}
                                </Notions>
                            </TitreNotions>
                            <CorpsSujet>
                                <ReactQuill
                                    value={state ? state.Sujet3 : ""}
                                    modules={{ toolbar: false }}
                                    readOnly
                                    theme="bubble"
                                />
                            </CorpsSujet>
                        </Sujet>
                        <Details>
                            <PartieGauche>
                                <Etiquette>{state ? state.id : ""}</Etiquette>
                                <Etiquette>
                                    {state ? state.Annee : ""}
                                </Etiquette>
                                <Etiquette>
                                    {state ? state.Serie : ""}
                                </Etiquette>
                                <Etiquette>
                                    {state ? state.Destination.join(" / ") : ""}
                                </Etiquette>
                                <Etiquette>
                                    {state ? state.Session : ""}
                                </Etiquette>
                                <Etiquette>{state ? state.Code : ""}</Etiquette>
                            </PartieGauche>
                        </Details>
                    </ConteneurSujet>
                )}
                {nbResultats === 0 && (
                    <div
                        style={{
                            height: "75%",
                            textAlign: "center",
                            zIndex: 3
                        }}
                    >
                        Aucun résultat ne correspond à ces critères.
                    </div>
                )}
                {
                    //!SECTION
                }
            </PartieD>
        </Conteneur>
    );
};

export default Sujets;
