import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  // margin-top: 171px;
  width: 100%;

  padding: 0 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const Title = styled.span`
  font-weight: 800;
  font-size: 45px;
  /* line-height: 65.57px; */
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 45px;
  }
`;

const Datails = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 17px;
  width: 100%;
  border-radius: 7px;

  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  background-color: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }
`;

const InfoPage = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid #fafafa;
  background: #fff;
  gap: 10px;
  border-radius: 27px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 17px 20px;
  border-radius: 7px;
  width: 100%;
  background-color: #f7f8fc;
`;
const InputWrapper = styled.form`
  display: flex;

  justify-content: space-between;

  color: #000;
  font-size: 16px;
  font-weight: 600;
  width: 100%;

  .red {
    color: red;
  }
`;

const TableWrapper = styled.div`
  padding: 17px;
  flex-direction: column;
  background-color: white;
  border-radius: 27px;
`;

export {
  ButtonWrapper,
  InfoContainer,
  InfoPage,
  InputWrapper,
  Item,
  TableWrapper,
  Title,
  TitleWrapper,
  Wrapper,
};
