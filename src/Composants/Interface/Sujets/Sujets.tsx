import * as React from "react";
import { Desktop, Tablet, Mobile } from "../../../responsive";

const SujetsDesktop = React.lazy(() => import("./Responsive/SujetsDesktop"));
const SujetsTablet = React.lazy(() => import("./Responsive/SujetsTablet"));
const SujetsMobile = React.lazy(() => import("./Responsive/SujetsMobile"));

const Sujets = () => {
    return (
        <React.Suspense fallback={<div></div>}>
            <Desktop>
                <SujetsDesktop />
            </Desktop>
            <Tablet>
                <SujetsTablet />
            </Tablet>
            <Mobile>
                <SujetsMobile />
            </Mobile>
        </React.Suspense>
    );
};
export default Sujets;
