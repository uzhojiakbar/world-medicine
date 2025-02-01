import styled from "styled-components";

import { Modal } from "antd";

const ModalOverlay = styled(Modal)`
  width: ${({ w }) => (w ? `${w} !important ` : "70vw !important")};
  max-height: 90vh !important;
  overflow: auto;

  .ant-modal-close {
    display: none !important;
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 1;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Stat = styled.div`
  background: ${(props) => (props.active ? "#ffd700" : "#f5f5f5")};
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;

  th {
    text-align: center;
    padding: 8px;
  }

  .left {
    text-align: left;
  }
  th {
    text-align: center;
    color: #00000080;
  }

  .isOpen {
    padding: 0 7px;
    width: 290px;
  }

  @media (max-width: 760px) {
    th {
      font-size: 12px;
      padding: 6px;
    }
  }

  @media (max-width: 424px) {
    th {
      font-size: 10px;
      padding: 4px;
    }
  }
`;

const TableRow = styled.tr`
  height: 60px;
  border-radius: 27px;
  background-color: ${({ background }) => background || "#F7F8FC"};
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  /* float: right; */
`;

const Item = styled.td`
  text-align: center;
  padding: 8px;
  color: ${({ textcolor }) => textcolor || "black"};
  width: 350px;

  @media (max-width: 760px) {
    font-size: 12px;
    padding: 6px;
    width: 200px;
  }
  @media (max-width: 424px) {
    font-size: 10px;
    padding: 4px;
    width: 1500px;
  }
`;

export {
  ModalOverlay,
  ModalContainer,
  FilterContainer,
  Select,
  StatsContainer,
  Stat,
  TableStyled,
  TableRow,
  CloseButton,
  Item,
};
