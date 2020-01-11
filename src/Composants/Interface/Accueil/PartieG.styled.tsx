import styled from "styled-components";

export const Conteneur = styled.div`
    flex: 1;
    z-index: 2;
    display: flex;
    font-size: 16px;
    height: 100%;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 767px) {
        height: initial;
        margin-top: 60px;
    }
`;

export const Cercle = styled.div`
    position: absolute;
    top: -10%;
    left: -40%;
    width: 100%;
    height: 200%;
    background-color: #e9e7e1;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50% /50%;
    z-index: 0;
    opacity: 0.5;
`;
