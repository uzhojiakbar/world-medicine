import React, { useState } from "react";
import { TitleSmall, WhiteWrapper } from "../../../../../../root/style";
import { ResponsiveTableAdmin } from "../../../../../../components/ResizeTable/ResizeTableAdmin/style";
import styled from "styled-components";
import ModalPrescription from "./Modal";
import { useLanguage } from "../../../../../../context/LanguageContext";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const Table2 = ({ title = "", data = [] }) => {
  const [loading, setLoading] = useState(0);
  const [openModalId, setOpenModalId] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

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

      <TitleSmall>{title}</TitleSmall>
      <ResponsiveTableAdmin>
        <table>
          <thead>
            <tr>
              <th className="idfixed">{translate("Препарат")}</th>
              <th>{translate("Формат")}</th>
              <th>{translate("Упаковка")}</th>
              <th>{translate("Количество")}</th>
              <th>{translate("Раз_в_сутки")}</th>
              <th>{translate("Дней")}</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr key={row?.id}>
                  <td className="idfixed">{row?.Препарат}</td>
                  <td>{row?.Формат}</td>
                  <td>{row?.Упаковка}</td>
                  <td>{row?.Количество}</td>
                  <td>{row?.Раз_в_сутки}</td>
                  <td>{row?.Дней}</td>
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
    </Container>
  );
};

export default Table2;
