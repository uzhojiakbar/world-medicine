import React, { useState } from "react";
import { Button, message } from "antd";
import styled from "styled-components";
import { TitleSmall, WhiteWrapper } from "../../../root/style";
import { contractData } from "../../../mock/contractData";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style";
import { connectingUser } from "../../../mock/NewConnectingData";
import { formatPhoneNumber } from "../../../utils/PhoneFormatter";
import LeftArrow from "../../../assets/svg/LeftArrow";
import RightArrow from "../../../assets/svg/RightArrow";

const Container = styled.div`
  /* padding: 20px; */
  background: var(--bg-color);
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SettingsSystemAdmin = () => {
  const [loading, setLoading] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(connectingUser.length / itemsPerPage);

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

  const currentData = connectingUser.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const onPrinyat = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      message.success("Принять");
    }, 1000);
  };
  const onOtk = () => {
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      message.error("Отклонить");
    }, 1000);
  };

  return (
    <Container>
      {loading ? (
        <div className="loaderWindow">
          <div class="loader"></div>
        </div>
      ) : (
        ""
      )}
      <WhiteWrapper>
        <TitleSmall>Новое подключение</TitleSmall>

        <ResponsiveTableAdmin>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th className="idfixed">Ф.И.О. Врача</th>
                <th>Регион</th>
                <th>Номер телефона</th>
                <th>Подключенный договор</th>
                <th>Разрешение</th>
              </tr>
            </thead>
            <tbody>
              {connectingUser.length > 0 ? (
                currentData.map((row) => (
                  <tr key={row.id}>
                    <td>№{row.id}</td>
                    <td className="idfixed">{row.name}</td>
                    <td>{row.location}</td>
                    <td>{formatPhoneNumber(row.phone)}</td>
                    <td>{row.contract}</td>

                    <td className="buttons">
                      <button onClick={() => onPrinyat()}>
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.41675 8.6L7.51202 11L12.7501 5"
                            stroke="#1C274C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Принять
                      </button>
                      <button onClick={() => onOtk()}>
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.74992 14.6666C12.4318 14.6666 15.4166 11.6818 15.4166 7.99992C15.4166 4.31802 12.4318 1.33325 8.74992 1.33325C5.06802 1.33325 2.08325 4.31802 2.08325 7.99992C2.08325 11.6818 5.06802 14.6666 8.74992 14.6666Z"
                            stroke="#1C274C"
                          />
                          <path
                            d="M10.4166 6.33327L7.08327 9.66659M7.08325 6.33325L10.4166 9.66659"
                            stroke="#1C274C"
                            stroke-linecap="round"
                          />
                        </svg>
                        Отклонить
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Нет данных для отображения
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
            {currentPage + 1} из {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            <RightArrow />
          </button>
        </PaginationButtonsWrapper>
      </WhiteWrapper>
      <WhiteWrapper></WhiteWrapper>
      <WhiteWrapper></WhiteWrapper>
    </Container>
  );
};

export default SettingsSystemAdmin;
