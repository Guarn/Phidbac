import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../../Assets/LOG.svg";
import PartieG from "./PartieG";
import { DesktopTablet } from "../../../responsive";
import { Transition } from "react-transition-group";
import { Helmet } from "react-helmet-async";
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
                <title>Phidbac, la philosophie du bac</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Préparation de A à Z à l'épreuve de philosophie du nouveau bac (Juin 2021). Plus de 1100 sujets du Bac, des cours, des exercices, et un index complet des auteurs/notions/termes."
                />
                <link rel="canonical" href="https://www.phidbac.fr/" />
            </Helmet>
            <PartieG />
            <DesktopTablet>
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
            </DesktopTablet>
        </>
    );
};

export default Accueil;
