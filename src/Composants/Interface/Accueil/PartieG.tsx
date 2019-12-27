import * as React from "react";
import styled from "styled-components";
import "./PartieG.css";
import { Desktop, Tablet, Mobile } from "../../../responsive";
import PartieGDesktop from "./Responsive/PartieGDesktop";
import { Transition } from "react-transition-group";

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

const duration = 500;
const defaultStyle = {
    transition: `all ${duration}ms `,
    opacity: 0
};
const transitionStyles: any = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};
const Cercle = styled.div`
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
const PartieG = () => {
    return (
        <Conteneur>
            <React.Suspense fallback={<div></div>}>
                <Desktop>
                    <Cercle />
                    <Transition
                        appear
                        enter
                        mountOnEnter
                        unmountOnExit
                        in={true}
                        timeout={{ appear: 500, enter: 200, exit: 200 }}
                    >
                        {(state) => (
                            <div
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                            >
                                <PartieGDesktop />
                            </div>
                        )}
                    </Transition>
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
