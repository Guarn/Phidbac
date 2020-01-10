import * as React from "react";

const SujetsDesktop = React.lazy(() => import("./Responsive/SujetsDesktop"));

const Sujets = () => {
    return (
        <React.Suspense fallback={<div></div>}>
            <SujetsDesktop />
        </React.Suspense>
    );
};
export default Sujets;
