import * as React from "react";
import * as Styled from "./PartieG.styled";
import "./PartieG.css";
import { Desktop, Tablet, Mobile } from "../../../responsive";
import PartieGDesktop from "./Responsive/PartieGDesktop";
import { Transition } from "react-transition-group";

const PartieGTablet = React.lazy(() => import("./Responsive/PartieGTablet"));
const PartieGMobile = React.lazy(() => import("./Responsive/PartieGMobile"));

const PartieG = () => {
    return (
        <Styled.Conteneur>
            <React.Suspense fallback={<div></div>}>
                <Desktop>
                    <Styled.Cercle />
                    <GolbalTransition>
                        <PartieGDesktop />
                    </GolbalTransition>
                </Desktop>
                <Tablet>
                    <GolbalTransition>
                        <PartieGTablet />
                    </GolbalTransition>
                </Tablet>
                <Mobile>
                    <GolbalTransition>
                        <PartieGMobile />
                    </GolbalTransition>
                </Mobile>
            </React.Suspense>
        </Styled.Conteneur>
    );
};

export default PartieG;

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

const GolbalTransition: React.FC = ({ children }) => {
    return (
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
                    {children}
                </div>
            )}
        </Transition>
    );
};
