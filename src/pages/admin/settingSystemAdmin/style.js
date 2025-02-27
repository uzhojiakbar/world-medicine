import styled from "styled-components";

export const Container = styled.div`
  background: var(--bg-color);

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-bottom: 200px;

  min-width: 300px;

  position: relative;
`;

export const FilterCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: white !important;

  padding: 20px;

  .cards {
    display: grid;
    grid-template-columns: repeat(${({grid})=>grid?grid:5}, 1fr);
    gap: 10px;
  }

  .ant-checkbox-wrapper {
    background-color: var(--bg-color) !important; /* Orqa fon */

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    gap: 10px;

    font-size: 16px;
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 700;

    height: 60px;
    padding: 20px;

    user-select: none;

    &::after {
      display: none;
    }
  }

  .ant-checkbox .ant-checkbox-inner {
    width: 20px; /* Checkbox kattaligi */
    height: 20px;
    border-radius: 4px; /* Yaltiroq burchak */
    border: 1px solid #10193a;
  }

  @media (max-width: 1024px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
`;
