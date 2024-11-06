import styled from "styled-components";
import { media } from "../../utils/media";

const AnaliktikaCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px;
`;

const Analiktika__Cards = styled.div`
  display: grid;
  grid-template-columns: ${({ type }) =>
    type === "type-1"
      ? "2fr repeat(2, 1fr)"
      : type === "type-3"
      ? "1.3fr 1fr"
      : "1fr 1fr"};
  gap: 10px;

  background-color: ${({ type }) =>
    type === "type-3" ? "white" : "var(--bg-color)"};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export { AnaliktikaCon, Analiktika__Cards };
