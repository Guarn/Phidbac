import { css } from "styled-components";

export const theme = {
    main: "#5e5e5e",
    texteSecondaryColor: "orange"
};

export const LayoutCentered = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LayoutCenteredCol = css`
    ${LayoutCentered};
    flex-direction: column;
`;

export const MaxDimensions = css`
    height: 100%;
    width: 100%;
`;
