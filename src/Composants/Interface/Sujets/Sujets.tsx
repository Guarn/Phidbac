import * as React from "react";
import { Desktop, Tablet } from "../../../responsive";

const SujetsDesktop = React.lazy(() => import("./Responsive/SujetsDesktop"));

const Sujets = () => {
    return (
        <React.Suspense fallback={<div></div>}>
            <SujetsDesktop />
        </React.Suspense>
    );
};
export default Sujets;
