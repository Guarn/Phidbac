import * as React from "react";
import { Desktop } from "../../../responsive";

const SujetsDesktop = React.lazy(() => import("./Responsive/SujetsDesktop"));

const Sujets = () => {
    return (
        <React.Suspense fallback={<div></div>}>
            <Desktop>
                <SujetsDesktop />
            </Desktop>
        </React.Suspense>
    );
};
export default Sujets;
