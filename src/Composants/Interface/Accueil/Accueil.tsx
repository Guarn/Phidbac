import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../Assets/LOG.svg";
import PartieG from "./PartieG";
import { Desktop, Tablet } from "../../../responsive";

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
            <React.Suspense fallback={<div></div>}>
                <Desktop>
                    <PartieD>
                        <Logo height="85%" width="85%" />
                    </PartieD>
                </Desktop>
                <Tablet>
                    <PartieD>
                        <Logo height="85%" width="85%" />
                    </PartieD>
                </Tablet>
            </React.Suspense>
        </>
    );
};

export default Accueil;
