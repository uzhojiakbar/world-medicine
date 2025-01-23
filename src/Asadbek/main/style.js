import styled from "styled-components";

const Container = styled.div``;
const Wrap = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background-color: white;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
`;

const SellWrap = styled.div`
  margin-top: 50px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 20px;
  background-color: #f7f8fc;
  border-radius: 5px;
  position: relative;
`;

const Highlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ foiz }) => (foiz ? foiz : 0)};
  height: 100%;
  background-color: #62ffac;
`;

const TitleSmall = styled.div`
  font-size: ${({ size }) => (size ? size : "24px")};
  font-weight: 700;
  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;
  z-index: 999;
  > .rightBtn {
    cursor: pointer;
    padding: 0 5px;
    color: #0025a2;
  }
`;
export {
  Container,
  Wrap,
  CardWrapper,
  SellWrap,
  InfoWrapper,
  Item,
  Highlight,
  TitleSmall,
};
