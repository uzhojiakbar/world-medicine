import React, { useEffect, useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../../assets/svg/LeftArrow";
import RightArrow from "../../../assets/svg/RightArrow";
import styled from "styled-components";
import ModalManager from "./Modal";
import { useLanguage } from "../../../context/LanguageContext";
import PropTypes from "prop-types";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const Table = ({ data, loading }) => {
  const [openModalId, setOpenModalId] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

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

  const currentData = data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const { translate } = useLanguage();

  // return <span>salom</span>;
  if (currentData)
    return (
      <Container>
        {loading ? (
          <div className="loaderParent">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}

        <ModalManager id={openModalId} setId={setOpenModalId} />

        <WhiteWrapper>
          <ResponsiveTableAdmin>
            <table>
              <thead>
                <tr>
                  <th className="idfixed">{translate("Препарат")}</th>
                  <th>{translate("квота")}</th>
                  <th>{translate("Выписано")}</th>
                  <th>{translate("Рецептурник")}</th>
                  <th>{translate("СУ")}</th>
                  <th>{translate("СБ")}</th>
                  <th>{translate("ГЗ")}</th>
                  <th>{translate("КВ")}</th>
                  <th>{translate("Подробнее")}</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((row, index) => (
                    <tr key={row?.id || index}>
                      <td className="idfixed">
                        {row?.medicinesWithQuantities?.length
                          ? `${
                              row?.medicinesWithQuantities?.[0]?.medicine?.name
                            }${
                              row?.medicinesWithQuantities?.length > 1
                                ? ` + ${
                                    row?.medicinesWithQuantities?.length - 1
                                  }`
                                : ""
                            }`
                          : ""}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) => sum + (item?.quote || 0),
                          0
                        )}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) =>
                            sum + (item?.contractMedicineAmount?.amount || 0),
                          0
                        )}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) => sum + (item?.prescription || 0),
                          0
                        )}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) => sum + (item?.medicine?.suBall || 0),
                          0
                        )}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) => sum + (item?.medicine?.sbBall || 0),
                          0
                        )}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) => sum + (item?.medicine?.gzBall || 0),
                          0
                        )}
                      </td>
                      <td>
                        {row?.medicinesWithQuantities?.reduce(
                          (sum, item) => sum + (item?.medicine?.kbBall || 0),
                          0
                        )}
                      </td>
                      <td>
                        <button
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
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                              fill="#343434"
                            />
                          </svg>
                        </button>
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
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
            >
              <RightArrow />
            </button>
          </PaginationButtonsWrapper>
        </WhiteWrapper>
      </Container>
    );
};

Table.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Table;
