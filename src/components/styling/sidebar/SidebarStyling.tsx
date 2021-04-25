import styled, { css } from "styled-components";

interface SideBarProps {
  customWidth: string;
}

interface ActiveInactive {
  active?: string;
  inActive?: string;
  status: string;
}

export const SidebarContainer = styled.div<SideBarProps>`
  width: ${(props) => props.customWidth};
  height: calc(100vh - 80px);
  position: fixed;
  background: ${(props) => props.theme.primary};
  color: white;
  padding: auto;
  z-index: 1200;
`;

export const SideBarMenuControl = styled.div`
  width: 100%;
  height: 90%;
  padding: 0;
  margin: 0;
  margin-top: 0.8em;
  margin-bottom: 0.9em;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
    height: 100%;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: #818181, #575757, #c9c9c9;
    background: #08a14d;
    background: linear-gradient(to bottom, #06ec6e, #08a14d);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #08a14d 70%;
    /* opacity: 0.8; */
  }
`;

export const MenuContainer = styled.div`
  width: 100%;
  background: inherit;
  cursor: pointer;

  .menu_HeaderWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .menu_HeaderText {
      flex-grow: 1;
      color: white;
      /* font-weight: bold; */

      .text {
        padding-left: 10px;
        vertical-align: middle;
      }
    }
  }

  .active {
    background: transparent;
    padding: 0.5rem;
    margin-top: 0.5em;
    padding-left: 0.6rem;
    background: #069b3f;
    letter-spacing: 1.2px;
    text-transform: capitalize;
    font-size: 17px;
    color: white;
  }

  .inActive {
    background: transparent;
    padding: 0.5rem;
    margin-top: 0.5em;
    padding-left: 0.6rem;
    letter-spacing: 1.2px;
    text-transform: capitalize;
    font-size: 17px;
    color: white;

    &:hover {
      background: #f1f1f144;
      background: #069b3f;
    }
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding-left: 1.3em;
`;

export const MenuListItem = styled.li<ActiveInactive>`
  margin: 0.3em;
  padding: 0.1em;
  padding-left: 0.9em;

  &:hover {
    color: ${(props) => props.theme.secondary};
  }

  ${({ status }) =>
    status === "active" &&
    css`
      /* border-left: 4px solid red; */
      border-left: 4px solid ${(props) => props.theme.secondary};
    `}
`;

export const MiniMenuIconHandle = styled.div`
  width: 100%;
  background: inherit;
  cursor: pointer;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bolder;

  &:hover {
    font-weight: bolder;
    opacity: 0.8;
  }
`;
