import styled from "styled-components";

export const InfoCardWrapper = styled.div`
  background-color: white;
  padding: ${({ padding }) => (padding ? padding : "15px 10px")};
  border-radius: 20px;
  border: 1px solid #fafafa;
  width: 100%;

  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  flex-direction: column;
  gap: 10px;

  > .child-flex {
    display: flex;
    gap: 10px;
  }
`;
