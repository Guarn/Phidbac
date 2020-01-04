import styled from "styled-components";

export const Conteneur = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;
export const PuceLien = styled.div`
    opacity: 0;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 20px;
    width: 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: salmon;
    transform: translate3d(-50px, 0, 0);
`;
export const ConteneurSlate = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px dashed transparent;
    transition: all 0.2s;
    &:hover ${PuceLien} {
        opacity: 1;
    }
`;
export type WidthProps = {
    width: number;
};
export const ConteneurGlobal = styled.div<WidthProps>`
    width: ${(props) => props.width + "px"};
    overflow: auto;
    margin-top: 30px;
    padding-right: 30px;
    position: relative;
    padding-left: 10%;
    height: calc(100% - 30px);
`;

