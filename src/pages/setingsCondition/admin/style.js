import styled from "styled-components";

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SettingsCards = styled.div`
  display: grid;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

SettingsCards.Con = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

SettingsCards.Filter = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ResponsiveTable = styled.div`
  overflow-x: auto; /* Scrollable */
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: left; /* Matn hizalash */
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
    }
  }

  .idfixed {
    position: sticky;
    left: 0;
  }
  /* Status uchun maxsus rang */
  .status {
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff; /* Matn oq rang */
    text-align: center;

    width: 200px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status.active {
    background-color: #84ffbd; /* Yashil fon */
    color: #000;
  }

  .status.inactive {
    background-color: #fb3748; /* Qizil fon */
  }
  .status.nemoder {
    background-color: #ffdb43; /* Qizil fon */
    color: #000;
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
    text-align: left !important;
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

      &:hover {
        background-color: #f7f8fc; /* Jadval uyalarining default foni */
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
`;

export { SettingsContainer, SettingsCards, ResponsiveTable };
