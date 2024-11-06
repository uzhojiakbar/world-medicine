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
  grid-template-columns: 2fr repeat(2, 1fr); /* Defaultda 3 ustun */
  gap: 10px;

  /* Tablet va kichik ekranlar uchun */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* Bitta ustun */
  }

  /* Telefonlar uchun */
  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Bitta ustun */
  }
`;

export { AnaliktikaCon, Analiktika__Cards };
