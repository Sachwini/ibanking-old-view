import styled from "styled-components";
import { Container, Navbar, Row, Col, Form } from "react-bootstrap";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

export const HeaderNavbar = styled(Navbar)`
  padding-left: 0;
  padding-right: 0;
  background: #fafafa;
  box-shadow: 0px 5px 10px #eeeeee;
  height: 80px;
`;

export const HeaderContainer = styled(Container)`
  padding: 0;
  margin-left: 0.8em !important;
`;

export const HeaderRow = styled(Row)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`;

export const HeaderCol = styled(Col)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const MenuIcon = styled(HiOutlineMenu)`
  color: ${(props) => props.theme.primary};
  border-radius: 0.5em;
  font-weight: bolder;
  cursor: pointer;
  padding: 1px;
  background: transparent;

  &:hover {
    background: ${(props) => props.theme.secondary};
    transition: 0.6s all;
    color: white;
  }
  &:active {
    opacity: 0.5;
  }
`;

export const HeaderLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  width: auto;
`;

export const H_Notification = styled.span`
  .bell_ctrl {
    position: absolute;
  }

  .badge_ctrl {
    position: relative;
    background: ${(props) => props.theme.secondary};
    color: white;
    font-weight: bold;
    border-radius: 50%;
    top: -8px;
    margin-left: 15px;
  }
`;

export const HeaderSearchForm = styled(Form)`
  width: 100%;

  input {
    width: 100% !important;
    padding: 0.5em;
    color: ${(props) => props.theme.primary};
    border: 1px solid #dfdfdf;
    border-radius: 3px;

    &:focus {
      color: ${(props) => props.theme.primary};
      background-color: #fff;
      border-color: ${(props) => props.theme.secondary};
      outline: 0;
      box-shadow: 0 0 4px ${(props) => props.theme.secondary};
    }

    &::placeholder {
      padding-left: 1.5em;
      font-family: cursive;
      text-transform: capitalize;
      font-size: 14px;
      color: #969696;
      letter-spacing: 1.2px;
    }
  }

  .search__icon {
    margin-left: -40px;
    cursor: pointer;
    clear: both;
    z-index: 100;
    padding: 5px;
  }
`;
