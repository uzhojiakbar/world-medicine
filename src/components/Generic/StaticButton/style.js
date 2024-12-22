import styled from "styled-components";
import { media } from "../../../utils/media";

// Umumiy konteyner komponenti
const CardContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
  word-wrap: break-word;
  width: 90%;

  gap: 10px;

  ${media.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// Umumiy karta (box) komponenti
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  padding: 20px;

  color: ${(props) => (props.active == "true" ? "#fff" : "#000")};
  font-family: "Vela Sans GX", sans-serif;
  word-wrap: break-word;

  background-color: ${(props) =>
    props.active == "true"
      ? props.admin
        ? "var(--admin-primery-color)"
        : "#0026ca"
      : "#fff"};
  border-radius: 8px;

  cursor: pointer;

  > .value {
    color: ${(props) =>
      !(props.active == "true")
        ? props.admin
          ? "var(--admin-primery-color)"
          : "#0026ca"
        : "#fff"};
  }

  &:hover {
    background-color: ${(props) =>
      props.admin ? "var(--admin-primery-color)" : "#0026ca"};
    opacity: 0.9;
    color: white;

    > .value {
      color: white;
    }
  }
`;

// Matn komponentlari
const CardTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;

  ${media.mobileL} {
    font-size: 14px;
  }
`;

const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
  word-wrap: break-word;

  ${media.mobileL} {
    font-size: 22px;
  }
`;

export { CardContainer, Card, CardTitle, CardValue };
