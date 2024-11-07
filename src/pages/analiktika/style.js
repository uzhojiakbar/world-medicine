import styled from "styled-components";
import { media } from "../../utils/media";

const AnaliktikaCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Analiktika__Cards = styled.div`
  display: grid;
  grid-template-columns: ${({ type }) =>
    type === "type-1"
      ? "2fr repeat(2, 1fr)"
      : type === "type-3"
      ? "1.2fr 0.8fr"
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

  ${media.mobileMM} {
    width: 100%;
  }
`;

export { AnaliktikaCon, Analiktika__Cards };
