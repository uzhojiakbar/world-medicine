import React, { useEffect, useState } from "react";
import {
  MiniTitleSmall,
  TitleSmall,
  WhiteWrapper,
} from "../../../root/style.js";
import {
  PaginationButtonsWrapper,
  ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style.js";
import LeftArrow from "../../../assets/svg/LeftArrow.jsx";
import RightArrow from "../../../assets/svg/RightArrow.jsx";
import styled from "styled-components";
import ModalManager from "./Modal.jsx";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import Server from "../../../utils/server/server.js";
import Input from "../../../components/Generic/Input/Input.jsx"; // Import your Input component

const Container = styled.div`
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const Table = ({
  data = [],
  loading = true,
  setLoading = () => { },
  title = "",
}) => {
  const [openModalId, setOpenModalId] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  //   const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

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

  const handleEditClick = (row) => {
    setEditId(row.id);
    setEditedRow(row);
  };

  const handleInputChange = (name, value) => {
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedRow({});
  };

  const handleSave = async () => {
    // Update logic goes here
    // Example: await Server.updateProdaji(editedRow);
    setEditId(null);
    // Optionally refetch data
  };

  return (
    <Container>
      {loading && (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      )}

      <ModalManager id={openModalId} setId={setOpenModalId} />
      <WhiteWrapper>
        <TitleSmall>{title}</TitleSmall>
          <ResponsiveTableAdmin>
            <thead>
              <tr>
                <th className="idfixed">{translate("Препарат")}</th>
                <th>{translate("Объём")}</th>
                <th>{translate("В_упаковке")}</th>
                <th>{translate("Цена_препарата")}</th>
                <th>{translate("Рецептурник")}</th>
                <th>{translate("СУ")}</th>
                <th>{translate("СБ")}</th>
                <th>{translate("ГЗ")}</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((row) => (
                  <tr key={row?.id}>
                    {
                      Object.keys(row)?.map(v => {
                        if (v == "id") return
                        return v !== "name" ? <td >{row[v]}</td> : <td>{row[v]}</td>
                      })
                    }

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="empty"
                    colSpan="15"
                    style={{ textAlign: "center" }}
                  >
                    {loading ? "Loading..." : translate("notInformation")}
                  </td>
                </tr>
              )}
            </tbody>
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
