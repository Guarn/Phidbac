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
        grid-template-rows: 50px calc(100% - 50px);
    }
`;

export const ConteneurHeader = styled.div`
    display: flex;
    justify-content: space-between;
    z-index: 100;
`;

export const ConteneurContenu = styled.div`
    display: flex;
    justify-content: center;
`;

export const ConteneurFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    z-index: 2;
`;
