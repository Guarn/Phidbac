import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Connexion from "../Connexion";
import { Icon, Drawer } from "antd";

const BoutonMenu = styled.div`
    font-size: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    margin-bottom: 15px;
    margin-top: 16px;
    font-family: "century-gothic";
    &:hover {
        color: orange;
    }
`;

const BoutonPage = styled.div`
    font-size: 18px;
    margin-left: 5px;
    font-family: "Century Gothic";
    &:hover {
        color: orange;
    }
    margin-bottom: 10px;
`;

const Phi = styled.span`
    color: orange;
    font-family: "Century Gothic";
`;

const TexteTitre = styled.div`
    font-size: 30px;
    margin: 10px;
    margin-top: 0;
`;

const MenuMobile = () => {
    const [menu, setMenu] = React.useState(false);
    const history = useHistory();

    return (
        <>
            <Drawer
                placement="left"
                visible={menu}
                onClose={() => setMenu(false)}
                title="PHIDBAC"
            >
                <BoutonPage
                    onClick={() => {
                        setMenu(false);
                        history.push("/");
                    }}
                >
                    Accueil
                </BoutonPage>
                <BoutonPage
                    onClick={() => {
                        setMenu(false);
                        history.push(
                            "/Presentation-du-programme-et-des-epreuves"
                        );
                    }}
                >
                    Programmes / Epreuves
                </BoutonPage>
                <BoutonPage
                    onClick={() => {
                        setMenu(false);
                        history.push("/Annales-Bac-Sujets-Philosophie");
                    }}
                >
                    Sujets
                </BoutonPage>
                <BoutonPage
                    onClick={() => {
                        setMenu(false);
                        history.push("/Liste-des-cours");
                    }}
                >
                    Cours
                </BoutonPage>
                <BoutonPage
                    onClick={() => history.push("/Liste-des-exercices")}
                >
                    Exercices
                </BoutonPage>
                <BoutonPage
                    onClick={() => {
                        setMenu(false);
                        history.push("/Liste-des-index");
                    }}
                >
                    Index
                </BoutonPage>
                <BoutonPage>
                    <Connexion />
                </BoutonPage>
            </Drawer>
            <BoutonMenu onClick={() => setMenu(true)}>
                MENU
                <Icon style={{ marginLeft: "5px" }} type="menu" />
            </BoutonMenu>
            <TexteTitre>
                <Phi>φ</Phi>d<Phi>'</Phi>
                bac
                <Phi>'</Phi>!
            </TexteTitre>
        </>
    );
};
export default MenuMobile;
