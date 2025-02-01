import styled from "styled-components";
import { useState } from "react";
import PenIcon from "../../../assets/svg/penIcon";
import { Input } from "antd";
import UsloviyaModal from "./Modal/Modal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
//   justify-content: space-between;
    gap:20px
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

const IsOpen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 0;
  border-radius: 3px;
  background-color: ${({ color, btn }) => !btn && (color || "white")};
  transition: all 0.1s; 

  &:hover {
  background-color: ${({ color, btn }) => !btn && (color || "#efefef")};

    cursor: ${({ btn }) => !btn && "pointer"};
    opacity: ${({ btn }) => !btn && "0.90"};
  }
  @media (max-width: 424px) {
    padding: 3px;
  }
`;

const Button = styled.button`
  gap: 10px;
  border-radius: 5px;
  width: ${({ wdth }) => (wdth ? "100%" : "138px")};
  height: ${({ wdth }) => (wdth ? "63px" : "40px")};
  border: none;
  border-radius: 3px;
  background-color: ${({ btn }) => (btn ? "white" : "#f7f8fc")};
  color: black;
  transition: all 0.2s;

  /* color: #fff; */

  font-size: ${({ wdth }) => (wdth ? "24px" : "")};
  font-weight: ${({ wdth }) => (wdth ? "400" : "")};

  &:hover {
    cursor: pointer;
    background-color: #e9e9e9;
  }

  @media (max-width: 760px) {
    width: 100px;
    height: 35px;
    font-size: 14px;
  }

  @media (max-width: 424px) {
    width: 50px;
    height: 30px;
    font-size: 10px;
  }
`;

const SendButton = styled(Button)`
  background-color: ${({ send }) => (!send ? "#F7F8FC" : "#216BF4")};
  color: ${({ send }) => (!send ? "#00000080 " : "white")};
  border-radius: 7px;
  &:hover {
    background-color: ${({ send }) => (!send ? "#e5e5e5" : "#1f5dd1")};
  }
  width: 100%;
  @media (max-width: 760px) {
    height: 35px;
    font-size: 14px;
  }

  @media (max-width: 424px) {
    height: 30px;
    font-size: 8px;
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

const ChangeInput = styled(Input)`
  background-color: white;
  border-radius: 10px;
  display: inline-block;
  height: 40px;
  border: none !important;

  width: 100%;
  font-size: 16px;

  @media (max-width: 760px) {
    font-size: 14px;
  }
  @media (max-width: 424px) {
    font-size: 10px;
  }
`;

const GenericTable = ({ thead = [], data = [] }) => {

  const [openModalId, setOpenModalId] = useState(false);
  const [loading, setLoading] = useState(0);





  return (

    <Wrapper>
      {loading ? (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}

      <TableStyled>
        <thead>
          <tr>
            {thead.map((v, i) => (
              <th className={i == 0 ? "left" : ""} key={v}>
                {v}
              </th>
            ))}
            <th>Открыть</th>
          </tr>
        </thead>
        <tbody>
          <UsloviyaModal setId={setOpenModalId} id={openModalId} thead={["Препараты", "Выписано", "Дозволено", "Продано"]}
            data={data} />
          {data.map((row, index) => {
            let k = data.length
            let col = row.colors.bgcolorr;
            return (
              <TableRow key={row?.id} background={col}>
                {row.data.map((v, i) => {
                  const colors = row.colors;
                  return (
                    <Item {...colors} className={i == 0 ? "left" : ""} key={i}>

                      {v}

                    </Item>
                  );
                })}
                <td className="isOpen">
                  {
                    <IsOpen
                      color={row.colors.iconbgcolor}

                      onClick={() => setOpenModalId(true)}

                    >
                      <PenIcon
                        color={
                          row.colors.iconcolor ? row.colors.iconcolor : "black"
                        }
                      />
                    </IsOpen>
                  }
                </td>
              </TableRow>
            );
          })}
        </tbody>
      </TableStyled>
      <Footer>
        <SendButton wdth="true" onClick={() => { }}>
          Отправить счет
        </SendButton>
      </Footer>
    </Wrapper>
  );
};

export default GenericTable;