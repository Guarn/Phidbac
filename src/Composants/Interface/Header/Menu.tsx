import * as React from "react";
import { Desktop, Tablet, Mobile } from "../../../responsive";

const MenuDesktop = React.lazy(() => import("./Responsive/MenuDesktop"));
const MenuTablet = React.lazy(() => import("./Responsive/MenuTablet"));
const MenuMobile = React.lazy(() => import("./Responsive/MenuMobile"));

const Menu = () => {
    return (
        <React.Suspense fallback={<div></div>}>
            <Desktop>
                <MenuDesktop />
            </Desktop>
            <Tablet>
                <MenuTablet />
            </Tablet>
            <Mobile>
                <MenuMobile />
            </Mobile>
        </React.Suspense>
    );
};
export default Menu;
