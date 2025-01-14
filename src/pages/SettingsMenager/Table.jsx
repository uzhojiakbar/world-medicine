import React, { useEffect, useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../assets/svg/LeftArrow";
import RightArrow from "../../assets/svg/RightArrow";
import styled from "styled-components";
import ModalManager from "./Modal";
import { useLanguage } from "../../context/LanguageContext";
import { useGetDistrictById } from "../../utils/server/server"; // Import to'g'ri qilingan
import Instance from "../../utils/Instance";
import { DatFormatter } from "../../utils/DatFormatter";

const Container = styled.div`
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const Table = ({ title = "", data = [], isLoading = false }) => {
  const [openModalId, setOpenModalId] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [districtInfo, setDistrictInfo] = useState([]); // Initial state as empty array

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1); // page ni birga oshirish
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1); // page ni birga kamaytirish
    }
  };

  const { translate, language } = useLanguage();

  const CurrentData1 = async (regId, DisId) => {
    try {
      // API so'rovini yuborish
      const response = await Instance.get(
        `/v1/auth/districts?regionId=${regId}`
      );

      // API'dan qaytgan districtlarni tekshirish
      const district = response.data.find(
        (district) => district.districtId === DisId
      );

      if (!district) throw new Error("District not found");

      return district; // districtName ni qaytarish
    } catch (error) {
      console.error("Error fetching district data", error);
      return null;
    }
  };

  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const currentPageData = districtInfo.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = [];
      for (let row of data) {
        // `CurrentData1` funksiyasini async sifatida chaqirib, await bilan kutamiz
        const districtName = await CurrentData1(1, row?.districtId); // Har bir row uchun district ma'lumotini olish
        updatedData.push({ ...row, districtName }); // districtName ni rowga qo'shish
      }

      setDistrictInfo(updatedData); // districtInfo ni yangilash
    };

    if (currentData.length > 0 && districtInfo.length === 0) {
      fetchData(); // currentData mavjud bo'lsa, fetchData chaqirilsin
    }
  }, [currentData, currentPage]); // currentData yoki districtInfo.length o'zgarganda qayta ishlaydi

  return (
    <Container>
      {isLoading || !districtInfo.length ? (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}

      <ModalManager id={openModalId} setId={setOpenModalId} />

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
              {currentPageData.length > 0 ? (
                currentPageData.map((row, index) => (
                  <tr key={row?.userId}>
                    <td>№{row?.id || index + 1}</td>
                    <td className="idfixed">
                      {row?.firstName + " "}
                      {(row?.middleName ?? "") + " "}
                      {row?.lastName ?? ""}
                    </td>
                    <td>
                      {language === "en" ? row?.districtName?.name : ""}
                      {language === "ru" ? row?.districtName?.nameRussian : ""}
                      {language === "uz" ? row?.districtName?.nameUzLatin : ""}
                    </td>{" "}
                    {/* Directly use districtName */}
                    <td>
                      {translate("Создан")}{" "}
                      {DatFormatter(row?.dateOfBirth || "2025-05-25")}
                    </td>
                    <td colSpan={2}>
                      <div className="progressKPI">{row?.progress}</div>
                    </td>
                    <td>
                      <button className="Viewbutton">
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
