import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 10px;
  background-color: white;
  border-radius: 27px;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 440px) {
    font-size: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  padding: 17px 20px;
  background: #f7f8fc;
  border-radius: 10px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 27px;
`;

export { Container, InfoWrapper, Info, TitleWrap, Main };
