import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../Assets/LOG.svg";
import PartieG from "./PartieG";
import { Desktop, Tablet } from "../../../responsive";
import { Transition } from "react-transition-group";
import { Helmet } from "react-helmet";

//SECTION STYLED-COMPONENTS

const PartieD = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

//!SECTION
const duration = 200;
const defaultStyle = {
    transition: `all ${duration}ms `,
    transform: "translate3d(0px,0px,0)"
};
const transitionStyles: any = {
    entering: { opacity: 0, transform: "translate3d(30px,0px,0)" },
    entered: { opacity: 1, transform: "translate3d(0px,0px,0)" },
    exiting: { opacity: 0, transform: "translate3d(0px,0px,0)" },
    exited: { opacity: 0, transform: "translate3d(0px,-30px,0)" }
};

const Accueil = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Phidbac : La philosophie du bac</title>
                <link rel="canonical" href="https://phidbac.fr" />
            </Helmet>
            <PartieG />
            <Desktop>
                <PartieD>
                    <Transition
                        appear
                        enter
                        mountOnEnter
                        unmountOnExit
                        in={true}
                        timeout={{ appear: 200, enter: 50, exit: 200 }}
                    >
                        {(state) => (
                            <Logo
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                                height="85%"
                                width="85%"
                            />
                        )}
                    </Transition>
                </PartieD>
            </Desktop>
            <Tablet>
                <PartieD>
                    <Logo height="85%" width="85%" />
                </PartieD>
            </Tablet>
        </>
    );
};

export default Accueil;
