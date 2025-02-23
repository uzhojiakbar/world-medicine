import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* width: 100%; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  max-width: 1000px;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
  user-select: none;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  border-radius: 7px;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 400;
  background-color: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  min-height: 400px;
  background-color: white;
  border-radius: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Con = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f7f8fc;
  border-radius: 50%;
`;

const InfoTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  padding: 17px 20px;
  width: 100%;
  background-color: #f7f8fc;
  border-radius: 57px;
  display: flex;
  align-items: center;
`;

export const InfoTitleInner = styled(InfoTitle)`
  display: flex;
  justify-content: space-between;
  border-radius: 0;

  span {
    font-size: 16px;
    color: gray;
    font-family: "Vela Sans GX Regular";
    font-weight: 400;

  }
  
`;


const Info = styled.div`
  display: flex;
  padding: 17px 20px;
  justify-content: space-between;

  border-radius: 5px;
  background: #f7f8fc;

  font-weight: 600;
  font-size: 16px;
`;

const Line = styled.div`
  border: 1px solid #f7f8fc;
  height: 1px;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 20px;
  border-radius: 15px;
  user-select: none;

  background-color: #f7f8fc;
`;

const Child = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
cursor: pointer;
  
  .red{
    color: red;
  }

  > svg {
    cursor: pointer;
  }
`;

const EditIconCon = styled.div`
  height: 16px;
  cursor: pointer;
`;

export {
  Container,
  Wrapper,
  ButtonWrapper,
  Item,
  InfoWrapper,
  InfoContainer,
  Wrap,
  Con,
  IconWrap,
  InfoTitle,
  Info,
  Line,
  ItemContainer,
  Child,
  EditIconCon,
};
