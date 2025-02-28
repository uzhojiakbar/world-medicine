import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  // margin-top: 171px;
  width: 100%;
  /* overflow: scroll; */
  padding: 0 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
    font-size: ${({size}) => (size ? size : "24px")};
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 700;
    @media (max-width: 765px) {
        font-size: 18px;
    }
    /* width: 339px; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
  /* width: 100%; */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
   align-items: center;
  justify-content: center; 
  padding: 10px 0;
  width: 100%;
  max-width: 100%;
  border-radius: 7px;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  background-color: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }

  font-size: ${({ size }) => (size ? size : "24px")};
  font-weight: 700;
  @media (max-width: 765px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
  }
`;

const InfoPage = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid #fafafa;
  background: #fff;
  gap: 10px;
  border-radius: 27px;

  @media (max-width: 765px) {
    flex-direction: column;
  }
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
  overflow: scroll;
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
