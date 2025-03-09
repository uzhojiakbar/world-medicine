import React, { useEffect, useState } from "react";
import { message } from "antd";
import styled from "styled-components";
import { TitleSmall, WhiteWrapper } from "../../../root/style.js";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style.js";
import { formatPhoneNumber } from "../../../utils/PhoneFormatter.js";
import LeftArrow from "../../../assets/svg/LeftArrow.jsx";
import RightArrow from "../../../assets/svg/RightArrow.jsx";
import CancelIcon from "../../../assets/svg/CancelIcon.jsx";
import ReceptIcon from "../../../assets/svg/ReceptIcon.jsx";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { useGetNewConnecting } from "../../../utils/server/server.js";
import Instance from "../../../utils/Instance.js";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const NewContract = ({ title = "" }) => {
  const { translate } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useGetNewConnecting(currentPage);

  const [isMainLoading, setMainLoading] = useState(false);

  const queryClient = useQueryClient(); // Initialize queryClient

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

  const onPrinyat = async (userId = 0, first, last) => {
    try {
      setMainLoading(true);
      const response = await Instance.patch(
        `/v1/admin/${userId}/user-enable`
      );
      // Invalidate and refetch the query to get updated data
      queryClient.invalidateQueries(["newConnecting", currentPage]);

      message.success(`${first + " " + last} ${translate("Успешно_получено")}`);
    } catch (error) {
      console.error("Error enabling user", error);
      message.error(translate("произошла_ошибка"));
    } finally {
      setMainLoading(false);
    }
  };

  const onOtk = async (userId = 0, first, last) => {
    try {
      setMainLoading(true);
      const response = await Instance.patch(
        `/v1/admin/${userId}/user-decline`
      );
      queryClient.invalidateQueries(["newConnecting", currentPage]);

      message.success(
        `${first + " " + last} ${translate("Успешно_отклонено")}`
      );
    } catch (error) {
      console.error("Error enabling user", error);
      message.error("Error occurred while enabling user");
    } finally {
      setMainLoading(false);
    }
  };

  console.log(currentData);

  return (
    <Container>
      {isLoading || isMainLoading ? (
        <div className="loaderWindow">
          <div className="loader"></div>
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
                <th>№</th>
                <th className="idfixed">{translate("Fullname_doctor")}</th>
                <th>{translate("region")}</th>
                <th>{translate("phone_number")}</th>
                <th>{translate("pod_dogovor")}</th>
                <th>{translate("Разрешение")}</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.length > 0 ? (
                currentData?.map((row, index) => (
                  <tr key={row?.userId}>
                    <td>№{index + 1}</td>
                    <td className="idfixed">
                      {row?.firstName + " " + " " + row?.lastName}
                    </td>
                    <td>{row?.location}</td>
                    <td>{formatPhoneNumber(row?.number)}</td>
                    <td>{row?.contract} Нет</td>

                    <td className="buttons">
                      <button
                        disabled={isLoading || isMainLoading}
                        onClick={() =>
                          onPrinyat(row?.userId, row?.firstName, row?.lastName)
                        }
                      >
                        <ReceptIcon />
                        {translate("accept")}
                      </button>
                      <button
                        onClick={() =>
                          onOtk(row?.userId, row?.firstName, row?.lastName)
                        }
                      >
                        <CancelIcon />
                        {translate("reject")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="empty"
                    colSpan="7"
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
            {currentPage + 1} {translate("from")} {""}
            {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            <RightArrow />
          </button>
        </PaginationButtonsWrapper>
      </WhiteWrapper>
    </Container>
  );
};

export default NewContract;
