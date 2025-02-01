import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;

  > .titlee {
    width: 100%;
    max-width: 1000px;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  background-color: white;
  border: 1px solid #fafafa;
  border-radius: 30px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    border-radius: 15px;
  }
`;

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

const Section = styled.div`
  margin-top: -10px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: ${({ now }) => !now && "column"};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f7f8fc;
  @media (max-width: 768px) {
    width: 70px;
  }
`;

const InputWraper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #f7f8fc;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    background-color: white;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const IconSection = styled.div`
  position: absolute;
  display: flex;
  gap: 20px;
  right: 18px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 30%;
    right: 15px;
    gap: 10px;
  }
`;

const Datails = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

export {
  IconSection,
  InputWraper,
  Wrapper,
  FormWrapper,
  SubTitle,
  Section,
  IconWrapper,
  Datails,
};
