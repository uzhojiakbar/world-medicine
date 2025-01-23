import React, { useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../../../assets/svg/LeftArrow";
import RightArrow from "../../../../assets/svg/RightArrow";
import styled from "styled-components";
import { useLanguage } from "../../../../context/LanguageContext";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const Wrap = styled.th`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  /* height: ${({ td }) => (td ? "56px" : "60px")}; */
  background-color: ${({ td }) => td && "#f7f8fc"} !important;

  &:hover {
    background-color: ${({ td }) => td && " #f1f1f1"} !important;
  }
`;

const Line = styled.div`
  width: 2px;
  height: 10px;
  background-color: #00000033;
`;

const Table = ({ title = "", data = [] }) => {
  const [loading, setLoading] = useState(0);
  const [openModalId, setOpenModalId] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const { translate } = useLanguage();

  return (
    <Container>
      {loading ? (
        <div className="loaderParent">
          <div class="loader"></div>
        </div>
      ) : (
        ""
      )}

      <WhiteWrapper>
        <TitleSmall>{title}</TitleSmall>
        <ResponsiveTableAdmin>
          <table>
            <thead>
              <tr>
                <th>{translate("Препарат")}</th>
                <th className="idfixed">{translate("Цена препарата")}</th>
                <th>{translate("Баллы")}</th>

                <Wrap>
                  <Line />
                </Wrap>
                <th colSpan={"2"}>{translate("СУ")}</th>

                <Wrap>
                  <Line />
                </Wrap>
                <th colSpan={"2"}>{translate("СБ")}</th>
                <Wrap>
                  <Line />
                </Wrap>
                <th colSpan={"2"}>{translate("ГЗ")}</th>
                <Wrap>
                  <Line />
                </Wrap>
                <th>{translate("Открыть")}</th>
              </tr>
              <tr>
                <th>{translate("Введите название товара")}</th>
                <th className="idfixed">{translate("X Сум")}</th>
                <th>{translate("X")}</th>
                <Wrap>
                  <Line />
                </Wrap>
                <th>{translate("Количество")}</th>
                <th>{translate("Сумма")}</th>
                <Wrap>
                  <Line />
                </Wrap>

                <th>{translate("Количество")}</th>
                <th>{translate("Сумма")}</th>
                <Wrap>
                  <Line />
                </Wrap>

                <th>{translate("Количество")}</th>
                <th>{translate("Сумма")}</th>
                <Wrap>
                  <Line />
                </Wrap>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((row) => (
                  <tr key={row?.id}>
                    <td>{row?.preparation}</td>
                    <td className="idfixed">{row?.xSum}</td>
                    <td>{row?.x}</td>
                    <Wrap td="ture">
                      <Line />
                    </Wrap>
                    {row?.su.length > 0 && <td>{row?.su[0]}</td>}
                    {row?.su.length > 0 && <td>{row?.su[1]}</td>}
                    <Wrap td="ture">
                      <Line />
                    </Wrap>
                    {row?.sb.length > 0 && <td>{row?.su[0]}</td>}
                    {row?.sb.length > 0 && <td>{row?.su[1]}</td>}
                    <Wrap td="ture">
                      <Line />
                    </Wrap>
                    {row?.gz.length > 0 && <td>{row?.su[0]}</td>}
                    {row?.gz.length > 0 && <td>{row?.su[1]}</td>}
                    <Wrap td="ture">
                      <Line />
                    </Wrap>
                    <td>
                      {/* <button
                        onClick={() => setOpenModalId(row.id)}
                        className="Viewbutton"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.5"
                            d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12Z"
                            fill="#343434"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                            fill="#343434"
                          />
                        </svg>
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="empty"
                    colSpan="6"
                    style={{ textAlign: "center" }}
                  >
                    {translate("notInformation")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ResponsiveTableAdmin>

        <PaginationButtonsWrapper>
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            <LeftArrow />
          </button>
          <span>
            {currentPage + 1} {translate("from")} {""} {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            <RightArrow />
          </button>
        </PaginationButtonsWrapper>
      </WhiteWrapper>
    </Container>
  );
};

export default Table;
