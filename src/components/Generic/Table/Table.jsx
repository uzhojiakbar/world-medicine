import React from "react";
import styled from "styled-components";

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const StatusTag = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ status }) =>
    status === "Активен" ? "#4caf50" : "#f44336"};
  color: white;
`;

const Table = ({ title, data }) => {
  return (
    <>
      <h3>{title}</h3>
      <TableStyled>
        <thead>
          <tr>
            <th>№</th>
            <th>Ф.И.О.</th>
            <th>Место работы</th>
            <th>Дата создания</th>
            <th>Статус</th>
            <th>Выполнено (KPI)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.workplace}</td>
              <td>{row.createdDate}</td>
              <td>
                <StatusTag status={row.status}>{row.status}</StatusTag>
              </td>
              <td>{row.kpi}</td>
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </>
  );
};

export default Table;
