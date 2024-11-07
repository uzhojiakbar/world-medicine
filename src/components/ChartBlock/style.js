import styled from "styled-components";
import { media } from "../../utils/media";

export const ChartBlockCon = styled.div`
  background-color: white;

  max-width: 100% !important;
  margin: 20px;

  display: flex;
  flex-direction: column;

  ${media.mobileL} {
    max-width: 100% !important;
  }
  ${media.mobileMM} {
    max-width: 85% !important;
  }
`;
