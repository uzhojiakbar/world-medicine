import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 10px;
  }
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
`;

const FiltrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;
  border-radius: 27px;
  background-color: white;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 7px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Article = styled.div`
  display: flex;
  gap: 7px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoCard = styled.div`
  width: 100%;
  padding: 13px;
  border-radius: 7px;
  transition: all 0.2s;
  background-color: ${({ active }) => (active ? "blue" : "white")};
  color: ${({ active }) => active && "white"};
  cursor: pointer;

  &:hover {
    background-color: rgb(7, 88, 238);
    color: white;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 20px;
  }
`;

const InfoTitle = styled.div`
  font-size: 35px;
  font-weight: 700;
  line-height: 51.91px;
  color: ${({ active }) => (active ? "inherit" : "#216bf4")};
  transition: all 0.2s;
  ${InfoCard}:hover & {
    color: white;
  }
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  background-color: white;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export {
  Wrapper,
  Header,
  IconWrapper,
  Item,
  FiltrWrapper,
  Form,
  Main,
  Section,
  Article,
  InfoCard,
  InfoTitle,
  Footer,
};
