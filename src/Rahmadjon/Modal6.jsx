import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 80%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #f5f5f5;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;

const data = [
  {
    name: "Баранова Мария Алексеевна",
    region: "Шайхантохур",
    clinic: "Medion Clinic",
    specialty: "Терапевт",
    phone: "97 727 0131",
    issued: 40,
    correction: 20,
    percent: "50%",
  },
  {
    name: "Смирнова Анна Ивановна",
    region: "Мирзо-Улугбекский",
    clinic: "MediCare Clinic",
    specialty: "Педиатр",
    phone: "97 555 9876",
    issued: 25,
    correction: 12.5,
    percent: "50%",
  },
];

const Modal6 = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Поиск выписок по фильтрам</h2>

        <FilterContainer>
          <Select>
            <option>Ф.И.О</option>
          </Select>
          <Select>
            <option>Район</option>
          </Select>
          <Select>
            <option>ЛПУ</option>
          </Select>
          <Select>
            <option>Специальность</option>
          </Select>
          <Select>
            <option>Выписано</option>
          </Select>
        </FilterContainer>

        <StatsContainer>
          <Stat>Продано 1000</Stat>
          <Stat active>Выписано 950</Stat>
          <Stat>Дозволено 90% (900)</Stat>
          <Stat>Оставлено 900 (90%)</Stat>
        </StatsContainer>

        <Table>
          <thead>
            <tr>
              <Th>Ф.И.О</Th>
              <Th>Район</Th>
              <Th>ЛПУ</Th>
              <Th>Специальность</Th>
              <Th>Телефон</Th>
              <Th>Выписано</Th>
              <Th>Коррекция</Th>
              <Th>Процент</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <Td>{row.name}</Td>
                <Td>{row.region}</Td>
                <Td>{row.clinic}</Td>
                <Td>{row.specialty}</Td>
                <Td>{row.phone}</Td>
                <Td>{row.issued}</Td>
                <Td>{row.correction}</Td>
                <Td>{row.percent}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal6;
