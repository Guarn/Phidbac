import * as React from "react";
import { Desktop, TabletMobile } from "../../../responsive";

const MenuDesktop = React.lazy(() => import("./Responsive/MenuDesktop"));
const MenuMobile = React.lazy(() => import("./Responsive/MenuMobile"));

const Menu = () => {
    return (
        <React.Suspense fallback={<div></div>}>
            <Desktop>
                <MenuDesktop />
            </Desktop>
            <TabletMobile>
                <MenuMobile />
            </TabletMobile>
        </React.Suspense>
    );
};
export default Menu;
