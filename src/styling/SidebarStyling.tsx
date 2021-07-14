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
  background: #e7e7e7;
  padding: auto;
  z-index: 1200;
  transition: width 0.4s linear;
`;

export const SideBarMenuControl = styled.div`
  width: 100%;
  height: 90%;
  padding: 0;
  margin: 0;
  margin-top: 1em;
  color: ${(props) => props.theme.primary};
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
    height: 100%;
    border-radius: 30px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: #818181, #575757, #c9c9c9;
    background: #08a14d;
    background: linear-gradient(to bottom, #06ec6e, #08a14d);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #08a14d 70%;
  }
`;

export const MenuContainer = styled.div`
  width: 100%;
  background: inherit;
  cursor: pointer;
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  /* transition: all 1s linear; */
  /* transition: transform 1s;
  transform: translateY(+100vh); */

  .menu_HeaderWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .menu_HeaderText {
      flex-grow: 1;
      color: ${(props) => props.theme.primary};

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

    .text {
      color: white;
    }

    .iconColor {
      color: white;
    }
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

      .text {
        color: white;
      }

      .iconColor {
        color: white;
      }
    }
  }
  .iconColor {
    color: ${(props) => props.theme.secondary};
  }

  .listText {
    font-weight: normal;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding-left: 1.3em;
  color: ${(props) => props.theme.primary};
`;

export const MenuListItem = styled.li<ActiveInactive>`
  margin: 0.3em;
  padding: 0.1em;
  padding-left: 0.9em;
  color: ${(props) => props.theme.primary};

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
  color: ${(props) => props.theme.secondary};

  &:hover {
    font-weight: bolder;
    opacity: 0.8;
  }
`;

// export const IsMenuHeaderActive = styled.div<ActiveInactive>`
//   background: transparent;
//   padding: 0.5rem;
//   margin-top: 0.5em;
//   padding-left: 0.6rem;
//   letter-spacing: 1.2px;
//   text-transform: capitalize;
//   font-size: 17px;
//   color: white;

//   &:hover {
//     background: #f1f1f144;
//     background: #069b3f;
//   }

//   ${({ status }) =>
//     status === "active" &&
//     css`
//       background: #069b3f;
//     `}
// `;
