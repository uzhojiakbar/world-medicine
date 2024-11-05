import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Logo = styled.img`
  cursor: pointer;
  user-select: none;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--black);
  font-size: 18px;

  &:hover {
    color: var(--text-hover);
  }

  &.active {
    color: var(--text-hover);
  }
`;

const ProfieBtn = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--text-hover);
  cursor: pointer;
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

export {
  NavContainer,
  Logo,
  Links,
  Link,
  ProfieBtn,
  GoToProfileButton,
  ProfileBarButton,
};
