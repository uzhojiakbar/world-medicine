import React from "react";
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
  background: red;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
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

const tableData = [
  {
    id: 1,
    data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
    highlight: true,
    colors: {
      iconcolor: "#FB3748",
      textcolor: "black",
    },
  },
  {
    id: 1,
    data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
    highlight: true,
    colors: {
      bgcolorr: "#FFDB43",
      textcolor: "black",
      iconcolor: "#216BF4",
    },
  },
  {
    id: 1,
    data: ["Артрокол р-р д/ин амп.10мг/2мл №5", "XX", "XX", "XX"],
    highlight: true,
    colors: {
      bgcolorr: "#FB3748",
      iconbgcolor: "#e1858d",
      iconcolor: "white",
      textcolor: "white",
    },
  },
];

const UsloviyaModal = ({ setId = () => { }, id = 0, thead = [], data = [] }) => {
  if (data.length) {
    data = tableData
  }
  return (
    <ModalOverlay open={id}
      onOk={() => setId(false)}
      onCancel={() => setId(false)}
      footer={[]}
      centered>
      <ModalContainer>
        <CloseButton onClick={() => setId(false)}>X</CloseButton>
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
          <Stat active="true">Выписано 950</Stat>
          <Stat>Дозволено 90% (900)</Stat>
          <Stat>Оставлено 900 (90%)</Stat>
        </StatsContainer>

        <TableStyled>
          <thead>
            <tr>
              {thead.map((v, i) => (
                <th className={i == 0 ? "left" : ""} key={v}>
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {data.map((row, index) => {
              let col = row?.colors?.bgcolorr;
              let k = row?.data?.length + 1

              return (
                <TableRow key={index} background={col}>
                  {row?.data?.map((v, i) => {
                    k++
                    const colors = row.colors;
                    return (
                      <Item {...colors} className={i == 0 ? "left" : ""} key={k}>

                        {v}

                      </Item>
                    );
                  })}

                </TableRow>
              );
            })}
          </tbody>
        </TableStyled>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UsloviyaModal;
