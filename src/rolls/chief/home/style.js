import styled from "styled-components";
import { media } from "../../../utils/media";

const AnaliktikaCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Analiktika__Cards = styled.div`
  display: grid;

  gap: 10px;

  background-color: white;
  border-radius: 30px;

  ${media.mobileMM} {
    width: 90%;
    margin: 0 auto;
  }
`;

Analiktika__Cards.Con = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export { AnaliktikaCon, Analiktika__Cards };
