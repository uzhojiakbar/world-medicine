import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 1920px;
  min-width: 400px;
  width: 100vw;
  margin: 0 auto;
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: 800;

  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleSmall = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;

  > .rightBtn {
    cursor: pointer;
    padding: 0 5px;
    color: #0025a2;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  padding: 10px 40px;
`;
