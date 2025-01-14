import React, { useState } from "react";
import { TitleSmall } from "../../../../root/style";
import { ResponsiveTableAdmin } from "../../../../components/ResizeTable/ResizeTableAdmin/style";
import styled from "styled-components";
import { useLanguage } from "../../../../context/LanguageContext";

const Container = styled.div`
  position: relative;

  transition: all 0.2s ease-in-out;
`;

const MiniTable = ({ title = "", data = [], filterData = {} }) => {
  const { translate } = useLanguage();

  const [loading, setLoading] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  let filteredData = data;
  if (filterData.fullName)
    filteredData = filteredData.filter((v) =>
      v.fullName.toLowerCase().includes(filterData.fullName.toLowerCase())
    );
  if (filterData.Район)
    filteredData = filteredData.filter((v) =>
      v.Район.toLowerCase().includes(filterData.Район.toLowerCase())
    );
  if (filterData.ЛПУ)
    filteredData = filteredData.filter((v) =>
      v.ЛПУ.toLowerCase().includes(filterData.ЛПУ.toLowerCase())
    );
  if (filterData.Специальность)
    filteredData = filteredData.filter((v) =>
      v.Специальность
        .toLowerCase()
        .includes(filterData.Специальность.toLowerCase())
    );
  if (filterData.Выписано)
    filteredData = filteredData.filter((v) =>
      v.Выписано.toLowerCase().includes(filterData.Выписано.toLowerCase())
    );

  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
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
              <th className="idfixed">{translate("Ф.И.О")}</th>
              <th>{translate("Район")}</th>
              <th>{translate("ЛПУ")}</th>
              <th>{translate("Специальность")}</th>
              <th>{translate("Телефон")}</th>
              <th>{translate("Выписано")}</th>
              <th>{translate("Коррекция")}</th>
              <th>{translate("Процент")}</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <tr key={row?.id}>
                  <td className="idfixed">{row?.fullName}</td>
                  <td>{row?.Район}</td>
                  <td>{row?.ЛПУ}</td>
                  <td>{row?.Специальность}</td>
                  <td>{row?.Телефон}</td>
                  <td>{row?.Выписано}</td>
                  <td>{row?.Коррекция}</td>
                  <td>{row?.Процент}</td>
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

export default MiniTable;
