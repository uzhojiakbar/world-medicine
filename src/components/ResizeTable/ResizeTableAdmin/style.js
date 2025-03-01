import styled from "styled-components";

export const ResponsiveTableAdmin = styled.table`
    overflow-x: auto; /* Scrollable */
    width: 100%;
    
    * > {
        transition: all 0.2s ease-in-out;
    }

    table {
        width: 100%;
        border-radius: 10px;

        border-collapse: collapse;
    }

    th,
    td {
        text-align: center; /* Matn hizalash */
        font-family: "Vela Sans GX Bold", sans-serif;
    }

    th {
        background-color: white; /* Header fon rangi */
        color: #00000033;
        font-family: "Vela Sans GX", sans-serif;
        font-weight: 600;

        padding: 18px 12px; /* Yuqoridan va pastdan */
    }

    td {
        color: #333; /* Default matn rangi */
        padding: 17px !important;
        height: 100%;
        border: none;
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

        &:first-child {
            border-top-left-radius: 15px !important;
            border-bottom-left-radius: 15px !important;
        }

        &:last-child {
            border-top-right-radius: 15px !important;
            border-bottom-right-radius: 15px !important;
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
        top: 30px;
        height: 100% !important;
        display: flex;
        align-content: center;
        justify-content: left;
        gap: 10px;

        span {
            padding: 10px;
            font-family: "Vela Sans GX", sans-serif;
            text-align: center;
            vertical-align: center;
        }
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
        height: 100%;
        padding: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        font-size: 20px;

        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 0.7;
            background-color: var(--bg-color);
        }

        &:active {
            opacity: 1;
            transform: scale(1.01);
        }
    }

    .viewButtonSmall {
        background-color: white;
        width: 50%;
        height: 100%;
        padding: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        font-size: 20px;
        margin: 0 auto;
        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 0.7;
            background-color: var(--bg-color);
        }

        &:active {
            opacity: 1;
            transform: scale(1.01);
        }
    }

    .colorBlue {
        color: #216bf4;
        height: 100%;
    }

    .colorRed {
        color: #fb3748;
        height: 100%;
    }

    tr {
        padding: 18px 12px;
    }

    tr:hover {
        td {
            background-color: #f1f1f1; /* Hover effekti */
        }
    }

    tbody {
        /* border-bottom: 10px solid white; */
        height: 100%;
        
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
        height: 100%;

        > button {
            background-color: white;
            padding: 5px 20px;
            border-radius: 5px;
            cursor: pointer;
            height: 100%;

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
