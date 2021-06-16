import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./ThemeControl";

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  *{
      padding:0;
      margin:0;
      box-sizing:border-box;
      z-index:0 ;
  }

  html, body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
   color: ${(props) => props.theme.primary};
  }

  a{
      text-decoration:none;
    }

  ul{list-style-type: none}

&::-webkit-scrollbar {
    width: 10px;
    height: 100%;
    border-radius: 30px;
    background: #949494bb;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: ${(props) => props.theme.primary};
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb:hover {    
    background: ${(props) => props.theme.secondary};
    transition: all 0.8s;
  }
`;
