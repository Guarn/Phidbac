import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
    Divider,
    Select,
    Radio,
    Slider,
    Button,
    Icon,
    Tabs,
    Input
} from "antd";
import "react-quill/dist/quill.snow.css";
import "../Sujets.css";
import ReactQuill from "react-quill";
import Axios from "../../../Fonctionnels/Axios";
import { SliderValue } from "antd/lib/slider";
import { Transition } from "react-transition-group";

const { Option } = Select;

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
    margin-top: 20px;
    width: 100%;
    z-index: 20;
`;
const ConteneurFiltres = styled.div`
    position: relative;
    width: 320px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 20px;
    padding-top: 5px;
    background-color: #e2e0d8;
    z-index: 200;
`;

const ConteneurSuivPrec = styled.div`
    margin-left: calc(50% - 225px);
    display: flex;
    z-index: 2;
    margin-bottom: 20px;
`;
const ConteneurSujet = styled.div`
    height: 90%;
    width: 75%;
    margin-left: 12.5%;
    overflow: auto;
    padding-right: 10px;
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

const Cercle = styled.div`
    position: fixed;
    top: -70%;
    left: 40%;
    width: 100%;
    height: 200%;
    background-color: #e9e7e1;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50% /50%;
    z-index: 1;
    overflow: hidden;
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

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
};

//!SECTION

const initialState = {
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
    typeRecherche: "exacte"
};

export interface SujetI {
    id: number;
    Num: number;
    Serie: string;
    Destination: string[];
    Session: string;
    Code: string;
    Sujet1: string;
    Notion1: string[];
    Sujet2: string;
    Notion2: string[];
    Sujet3: string;
    Notion3: string[];
    Auteur: string;
    Problemes: boolean;
    Annee: number;
    Sujet1Naked: string;
    Sujet2Naked: string;
    Sujet3Naked: string;
}

export interface MenuI {
    annees: { Annee: number; Menu: boolean }[];
    auteurs: { Auteur: string; Menu: boolean; NbSujets: number }[];
    destinations: { Destination: string; Menu: boolean }[];
    notions: { Notion: string }[];
    series: { Serie: string; Menu: boolean }[];
    sessions: { Session: string; Menu: boolean }[];
}

export type filtreI =
    | { e: [number, number] | SliderValue; cat: "annees" }
    | {
          e: string | ["NORMALE", "REMPLACEMENT", "SECOURS", "NONDEFINI"];
          cat: "sessions";
      }
    | { e: string[]; cat: "destinations" | "auteurs" | "series" | "notions" };

export interface ElementsCochesI {
    notions: string[];
    series: string[];
    annees: number[];
    destinations: string[];
    auteurs: string[];
    sessions: string[];
    recherche: string;
    typeRecherche: string;
}

const Sujets = () => {
    //SECTION STATE
    const [ine, setIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filtres, setFiltres] = useState(false);
    const [idSujet, setIdSujet] = useState(1);
    const [nbResultats, setNbResultats] = useState();
    const [sujets, setSujets] = useState<SujetI[]>([]);
    const [state, setState] = useState();
    const [menu, setMenu] = useState<MenuI | null>();
    const RefNotions: any = useRef(null);
    const RefSeries: any = useRef(null);
    const RefDestinations: any = useRef(null);
    const RefAuteurs: any = useRef(null);
    const RefSessions: any = useRef(null);
    const RefAnnees: any = useRef(null);
    const refQuill1: any = useRef(null);
    const refQuill2: any = useRef(null);
    const refQuill3: any = useRef(null);
    const [elementsCoches, setElementsCoches] = useState<ElementsCochesI>(
        initialState
    );

    //!SECTION

    //SECTION FONCTIONS

    //NOTE : Gestion des boutons suivants/précédent
    const SwitchSujet = (val: "+" | "-") => {
        if (filtres) {
            if (val === "+") {
                if (idSujet === nbResultats - 1) {
                    setState(sujets[0]);
                    setIdSujet(0);
                } else {
                    setState(sujets[idSujet + 1]);
                    setIdSujet(idSujet + 1);
                    setLoading(false);
                }
            }
            if (val === "-") {
                if (idSujet === 0) {
                    setState(sujets[nbResultats - 1]);
                    setIdSujet(nbResultats - 1);
                } else {
                    setState(sujets[idSujet - 1]);
                    setIdSujet(idSujet - 1);
                    setLoading(false);
                }
            }
        } else {
            if (val === "+") {
                if (idSujet === nbResultats) {
                    setIdSujet(1);
                    setLoading(false);
                } else {
                    setIdSujet(idSujet + 1);
                    setLoading(false);
                }
            }
            if (val === "-") {
                if (idSujet === 1) {
                    setIdSujet(nbResultats);
                    setLoading(false);
                } else {
                    setIdSujet(idSujet - 1);
                    setLoading(false);
                }
            }
        }
        return null;
    };

    //NOTE Recherche par filtres avec récupération données sur base

    const RechercheFiltres = () => {
        Axios.post("/resultatsAdmin", { elementsCoches }).then((rep) => {
            if (rep.data.count > 0) {
                setSujets(rep.data.rows);
                setNbResultats(rep.data.count);
                setState(rep.data.rows[0]);
                setFiltres(true);
                setIdSujet(0);
                setLoading(false);
            } else {
                setSujets([]);
                setNbResultats(0);
                setFiltres(true);
                setLoading(false);
            }
        });
    };
    const RechercheFiltres2 = () => {
        Axios.post(`/resultats/1`, { elementsCoches }).then((rep) => {
            if (rep.data.Count > 0) {
                setSujets(rep.data.Rows);
                setNbResultats(rep.data.Count);
                setState(rep.data.Rows[0]);
                setFiltres(true);
                setIdSujet(0);
                setLoading(false);
            } else {
                setSujets([]);
                setNbResultats(0);
                setFiltres(true);
                setLoading(false);
            }
        });
    };

    //NOTE Gestion cas particuuliers dans certains filtres

    /**
     * Change Le conteneur de filtres
     *@param  e
     */
    const changeFiltres = ({ e, cat }: filtreI) => {
        if (Array.isArray(e) && typeof e[0] === "number" && cat === "annees") {
            let tabAnnees = [];
            for (let i = e[0]; i <= e[1]; i++) {
                tabAnnees.push(i);
            }
            let state = { ...elementsCoches, [cat]: tabAnnees };
            setElementsCoches(state);
        } else if (typeof e === "string" && cat === "sessions") {
            let state = { ...elementsCoches, sessions: [e] };
            setElementsCoches(state);
        } else {
            let state = { ...elementsCoches, [cat]: e };
            setElementsCoches(state);
        }
    };

    function typeRecherche(val: any) {
        switch (val.target.value) {
            case 1:
                setElementsCoches({
                    ...elementsCoches,
                    typeRecherche: "exacte"
                });
                break;
            case 2:
                setElementsCoches({
                    ...elementsCoches,
                    typeRecherche: "tousLesMots"
                });
                break;
            case 3:
                setElementsCoches({
                    ...elementsCoches,
                    typeRecherche: "unDesMots"
                });
                break;
            default:
                throw new Error();
        }
    }

    //!SECTION

    //SECTION USEEFFECT

    useEffect(() => {
        if (!ine) setIn(true);

        // ANCHOR Premier affichage ou filtres0
        if (sujets.length === 0) {
            Axios.get(`/sujets/t/${idSujet}`).then((rep) => {
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
                Axios.get(`/sujets/t/${idSujet}`).then((rep) => {
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
        if (
            elementsCoches.recherche !== "" &&
            elementsCoches.typeRecherche === "exacte" &&
            sujets.length > 0
        ) {
            let editor1 = refQuill1.current.getEditor();
            let unst1 = refQuill1.current.makeUnprivilegedEditor(editor1);
            let editor2 = refQuill2.current.getEditor();
            let unst2 = refQuill2.current.makeUnprivilegedEditor(editor2);
            let editor3 = refQuill3.current.getEditor();
            let unst3 = refQuill3.current.makeUnprivilegedEditor(editor3);
            let temp1: any = sujets[idSujet].Sujet1Naked;
            let temp2: any = sujets[idSujet].Sujet2Naked;
            let temp3: any = sujets[idSujet].Sujet3Naked;
            let longueur;
            let index;
            let nleChaine;

            let texte = elementsCoches.recherche;
            let reg = new RegExp(texte, "gi");
            let regex = reg,
                result,
                indices = [];
            while ((result = regex.exec(unst1.getText()))) {
                editor1.formatText(
                    result.index,
                    texte.length,
                    "background-color",
                    "yellow"
                );
            }
            while ((result = regex.exec(unst2.getText()))) {
                editor2.formatText(
                    result.index,
                    texte.length,
                    "background-color",
                    "yellow"
                );
            }
            while ((result = regex.exec(unst3.getText()))) {
                editor3.formatText(
                    result.index,
                    texte.length,
                    "background-color",
                    "yellow"
                );
            }
            if (indices.length > 0) {
                if (texte !== "") {
                    let resultat = state.match(reg);
                    if (resultat && resultat[0].length > 0) {
                        longueur = resultat["0"].length;
                        index = resultat["index"];
                        nleChaine =
                            '><span style="background-color:yellow;"' +
                            resultat[0] +
                            "</span>";
                    }
                }
            }
        }
        if (
            elementsCoches.recherche !== "" &&
            (elementsCoches.typeRecherche === "tousLesMots" ||
                elementsCoches.typeRecherche === "unDesMots") &&
            sujets.length > 0
        ) {
            let editor1 = refQuill1.current.getEditor();
            let unst1 = refQuill1.current.makeUnprivilegedEditor(editor1);
            let editor2 = refQuill2.current.getEditor();
            let unst2 = refQuill2.current.makeUnprivilegedEditor(editor2);
            let editor3 = refQuill3.current.getEditor();
            let unst3 = refQuill3.current.makeUnprivilegedEditor(editor3);
            let temp1: any = sujets[idSujet].Sujet1Naked;
            let temp2: any = sujets[idSujet].Sujet2Naked;
            let temp3: any = sujets[idSujet].Sujet3Naked;
            let longueur;
            let index;
            let nleChaine;

            let texte = elementsCoches.recherche.split(" ");
            let reg;
            let regex = reg,
                result,
                indices = [];
            texte.map((el, index) => {
                reg = new RegExp(texte[index], "gi");
                while ((result = reg.exec(unst1.getText()))) {
                    editor1.formatText(
                        result.index,
                        texte[index].length,
                        "background-color",
                        "yellow"
                    );
                }
                while ((result = reg.exec(unst2.getText()))) {
                    editor2.formatText(
                        result.index,
                        texte[index].length,
                        "background-color",
                        "yellow"
                    );
                }
                while ((result = reg.exec(unst3.getText()))) {
                    editor3.formatText(
                        result.index,
                        texte[index].length,
                        "background-color",
                        "yellow"
                    );
                }
                if (indices.length > 0) {
                    if (texte.length > 0) {
                        let resultat = state.match(reg);
                        if (resultat && resultat[0].length > 0) {
                            longueur = resultat[`${index}`].length;
                            index = resultat["index"];
                            nleChaine =
                                '><span style="background-color:yellow;"' +
                                resultat[0] +
                                "</span>";
                        }
                    }
                }
                return null;
            });
        }
        if (!menu) {
            Axios.get("/menu").then((rep) => {
                let state: MenuI = rep.data;
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
    const duration = 200;
    const duration2 = 200;

    const defaultStyle = {
        transition: `all ${duration}ms `,
        opacity: 0,
        transform: "translate3d(0px,-50px,0)"
    };

    const transitionStyles: any = {
        entering: { opacity: 0, transform: "translate3d(0px,-50px,0)" },
        entered: { opacity: 1, transform: "translate3d(0px,0px,0)" }
    };
    const defaultStyle2 = {
        transition: `all ${duration2}ms `,
        opacity: 0
    };

    const transitionStyles2: any = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 1 },
        exited: { opacity: 0 }
    };

    return (
        <Conteneur>
            <Carre />
            <Cercle />
            <PartieG>
                {
                    //SECTION FILTRES
                }

                <Transition
                    appear
                    enter
                    mountOnEnter
                    in={true}
                    timeout={{
                        appear: 50,
                        enter: 200
                    }}
                >
                    {(state) => (
                        <div
                            style={{
                                position: "relative",
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <ConteneurFiltres>
                                <Tabs
                                    size="small"
                                    defaultActiveKey="1"
                                    onChange={() => {
                                        setFiltres(false);
                                        setIdSujet(1);
                                        setSujets([]);

                                        setElementsCoches(initialState);
                                    }}
                                >
                                    <Tabs.TabPane
                                        tab={
                                            <span>
                                                <Icon type="filter" />
                                                FILTRES
                                            </span>
                                        }
                                        key="1"
                                    >
                                        <Divider
                                            style={{
                                                marginBottom: "5px",
                                                marginTop: "0"
                                            }}
                                        >
                                            Notions
                                        </Divider>
                                        <Select
                                            ref={RefNotions}
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            defaultValue={
                                                elementsCoches.notions
                                            }
                                            placeholder="Toutes les notions"
                                            onChange={(e: string[]) =>
                                                changeFiltres({
                                                    e,
                                                    cat: "notions"
                                                })
                                            }
                                        >
                                            {menu &&
                                                menu!.notions &&
                                                menu!.notions.map(
                                                    (el, index) => {
                                                        return (
                                                            <Option
                                                                key={
                                                                    el["Notion"]
                                                                }
                                                            >
                                                                {el["Notion"]}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                        <Divider
                                            style={{ marginBottom: "5px" }}
                                        >
                                            Séries
                                        </Divider>
                                        <Select
                                            ref={RefSeries}
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            placeholder="Toutes les séries"
                                            onChange={(e: string[]) =>
                                                changeFiltres({
                                                    e,
                                                    cat: "series"
                                                })
                                            }
                                        >
                                            {menu &&
                                                menu!.series &&
                                                menu!.series.map(
                                                    (el, index) => {
                                                        return (
                                                            <Option
                                                                key={
                                                                    el["Serie"]
                                                                }
                                                            >
                                                                {el["Serie"]}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                        <Divider
                                            style={{ marginBottom: "5px" }}
                                        >
                                            Destinations
                                        </Divider>
                                        <Select
                                            ref={RefDestinations}
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            placeholder="Toutes les destinations"
                                            onChange={(e: string[]) =>
                                                changeFiltres({
                                                    e,
                                                    cat: "destinations"
                                                })
                                            }
                                        >
                                            {menu &&
                                                menu!.destinations &&
                                                menu!.destinations.map(
                                                    (el, index) => {
                                                        return (
                                                            <Option
                                                                key={
                                                                    el[
                                                                        "Destination"
                                                                    ]
                                                                }
                                                            >
                                                                {
                                                                    el[
                                                                        "Destination"
                                                                    ]
                                                                }
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                        <Divider
                                            style={{ marginBottom: "5px" }}
                                        >
                                            Auteurs
                                        </Divider>
                                        <Select
                                            ref={RefAuteurs}
                                            mode="multiple"
                                            style={{ width: "100%" }}
                                            placeholder="Tous les auteurs"
                                            onChange={(e: string[]) =>
                                                changeFiltres({
                                                    e,
                                                    cat: "auteurs"
                                                })
                                            }
                                        >
                                            {menu &&
                                                menu!.auteurs &&
                                                menu!.auteurs.map((el) => {
                                                    return (
                                                        <Option
                                                            key={el["Auteur"]}
                                                        >
                                                            {el["Auteur"] +
                                                                " (" +
                                                                el["NbSujets"] +
                                                                ")"}
                                                        </Option>
                                                    );
                                                })}
                                        </Select>
                                        <Divider
                                            style={{ marginBottom: "5px" }}
                                        >
                                            Sessions
                                        </Divider>
                                        <Radio.Group
                                            ref={RefSessions}
                                            size="small"
                                            defaultValue="TOUTES"
                                            onChange={(e) => {
                                                changeFiltres({
                                                    e: e.target.value,
                                                    cat: "sessions"
                                                });
                                            }}
                                        >
                                            <Radio.Button value="TOUTES">
                                                Toutes
                                            </Radio.Button>
                                            <Radio.Button value="NORMALE">
                                                Norm.
                                            </Radio.Button>
                                            <Radio.Button value="REMPLACEMENT">
                                                Rempl.
                                            </Radio.Button>
                                            <Radio.Button value="SECOURS">
                                                Secours
                                            </Radio.Button>
                                        </Radio.Group>
                                        <Divider
                                            style={{ marginBottom: "5px" }}
                                        >
                                            Années
                                        </Divider>
                                        <Slider
                                            ref={RefAnnees}
                                            range
                                            style={{
                                                marginLeft: "6%",
                                                marginRight: "6%"
                                            }}
                                            marks={{
                                                [elementsCoches
                                                    .annees[0]]: elementsCoches.annees[0].toString(),
                                                [elementsCoches.annees[
                                                    elementsCoches.annees
                                                        .length - 1
                                                ]]: [
                                                    elementsCoches.annees[
                                                        elementsCoches.annees
                                                            .length - 1
                                                    ]
                                                ].toString()
                                            }}
                                            max={2019}
                                            min={1996}
                                            tooltipVisible={false}
                                            step={1}
                                            defaultValue={[1996, 2019]}
                                            onChange={(
                                                e:
                                                    | [number, number]
                                                    | SliderValue
                                            ) =>
                                                changeFiltres({
                                                    e,
                                                    cat: "annees"
                                                })
                                            }
                                        />
                                        <Divider
                                            style={{ marginTop: "40px" }}
                                        />
                                        <Button
                                            onClick={() => {
                                                RefNotions.current.rcSelect!.state.value = [];
                                                RefAuteurs.current.rcSelect.state.value = [];
                                                RefSeries.current.rcSelect.state.value = [];
                                                RefDestinations.current.rcSelect.state.value = [];
                                                RefSessions.current.state.value =
                                                    "TOUTES";
                                                RefAnnees.current.rcSlider.state.bounds = [
                                                    1996,
                                                    2019
                                                ];
                                                setFiltres(false);
                                                setIdSujet(1);
                                                setSujets([]);

                                                setElementsCoches(initialState);
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
                                                backgroundColor:
                                                    "rgba(255,255,255,0.1)",
                                                borderColor: "rgba(0,0,0,0.3)"
                                            }}
                                            block
                                            onClick={() => RechercheFiltres()}
                                        >
                                            <Icon type="search" />
                                            Recherche
                                        </Button>
                                    </Tabs.TabPane>
                                    {
                                        // NOTE FILTRES EXPRESSION
                                    }
                                    <Tabs.TabPane
                                        tab={
                                            <span>
                                                <Icon type="search" />
                                                EXPRESSION
                                            </span>
                                        }
                                        key="2"
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Recherche :
                                        </div>
                                        <Input
                                            style={{
                                                backgroundColor:
                                                    "rgba(255,255,255,0.1)",
                                                borderColor: "rgba(0,0,0,0.3)",
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}
                                            placeholder="un ou plusieurs mots, expression"
                                            onChange={(val) =>
                                                setElementsCoches({
                                                    ...elementsCoches,
                                                    recherche: val.target.value
                                                })
                                            }
                                        ></Input>
                                        <Radio.Group
                                            defaultValue={1}
                                            onChange={(val) =>
                                                typeRecherche(val)
                                            }
                                        >
                                            <Radio style={radioStyle} value={1}>
                                                Expression exacte
                                                <Icon
                                                    type="question-circle"
                                                    style={{
                                                        color: "grey",
                                                        marginLeft: "5px"
                                                    }}
                                                />
                                            </Radio>
                                            <Radio style={radioStyle} value={2}>
                                                Tous les mots
                                                <Icon
                                                    type="question-circle"
                                                    style={{
                                                        color: "grey",
                                                        marginLeft: "5px"
                                                    }}
                                                />
                                            </Radio>
                                            <Radio style={radioStyle} value={3}>
                                                Un des mots
                                                <Icon
                                                    type="question-circle"
                                                    style={{
                                                        color: "grey",
                                                        marginLeft: "5px"
                                                    }}
                                                />
                                            </Radio>
                                        </Radio.Group>
                                        <Divider
                                            style={{ marginTop: "40px" }}
                                        />
                                        <Button
                                            onClick={() => {
                                                RefNotions.current.rcSelect!.state.value = [];
                                                RefAuteurs.current.rcSelect.state.value = [];
                                                RefSeries.current.rcSelect.state.value = [];
                                                RefDestinations.current.rcSelect.state.value = [];
                                                RefSessions.current.state.value =
                                                    "TOUTES";
                                                RefAnnees.current.rcSlider.state.bounds = [
                                                    1996,
                                                    2019
                                                ];
                                                setFiltres(false);
                                                setIdSujet(1);
                                                setSujets([]);

                                                setElementsCoches(initialState);
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
                                                backgroundColor:
                                                    "rgba(255,255,255,0.1)",
                                                borderColor: "rgba(0,0,0,0.3)"
                                            }}
                                            block
                                            onClick={() => RechercheFiltres2()}
                                        >
                                            <Icon type="search" />
                                            Recherche
                                        </Button>
                                    </Tabs.TabPane>
                                </Tabs>
                            </ConteneurFiltres>
                        </div>
                    )}
                </Transition>
                {
                    //!SECTION
                }
            </PartieG>
            <PartieD>
                {
                    //SECTION Sujet
                }
                <Transition in={ine} timeout={duration2} appear enter>
                    {(state2) => (
                        <ConteneurSuivPrec
                            style={{
                                ...defaultStyle2,
                                ...transitionStyles2[state2]
                            }}
                        >
                            <Button
                                style={{
                                    width: "150px",
                                    backgroundColor: "#e2e0d8",
                                    borderColor: "#919191"
                                }}
                                onClick={() => {
                                    SwitchSujet("-");
                                }}
                            >
                                Sujet précédent
                            </Button>
                            <NombreSujets>{`${
                                filtres
                                    ? nbResultats > 0
                                        ? idSujet + 1
                                        : 0
                                    : idSujet
                            } / ${nbResultats}`}</NombreSujets>
                            <Button
                                style={{
                                    width: "150px",
                                    backgroundColor: "#e2e0d8",
                                    borderColor: "#919191"
                                }}
                                onClick={() => {
                                    SwitchSujet("+");
                                }}
                            >
                                Sujet suivant
                            </Button>
                        </ConteneurSuivPrec>
                    )}
                </Transition>

                {nbResultats > 0 && state && (
                    <Transition
                        in={!loading}
                        timeout={{
                            appear: 200,
                            enter: 50,
                            exit: 200
                        }}
                        appear
                        enter
                        mountOnEnter
                        unmountOnExit
                    >
                        {(state2) => (
                            <div
                                style={{
                                    height: "100%",
                                    ...defaultStyle2,
                                    ...transitionStyles2[state2]
                                }}
                            >
                                <AffichageSujet state={state} />
                            </div>
                        )}
                    </Transition>
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

const AffichageSujet: React.FC<any> = (props) => {
    const { state } = props;
    const refQuill1: any = useRef(null);
    const refQuill2: any = useRef(null);
    const refQuill3: any = useRef(null);

    return (
        <ConteneurSujet {...props.style}>
            <Sujet>
                <TitreNotions>
                    <Titre>1</Titre>
                    <Notions>{state ? state.Notions1.join(" ") : ""}</Notions>
                </TitreNotions>
                <ReactQuill
                    ref={refQuill1}
                    value={state ? state.Sujet1 : ""}
                    modules={{ toolbar: false }}
                    readOnly
                    theme="bubble"
                />
            </Sujet>
            <Sujet>
                <TitreNotions>
                    <Titre>2</Titre>
                    <Notions>{state ? state.Notions2.join(" ") : ""}</Notions>
                </TitreNotions>
                <CorpsSujet>
                    <ReactQuill
                        ref={refQuill2}
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
                    <Notions>{state ? state.Notions3.join(" ") : ""}</Notions>
                </TitreNotions>
                <CorpsSujet>
                    <ReactQuill
                        ref={refQuill3}
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
                    <Etiquette>{state ? state.Annee : ""}</Etiquette>
                    <Etiquette>{state ? state.Serie : ""}</Etiquette>
                    <Etiquette>
                        {state ? state.Destination.join(" / ") : ""}
                    </Etiquette>
                    <Etiquette>{state ? state.Session : ""}</Etiquette>
                    <Etiquette>{state ? state.Code : ""}</Etiquette>
                </PartieGauche>
            </Details>
        </ConteneurSujet>
    );
};

export default Sujets;
