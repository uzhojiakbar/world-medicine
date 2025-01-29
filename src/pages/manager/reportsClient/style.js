import styled from "styled-components";

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
  padding: 14px 20px;
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

export { ButtonWrapper, Item };
