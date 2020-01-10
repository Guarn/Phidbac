import * as React from "react";
import * as Styled from "./PartieG.styled";
import "./PartieG.css";
import { Desktop, Tablet, Mobile } from "../../../responsive";
import PartieGDesktop from "./Responsive/PartieGDesktop";
import { Transition } from "react-transition-group";

const PartieGTablet = React.lazy(() => import("./Responsive/PartieGTablet"));
const PartieGMobile = React.lazy(() => import("./Responsive/PartieGMobile"));

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

const PartieG = () => {
    return (
        <Styled.Conteneur>
            <React.Suspense fallback={<div></div>}>
                <Desktop>
                    <Styled.Cercle />
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
                                <PartieGTablet />
                            </div>
                        )}
                    </Transition>
                </Tablet>
                <Mobile>
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
                                <PartieGMobile />
                            </div>
                        )}
                    </Transition>
                </Mobile>
            </React.Suspense>
        </Styled.Conteneur>
    );
};

export default PartieG;
