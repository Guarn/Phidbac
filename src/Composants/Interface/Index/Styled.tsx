import styled from "styled-components";
import { Radio } from "antd";

const Conteneur = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

const ConteneurDescription = styled.div`
    width: 500px;
    margin-left: 40px;
    overflow: auto;
    height: 100%;
    padding-right: 10px;
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
    overflow: hidden;
    padding-right: 10px;
`;

const BlocLettre = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Lettre2 = styled.div`
    font-size: 24px;
    color: orange;
`;

const RadioButton = styled(Radio.Button)`
    background-color: rgba(0, 0, 0, 0);
`;

const LienAdmin = styled.div`
    position: absolute;
    height: 30px;
    width: 30px;
    right: 0px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 50%;
    &:hover {
        transform: scale(1.2);
        box-shadow: 0 0 3px;
    }
`;

export const Styled = {
    Conteneur,
    ConteneurLettres,
    LettresG,
    LettresD,
    ConteneurSlate,
    Lettre,
    Lettre2,
    ConteneurListe,
    RadioButton,
    ConteneurDescription,
    BlocLettre,
    LienAdmin
};
