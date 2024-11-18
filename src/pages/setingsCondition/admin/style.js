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
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 14px;
      padding: 6px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 12px;
      padding: 4px;
    }
  }
`;

export { SettingsContainer, SettingsCards, ResponsiveTable };
