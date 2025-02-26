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

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;

  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 20px;
  width: 100%;

  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  background: #f7f8fc;

  transition: all 0.3s;
  &:hover {
    background-color: #e7e7e7;
  }
`;

const TableStyled = styled.table`
  overflow-y: auto;
  width: 100%;
  border-collapse: collapse;
  border: none;
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
    th,
    td {
      font-size: 12px;
      padding: 6px;
    }
  }

  @media (max-width: 424px) {
    th {
      font-size: 10px;
      padding: 4px;
    }
    overflow: auto;
  }
`;

const TableRow = styled.tr`
  height: 60px;
  border-radius: 27px;
  background-color: ${({ background }) => background || "#F7F8FC"};
  transition: all 0.3s;
  &:hover {
    filter: brightness(85%);
  }
  .edit {
    max-width: 135px;    
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  /* float: right; */
  transition: all 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const Item = styled.td`
  text-align: center;
  padding: 8px;
  color: ${({ textcolor }) => textcolor || "black"};
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;

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

const Title = styled.div`
  font-size: ${({ size }) => (size ? size : "24px")};
  font-weight: 700;
  @media (max-width: 765px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
  }
  width: 339px;
`;

const ChangeRow = styled.div`
 background-color: white;
  max-width: 120px;
  padding: 7px;
  border-radius: 8px;
  position: relative;
`
const IconChange = styled.div`
    position: absolute;
  right: 5px;
  top: 0;
  cursor: pointer;
  
;
`;


const InputWrapper = styled.input`
    position: relative;
    display: inline-block;
    border: none !important;

    width: 100%;
  padding: 10px;
  padding-right: 20px;
    font-size: 12px;
    font-family: "Vela Sans GX";
    outline: none;
    &::placeholder {
        text-transform: capitalize;
    }
`;
const Wrapp = styled.div`
    position: relative;
`
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
  Title,
  ChangeRow,
  IconChange,
  InputWrapper,
  Wrapp
};
