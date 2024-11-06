import styled from "styled-components";

export const InfoCardWrapper = styled.div`
  background-color: white;
  padding: 15px 10px;
  border-radius: 20px;
  border: 1px solid #fafafa;
  width: ${({ width }) => (width ? width : "25%")};

  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  flex-direction: column;
  gap: 10px;

  > .child-flex {
    display: flex;
    gap: 10px;
  }
`;
