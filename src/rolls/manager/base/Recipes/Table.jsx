import React, { useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../../../root/style";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../../../assets/svg/LeftArrow";
import RightArrow from "../../../../assets/svg/RightArrow";
import styled from "styled-components";
import ModalPrescription from "./Modal";
import { useLanguage } from "../../../../context/LanguageContext";
import {useGetRecepiesFilter} from "../../../../utils/server/server.js";
import {useQueryClient} from "@tanstack/react-query";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const Table = ({ title = "", filter={} }) => {
  const { translate,language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const {data:data, isLoading:  isLoadingRecepies} = useGetRecepiesFilter({...filter,page:currentPage});
  const [isMainLoading, setMainLoading] = useState(false);
  const queryClient = useQueryClient(); // Initialize queryClient

  const [loading, setLoading] = useState(0);
  const [openModalId, setOpenModalId] = useState({});


  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.totalElements / 10) || 0;


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

  const currentData = data?.content;

  console.log("currentPage", "currentPage");
  console.log(currentPage, currentData);


  return (
    <Container>
      {isMainLoading || isLoadingRecepies ? (
        <div className="loaderParent">
          <div class="loader"></div>
        </div>
      ) : (
        ""
      )}

      <ModalPrescription id={openModalId} setId={setOpenModalId} />

      <WhiteWrapper>
        <TitleSmall>{title}</TitleSmall>
        <ResponsiveTableAdmin>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th className="idfixed">{translate("Fullname_doctor")}</th>
                <th>{translate("Место_работы_врача")}</th>
                <th>{translate("Дата_создания")}</th>
                <th>{translate("Название_препарата")}</th>
                <th>{translate("Открыть")}</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.length > 0 ? (
                currentData?.map((row,index) => (
                  <tr key={index}>
                    <td>№{index+1}</td>
                    <td className="idfixed">
                      {row?.doctor?.firstName ?? ""} {" "}
                      {row?.doctor?.lastName ?? ""} {" "}
                      {row?.doctor?.middleName ?? ""}
                    </td>
                    <td>
                      {row?.district}
                      {row?.doctor?.regionDistrictDTO?.[`regionName${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")}, {" "}
                      {row?.doctor?.workPlaceDTO?.name}, {" "}
                    </td>
                    <td>
                      {translate("Создан")} {row?.dateCreation}
                    </td>
                    <td>{row?.preparations[0]?.name} {row?.preparations[0]?.medicine?.prescription} {row?.preparations[0]?.medicine?.volume}</td>

                    <td>
                      <button
                        onClick={() => setOpenModalId(row)}
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
            <LeftArrow/>
          </button>
          <span>
            {currentPage + 1} {translate("from")} {""}
            {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            <RightArrow/>
          </button>
        </PaginationButtonsWrapper>
      </WhiteWrapper>
    </Container>
  );
};

export default Table;
