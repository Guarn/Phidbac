import * as React from "react";
import styled from "styled-components";
import "./PartieG.css";
import { Desktop, Tablet, Mobile } from "../../../responsive";

const PartieGDesktop = React.lazy(() => import("./Responsive/PartieGDesktop"));
const PartieGTablet = React.lazy(() => import("./Responsive/PartieGTablet"));
const PartieGMobile = React.lazy(() => import("./Responsive/PartieGMobile"));

const Conteneur = styled.div`
    flex: 1;
    z-index: 2;
    display: flex;
    font-size: 16px;
    height: 100%;
    flex-direction: column;
    justify-content: center;
`;

const PartieG = () => {
    return (
        <Conteneur>
            <React.Suspense fallback={<div></div>}>
                <Desktop>
                    <PartieGDesktop />
                </Desktop>
                <Tablet>
                    <PartieGTablet />
                </Tablet>
                <Mobile>
                    <PartieGMobile />
                </Mobile>
            </React.Suspense>
        </Conteneur>
    );
};

export default PartieG;
