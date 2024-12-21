import styled from "styled-components";

// Main container for all chart blocks
export const ChartBlockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns for large screens */
  grid-template-rows: repeat(2, 350px); /* Two columns for large screens */
  grid-gap: 20px; /* Space between the grid items */
  padding: 20px;
  background-color: white;

  .chart-item {
    /* Each chart item will have equal width and responsive height */
    width: 100%;
    height: auto;
  }

  /* For smaller screens, we change the grid to 1 column */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
