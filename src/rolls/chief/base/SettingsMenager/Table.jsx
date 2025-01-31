import React, { useEffect, useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../../../assets/svg/LeftArrow";
import RightArrow from "../../../../assets/svg/RightArrow";
import styled from "styled-components";
import ModalManager from "./Modal";
import { useLanguage } from "../../../../context/LanguageContext";
import { useGetDistrictById } from "../../../../utils/server/server"; // Import to'g'ri qilingan
import Instance from "../../../../utils/Instance";
import { DatFormatter } from "../../../../utils/DatFormatter";

const Container = styled.div`
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const Table = ({ title = "", data = [], isLoading = false }) => {
  const [openModalId, setOpenModalId] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [districtInfo, setDistrictInfo] = useState({});
  const { translate, language } = useLanguage();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

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

  const fetchDistrictName = async (districtId) => {
    if (districtInfo[districtId]) return;
    try {
      const response = await Instance.get(
        `/v1/auth/district?districtId=${districtId}`
      );
      setDistrictInfo((prev) => ({ ...prev, [districtId]: response.data }));
    } catch (error) {
      console.error("Error fetching district data", error);
    }
  };

  useEffect(() => {
    data.forEach((row) => {
      if (row.districtId && !districtInfo[row.districtId]) {
        fetchDistrictName(row.districtId);
      }
    });
  }, [data]);

  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Container>
      {isLoading && (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      )}

      <ModalManager isOpen={activeModal} onClose={closeModal} />
      {/* {activeModal === 5 && <Modal5  />} */}

      <WhiteWrapper>
        <TitleSmall>{title}</TitleSmall>
        <ResponsiveTableAdmin>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th className="idfixed">{translate("Fullname_doctor")}</th>
                <th>{translate("Зона_отвественности")}</th>
                <th>{translate("Дата_назначения")}</th>
                <th colSpan={2}>{translate("Выполнение_KPI")}</th>
                <th>{translate("Открыть")}</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <tr key={row?.userId}>
                    <td>№{row?.id || index + 1}</td>
                    <td className="idfixed">
                      {row?.lastName ?? " "} {row?.firstName ?? ""}{" "}
                      {row?.middleName ?? ""}
                    </td>
                    <td>
                      {language === "en"
                        ? districtInfo[row.districtId]?.name
                        : ""}
                      {language === "ru"
                        ? districtInfo[row.districtId]?.nameRussian
                        : ""}
                      {language === "uz"
                        ? districtInfo[row.districtId]?.nameUzLatin
                        : ""}
                    </td>
                    <td>
                      {translate("Создан")}{" "}
                      {DatFormatter(row?.dateOfBirth || "2025-05-25")}
                    </td>
                    <td colSpan={2}>
                      <div className="progressKPI">{row?.progress}</div>
                    </td>
                    <td>
                      <button
                        onClick={() => setActiveModal(true)}
                        className="Viewbutton"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            opacity="0.5"
                            d="M2 12C2 13.6 2.4 14.2 3.3 15.3C5 17.5 7.8 20 12 20C16.2 20 19 17.5 20.7 15.3C21.6 14.2 22 13.6 22 12C22 10.4 21.6 9.8 20.7 8.7C19 6.5 16.2 4 12 4C7.8 4 5 6.5 3.3 8.7C2.4 9.8 2 10.4 2 12Z"
                            fill="#343434"
                          />
                          <path
                            d="M8.25 12C8.25 9.9 9.9 8.25 12 8.25C14.1 8.25 15.75 9.9 15.75 12C15.75 14.1 14.1 15.75 12 15.75C9.9 15.75 8.25 14.1 8.25 12ZM9.75 12C9.75 10.8 10.8 9.75 12 9.75C13.2 9.75 14.25 10.8 14.25 12C14.25 13.2 13.2 14.25 12 14.25C10.8 14.25 9.75 13.2 9.75 12Z"
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
            {currentPage + 1} {translate("from")} {totalPages}
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
