import styled from "styled-components";

// Umumiy konteyner komponenti
const CardContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

// Umumiy karta (box) komponenti
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  padding: 20px;

  color: ${(props) => (props.active == "true" ? "#fff" : "#000")};
  font-family: "Vela Sans GX", sans-serif;

  background-color: ${(props) =>
    props.active == "true" ? "#0026ca" : "#f5f5f5"};
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: #0026ca;
    opacity: 0.9;
    color: white;
  }
`;

// Matn komponentlari
const CardTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`;

export { CardContainer, Card, CardTitle, CardValue };
