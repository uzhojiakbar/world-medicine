import styled from "styled-components";

const QuickAccessPContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 770px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 460px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const QAccessButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: white;
  padding: 16px;

  font-family: "Vela Sans GX";
  font-size: 22px;
  font-weight: 700;
  line-height: 32.78px;
  text-align: left;
  border-radius: 10px;

  transition: all 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #216bf4;
    color: #fff;
    & svg path {
      fill: white;
    }
  }
`;

export { QuickAccessPContainer, QAccessButton };
