import { createGlobalStyle } from "styled-components";
import RalewayMedium from "../fonts/Raleway-Medium.ttf";

const FontStyles = createGlobalStyle`
@font-face {
    font-family: 'Raleway';
    src: url(${RalewayMedium}) format('ttf');
}
`;

export default FontStyles;
