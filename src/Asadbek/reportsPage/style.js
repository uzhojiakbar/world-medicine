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

const Item = styled.div`
  display: flex;
  gap: 7px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-self: center;

  padding: 17px 18px;
  border-radius: 17px;
  background-color: white;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(229, 235, 245);
  }
  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 400px) {
    padding: 14px 15px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export {
  Container,
  InfoWrapper,
  Info,
  TitleWrap,
  Main,
  Item,
  IconWrapper,
  Header,
};
