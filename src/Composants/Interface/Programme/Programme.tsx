import * as React from "react";
import styled from "styled-components";
import Axios from "../../Fonctionnels/Axios";
import Slate from "../../Fonctionnels/Slate";
import { useLocation } from "react-router";
import Scroll, {
    Link,
    Events,
    scrollSpy,
    animateScroll,
    Element
} from "react-scroll";
import TableMatiere from "./TableMatiere";
import "./Programme.css";
export interface Programme {}
interface State {
    Cours: any;
    Titre: any;
    Description: any;
}
interface WidthProps {
    width: number;
}
const ConteneurGlobal = styled.div<WidthProps>`
    width: ${(props) => props.width + "px"};
    overflow: auto;
    margin-top: 30px;
    padding-right: 30px;
    position: relative;
    margin-left: 10%;
`;
interface SelectedProps {
    selected: boolean;
}

const Conteneur = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const ConteneurSlate = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px dashed transparent;
    transition: all 0.2s;
`;

const Programme: React.FC<Programme> = (props) => {
    const [state, setState] = React.useState<State>({
        Cours: [],
        Description: "",
        Titre: ""
    });
    const location = useLocation();
    const [TabMatiere, setTabMat] = React.useState(false);
    React.useEffect(() => {
        if (state.Titre === "") {
            Axios.get("/Cours/1").then((rep) => {
                setState({
                    Titre: rep.data.Titre,
                    Description: rep.data.Description,
                    Cours: JSON.parse(rep.data.Contenu)
                });
                setTabMat(true);
            });
        } else {
            let loc = location.hash.replace("#", "");
            if (loc !== "") {
                let elBase = document
                    .getElementById("element-0")
                    .getBoundingClientRect().top;
                let elLien = document
                    .getElementById(`element-${loc}`)
                    .getBoundingClientRect().top;
                animateScroll.scrollTo(elLien - elBase, {
                    containerId: "ScrollConteneur"
                });
            }
        }
    }, [state]);
    return (
        <Conteneur>
            <ConteneurGlobal
                id="ScrollConteneur"
                className="element"
                width={781}
            >
                {state.Cours.map((element, index) => {
                    return (
                        <Element
                            id={`element-${index}`}
                            name={`element-${index}`}
                            key={`element-${index}`}
                            className="element"
                        >
                            <ConteneurSlate
                                style={{
                                    backgroundColor:
                                        element.options.backgroundColor,
                                    marginTop: element.options.marginTop + "px",
                                    marginBottom:
                                        element.options.marginBottom + "px",
                                    marginLeft:
                                        element.options.marginLeft + "px",
                                    paddingLeft:
                                        element.options.paddingLeft + "px",
                                    marginRight:
                                        element.options.marginRight + "px",
                                    paddingRight:
                                        element.options.paddingRight + "px",
                                    paddingTop:
                                        element.options.paddingTop + "px",
                                    paddingBottom:
                                        element.options.paddingBottom + "px",
                                    fontFamily: "Century Gothic",
                                    fontSize: "16px"
                                }}
                            >
                                <Slate
                                    index={index}
                                    value={element.value}
                                    readOnly={true}
                                />
                            </ConteneurSlate>
                        </Element>
                    );
                })}
            </ConteneurGlobal>
            {TabMatiere && <TableMatiere state={state} />}
        </Conteneur>
    );
};
export default Programme;
