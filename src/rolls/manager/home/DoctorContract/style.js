import styled from "styled-components";
import { media } from "../../../../utils/media";

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

export const FormSectionWithGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  ${media.tablet} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const DirectionFlexGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "20px")};
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

export const SectionInner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: ${({ mb }) => (mb ? mb : "0")};

  /* @media (max-width: 768px) {
    flex-direction: ${({ now }) => !now && "column"};
  } */
`;
export const SectionOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* @media (max-width: 768px) {
    flex-direction: ${({ now }) => !now && "column"};
  } */
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

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 20px;
  border-radius: 15px;

  background-color: #f7f8fc;
`;

export const Child = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  font-weight: 600;

  > svg {
    cursor: pointer;
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 150px;
  overflow: auto;
`;

export const EditIconCon = styled.div`
  height: 16px;
  cursor: pointer;
`;

export const RightItemMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
