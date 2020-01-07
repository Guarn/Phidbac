import styled from "styled-components";
import { Button } from "antd";

export const Conteneur = styled.div`
    display: flex;
    height: 100%;
    max-width: 1450px;
`;
export const PartieG = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const PartieD = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    max-height: 100%;
`;
export const ConteneurFiltres = styled.div`
    position: relative;
    width: 320px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 20px;
    padding-top: 5px;
    background-color: #e2e0d8;
    overflow: auto;
    z-index: 200;
    max-height: 80vh;
`;

export const ConteneurSuivPrec = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    flex-direction: column;
    z-index: 2;
    margin: 30px;
`;
export const ConteneurSujet = styled.div`
    max-height: 100%;
    max-width: 800px;
    flex: 4;
    overflow: auto;
    padding-right: 10px;
    user-select: text;
`;

export const NombreSujets = styled.div`
    width: 150px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
`;

export const Carre = styled.div`
    position: absolute;
    top: -20%;
    left: -83%;
    height: 200%;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.16);
`;

export const Cercle = styled.div`
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

export const Sujet = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.16);
    background-color: #eeeeee;
    margin-top: 15px;
    margin-left: 6px;
`;
export const TitreNotions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Titre = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    padding: 5px 10px;
    font-style: italic;

    z-index: 1;
`;

export const Notions = styled.div`
    color: black;
    font-family: "Century Gothic";
    font-style: italic;
    margin-top: 5px;
    margin-right: 5px;
`;

export const CorpsSujet = styled.div``;
export const Details = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    align-items: flex-start;
`;
export const PartieGauche = styled.div`
    display: flex;
`;
export const Etiquette = styled.div`
    text-align: center;
    margin: auto;
    margin-right: 10px;
    margin-bottom: 6px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-top: none;
    border-radius: 0 0 5px 5px;
    background-color: #eeeeee;
`;

export const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
};

export const TransitionAffichage = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const AucunSujet = styled.div`
    height: 75%;
    text-align: center;
    z-index: 3;
`;

export const BoutonLeft = styled(Button)`
    width: 170px;
    background-color: #e2e0d8;
    border-color: #919191;
    transform: translateX(-20px);
`;

export const BoutonRight = styled(Button)`
    width: 170px;
    background-color: #e2e0d8;
    border-color: #919191;
    transform: translateX(20px);
`;
