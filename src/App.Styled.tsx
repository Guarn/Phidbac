import styled from "styled-components";
import { MaxDimensions } from "./Shared/Styled";

export const ConteneurGlobal = styled.div`
    ${MaxDimensions};
    color: ${(props) => props.theme.main};
    display: grid;
    grid-template-rows: 80px calc(100% - 120px) 40px;
    font-family: century-gothic, sans-serif;
    overflow: hidden;
    @media (max-width: 1023px) {
        grid-template-rows: 50px calc(100% - 50px);
    }
    @media (max-width: 767px) {
        grid-template-rows: none;
        display: flex;
        flex-direction: column;
        overflow: initial;
    }
`;

export const ConteneurHeader = styled.div`
    display: flex;
    justify-content: space-between;
    z-index: 100;
    @media (max-width: 767px) {
        position: fixed;
        height: 50px;
        top: 0px;
        width: 100%;
        background-color: ${(props) => props.theme.background};
        box-shadow: 0 3px 3px lightgrey;
    }
`;

export const ConteneurContenu = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.background};
    @media (max-width: 1024px) {
        position: relative;
        justify-content: flex-start;
        min-height: 100vh;
    }
`;

export const ConteneurFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    z-index: 2;
`;
