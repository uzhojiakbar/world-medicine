import styled from "styled-components";

export const DrugsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;

  gap: 10px;
  width: 100%;

  background-color: white;
`;
export const DrugsItem = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: #f7f8fc;
  padding: 14px 18px;

  cursor: pointer;
  border-radius: 10px;

  font-family: "Vela Sans GX", sans-serif;
  font-weight: 600;
`;