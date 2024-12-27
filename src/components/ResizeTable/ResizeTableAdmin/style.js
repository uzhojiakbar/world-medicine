import styled from "styled-components";

export const ResponsiveTableAdmin = styled.div`
  overflow-x: auto; /* Scrollable */
  width: 100%;

  * > {
    transition: all 0.2s ease-in-out;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: center; /* Matn hizalash */
    font-family: "Vela Sans GX", sans-serif;
  }

  th {
    background-color: white; /* Header fon rangi */
    font-weight: 700; /* Qalin matn */

    color: #00000033;
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 600;

    padding: 18px 12px; /* Yuqoridan va pastdan */
  }

  td {
    color: #333; /* Default matn rangi */
    padding: 17px !important;

    background-color: #f7f8fc; /* Jadval uyalarining default foni */

    > button {
      border: none;
      outline: none;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    > input {
      width: 100%;
    }
  }

  .empty {
    height: 400px;
    background-color: var(--bg-color);

    &:hover {
      background-color: var(--bg-color);
    }
  }

  .idfixed {
    position: sticky;
    left: 0;
  }

  .progressKPI {
    background-color: white;
    padding: 10px;
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 700;
    font-size: 18px;
  }

  .Viewbutton {
    background-color: white;
    width: 100%;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 1;
      transform: scale(1.01);
    }
  }

  tr {
    background-color: #f7f8fc; /* Jadval uyalarining default foni */
    padding: 18px 12px;
  }
  tr:hover {
    td {
      background-color: #f1f1f1; /* Hover effekti */
    }
  }

  tbody tr {
    border-bottom: 10px solid white;
  }

  thead tr th {
    text-align: center !important;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;

    > button {
      background-color: white;
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;

      &:active {
        opacity: 0.5;
      }
    }
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 12px;
      padding: 8px;
    }
  }

  .flex {
    display: flex !important;
    align-items: center;
    height: 100%;
    justify-content: center;
  }
`;

export const PaginationButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;

  color: #000;
  font-family: "Vela Sans GX", sans-serif !important;
  font-weight: 900;

  button {
    background-color: var(--bg-color);
    padding: 10px 70px;
    color: black;

    border: none;
    outline: none;

    font-family: "Vela Sans GX", sans-serif;
    font-weight: 900;

    cursor: pointer;

    &svg path {
      fill: black;
    }

    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.2;
    }

    &:disabled {
      color: red;
      & svg path {
        stroke: #dbe7f5;
      }
    }
  }

  @media (max-width: 600px) {
    button {
      padding: 10px 20px;
    }
  }
`;
