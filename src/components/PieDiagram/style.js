// style.js
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { media } from "../../utils/media";

const PieContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100% !important;

  background-color: white;

  ${media.mobileL} {
    max-width: 100% !important;
  }
  ${media.mobileMM} {
    max-width: 100% !important;
  }

  background: var(--bg-color);
  border-radius: 12px;
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  padding-bottom: 60px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 70px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  > .main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    > .pie-main {
      position: relative;
    }

    ${media.mobileMM} {
      flex-direction: column;
    }
  }
`;

const PieDiagramCon = styled(Doughnut)`
  width: 250px !important; /* Diagramma hajmini kichraytirish */
  height: 250px !important;
`;

const TotalText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px; /* Matn hajmini kichraytirish */
  font-weight: bold;
  color: #333;

  display: flex;
  flex-direction: column;

  .count {
    font-size: 24px;
  }
`;

const LegendContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ColorBox = styled.span`
  width: 8px; /* Kichikroq rang kvadratchasi */
  height: 8px;
  background-color: ${(props) => props.color};
  display: inline-block;
  margin-right: 5px;
  border-radius: 2px;
`;

export {
  Container,
  TotalText,
  LegendContainer,
  LegendItem,
  ColorBox,
  PieContainer,
  PieDiagramCon,
};
