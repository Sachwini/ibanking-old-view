import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./ThemeControl";

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

  *{
      padding:0;
      margin:0;
      box-sizing:border-box;
  }

  html, body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
   color: ${(props) => props.theme.primary};
   font-size: 15px;
  }

  a{
      text-decoration:none;
    }

  ul{list-style-type: none}

.card_Shadow{
 background-color: #fffefd;
 box-shadow: 0px 0px 30px 2px #00000017;
 transition: all 0.4s;
 --webkit-transition: all 0.4s;
}

.card_Shadow:hover {  
  box-shadow: 0px 0px 24px 2px #cfcfcfda;
}

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

  .form-control{
    &::placeholder{
      font-size: 14px;
      text-transform: capitalize;
    }
  &:focus {
      border-color: ${(props) => props.theme.secondary};
      box-shadow: 0 0 0.3rem  ${(props) => props.theme.secondary};
    }
  }

  button:disabled{
    cursor: not-allowed;
  }
`;
