import styled from "styled-components";

const Conteneur = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

const ConteneurLettres = styled.div`
    display: flex;
`;

const LettresG = styled.div`
    display: flex;
    flex-direction: column;
`;
const LettresD = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const ConteneurSlate = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px dashed transparent;
    transition: all 0.2s;
`;

const Lettre = styled.div`
    height: 40px;
    width: 40px;
    text-align: center;
    border: 1px solid #707070;
    color: #707070;
    font-size: 24px;
    margin-bottom: 2px;
    margin-right: 2px;
    user-select: none;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: grey;
        color: white;
    }
`;

const ConteneurListe = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    height: 90%;
    overflow: auto;
    padding-right: 10px;
    width: 270px;
`;

export const Styled = {
    Conteneur,
    ConteneurLettres,
    LettresG,
    LettresD,
    ConteneurSlate,
    Lettre,
    ConteneurListe
};
