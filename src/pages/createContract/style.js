import styled from "styled-components";
import { media } from "../../utils/media";

export const PageContainer = styled.div`
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fc;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const InnerContainerGrid = styled.div`
  gap: 20px;
  background-color: #f8f9fc;
  border-radius: 10px;

  display: grid;
  grid-template-columns: 1fr 3fr;

  ${media.tabletMax} {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const FormSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  flex-wrap: wrap;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 600;

    font-size: 18px;
  }

  input {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
  }

  .circleInput {
    border-radius: 57px;
  }

  .region {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 10px;
  }

  > .withIcon {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 20px;
  }
`;
