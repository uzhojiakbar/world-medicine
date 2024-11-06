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
  grid-template-columns: 2fr repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export { AnaliktikaCon, Analiktika__Cards };
