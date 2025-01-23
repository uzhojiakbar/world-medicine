import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin: 50px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
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
  background-color: ${(props) => (props.active ? "#007bff" : "#F7F8FC")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e9ecef")};
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;
  border-radius: 27px;
  background-color: #fafafa;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: #f7f8fc;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: ${({ edit }) => edit && "center"};

  > .checkIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 5px;

    background-color: #216bf4;
    &:hover {
      background-color: rgb(56, 122, 245);
    }
  }
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f7f8fc;
  width: 100%;
  border-radius: 10px;
  padding: 0 20px;
  padding-top: 17px;
  font-size: 16px;
  font-weight: 600;
`;

const MiniItemWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  width: fit-content;
  background-color: #f7f8fc;
  border-radius: 10px;
`;

const MiniItem = styled.div`
  width: 150px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;

  cursor: ${({ btn }) => btn && "pointer"};
  transition: all 0.2s;
  &:hover {
    background-color: ${({ btn }) => btn && " rgb(230, 232, 239)"};
  }
  transition: all 0.2s;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid rgb(205, 204, 204);
  outline: none;
`;

const TableWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 27px;
`;

export {
  Container,
  ButtonWrapper,
  Item,
  Wrap,
  Info,
  InfoWrapper,
  InfoCard,
  MiniItem,
  MiniItemWrapper,
  Input,
  TableWrapper,
};
