import React, { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../Assets/LOG.svg";
import "./Accueil.css";
import PartieG from "./PartieG";

//SECTION STYLED-COMPONENTS

const PartieD = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

//!SECTION

const Accueil = () => {
    return (
        <>
            <PartieG />
            <PartieD>
                <Logo height="85%" width="85%" />
            </PartieD>
        </>
    );
};

export default Accueil;
