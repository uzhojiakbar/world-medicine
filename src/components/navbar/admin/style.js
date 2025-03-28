import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../../utils/media";

export const NavBigContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 99;

  width: 100%;
  height: 100px;
  min-width: 320px;
  width: 100%;

  backdrop-filter: blur(10px);
  padding: 30px;
`;

const NavContainer = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white !important;

  padding: 15px 30px;

  border-radius: 30px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  user-select: none;
  ${media.mobileL} {
    display: none;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  
  font-family: "Vela Sans GX";
  font-size: 24px;
  user-select: none;
  ${media.tablet} {
    width: 150px;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--black);
  font-size: 18px;
  font-family: "Vela Sans GX Medium";

  ${media.tabletMax} {
    font-size: 16px;
  }

  ${media.tablet} {
    font-size: 14px;
  }

  &:hover {
    color: var(--text-hover);
  }

  &.active {
    color: var(--text-hover);
  }

  &.inactive {
    color: var(--black);
  }
`;

const ChangeLanguage = styled.div`
  text-decoration: none;
  color: var(--black);
  font-size: 18px;
  font-family: "Vela Sans GX Medium";

  text-transform: uppercase;

  ${media.tabletMax} {
    font-size: 16px;
  }

  ${media.tablet} {
    font-size: 14px;
  }

  &:hover {
    color: var(--text-hover);
  }

  &.active {
    color: var(--text-hover);
  }

  &.inactive {
    color: var(--black);
  }
`;

const ProfieBtn = styled(NavLink)`
  width:  40px;
  height: 40px;
  background-color: #F7F8FC;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  color: #216BF4;
  cursor: pointer;
  
  &:hover {
    background-color: #ebebeb;
  }
`;

const GoToProfileButton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  > .name {
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 900;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  > .name-desc {
    text-transform: capitalize;
    color: gray;
  }
`;

const ProfileBarButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 5px;

  color: ${({ type }) => (type === "logOut" ? "red" : "black")};
`;

// BURGER MENU

const BurgerMenu = styled.div`
  display: none;
  ${media.mobileL} {
    display: flex;
    font-size: 22px;
  }
`;

export {
  NavContainer,
  Logo,
  Links,
  Link,
  ProfieBtn,
  GoToProfileButton,
  ProfileBarButton,
  BurgerMenu,
  ChangeLanguage,
};
