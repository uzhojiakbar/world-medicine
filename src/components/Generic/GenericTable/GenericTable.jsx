import styled from "styled-components";
import { useState } from "react";
import ArrowLeft from "../../../assets/svg/ArrowLeft";

import RightArrow from "../../../assets/svg/RightArrow";
import EyeIcon from "../../../assets/svg/Eye";

const Wrapper = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  th,
  td {
    text-align: center;
    padding: 8px;
  }

  tbody > tr {
    height: 60px;
    border-radius: 27px;
    background-color: #f7f8fc;
  }

  thead > tr {
    background-color: white;
  }
  thead > tr > th:nth-child(1) {
    width: 50px;
  }

  .left {
    text-align: left;
  }
  th {
    text-align: center;
    color: #00000080;
  }

  .isOpen {
    padding: 7px;
  }

  @media (max-width: 760px) {
    th,
    td {
      font-size: 12px;
      padding: 6px;
    }
  }

  @media (max-width: 424px) {
    th,
    td {
      font-size: 10px;
      padding: 4px;
    }
  }
`;

const IsOpen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 3px;
  background-color: white;

  @media (max-width: 424px) {
    padding: 3px;
  }
`;

const Button = styled.button`
  gap: 10px;
  border-radius: 5px;
  width: 138px;
  height: 40px;
  border: none;
  border-radius: 3px;
  background-color: #f7f8fc;
  color: black;

  @media (max-width: 760px) {
    width: 100px;
    height: 35px;
    font-size: 14px;
  }

  @media (max-width: 424px) {
    width: 80px;
    height: 30px;
    font-size: 12px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;

  @media (max-width: 760px) {
    gap: 10px;
  }
`;

const GenericTable = ({ thead = [], data = [] }) => {
  const itemsPerPage = 5; // Har sahifada nechta element bo'lishi kerak
  const totalPages = Math.ceil(data.length / itemsPerPage); // Umumiy sahifalar soni
  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Sahifa almashtirish funksiyalari
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Wrapper>
      <TableStyled>
        <thead>
          <tr>
            <th></th>
            {thead.map((v, i) => (
              <th className={i == 0 ? "left" : ""} key={v}>
                {v}
              </th>
            ))}
            <th>Открыть</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>№{index + 1}</td>
              {Object.keys(row).map((v, i) => {
                return (
                  <td className={i == 0 ? "left" : ""} key={i}>
                    {row[v]}
                  </td>
                );
              })}
              <td className="isOpen">
                <IsOpen>
                  <EyeIcon />
                </IsOpen>
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyled>
      <Footer>
        <Button onClick={handlePrev} disabled={currentPage === 1}>
          <ArrowLeft></ArrowLeft>
        </Button>

        {/* Sahifa raqami */}
        <span>
          {currentPage} / {totalPages}
        </span>

        {/* Keyingi tugma */}
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          <RightArrow />
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default GenericTable;
