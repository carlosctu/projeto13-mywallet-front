import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
}
body{
    background: ${theme.background};
    color: ${theme.text};
}

.defaultButtonStyle{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #A328D6;
    color: #FFFFFF;
    height: 46px;
    width: 326px;
}
`;
export default GlobalStyle;
