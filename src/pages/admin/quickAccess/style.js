import styled from "styled-components";

const QuickAccessPContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ count }) => (count ? count : 3)}, 1fr);
  width: 100%;
  gap: 20px;
  grid-auto-rows: auto; /* Bu qator balandligini avtomatik ravishda moslashtiradi */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

  min-width: 320px;
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
