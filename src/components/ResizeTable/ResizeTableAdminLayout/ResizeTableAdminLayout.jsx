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
import CancelIcon from "../../../assets/svg/CancelIcon";
import ReceptIcon from "../../../assets/svg/ReceptIcon";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const ResizeTableAdminLayout = ({ data, title }) => {
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
        <div className="loaderParent">
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
                        <ReceptIcon />
                        Принять
                      </button>
                      <button onClick={() => onOtk()}>
                        <CancelIcon />
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
    </Container>
  );
};

export default ResizeTableAdminLayout;
