import React, { useEffect, useState } from "react";
import { MiniTitleSmall, TitleSmall, WhiteWrapper } from "../../root/style.js";
import {
  PaginationButtonsWrapper,
  //   ResponsiveTableAdmin,
} from "../../components/ResizeTable/ResizeTableAdmin/style.js";
import LeftArrow from "../../assets/svg/LeftArrow.jsx";
import RightArrow from "../../assets/svg/RightArrow.jsx";
import styled from "styled-components";
// import ModalManager from "./Modal.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import Server from "../../utils/server/server.js";
import Input from "../../components/Generic/Input/Input.jsx"; // Import your Input component

const Container = styled.div`
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const Line = styled.div`
  border: 1px solid black;
  width: 0;
  height: 10px;
  opacity: 0.1;
  //   border-radius: 4px;
`;

export const ResponsiveTableAdmin = styled.div`
  overflow-x: auto; /* Scrollable */
  width: 100%;

  * > {
    transition: all 0.2s ease-in-out;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead > tr > td {
    background-color: white !important;
  }

  th,
  td {
    text-align: center; /* Matn hizalash */
    font-family: "Vela Sans GX", sans-serif;
  }

  th {
    background-color: white; /* Header fon rangi */
    font-weight: 700; /* Qalin matn */

    color: #216bf480;
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 600;

    padding: 18px 12px; /* Yuqoridan va pastdan */
  }

  td {
    color: #333; /* Default matn rangi */
    padding: 17px !important;
    height: 100%;

    // background-color: #f7f8fc; /* Jadval uyalarining default foni */

    > button {
      border: none;
      outline: none;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    > input {
      width: 100%;
    }
  }

  .empty {
    height: 400px;
    background-color: var(--bg-color);

    &:hover {
      background-color: var(--bg-color);
    }
  }

  .idfixed {
    position: sticky;
    left: 0;
  }

  .progressKPI {
    background-color: white;
    padding: 10px;
    font-family: "Vela Sans GX", sans-serif;
    font-weight: 700;
    font-size: 18px;
  }

  .Viewbutton {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-size: 20px;

    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.7;
      background-color: var(--bg-color);
    }
    &:active {
      opacity: 1;
      transform: scale(1.01);
    }
  }

  .colorBlue {
    color: #216bf4;
    height: 100%;
  }
  .colorRed {
    color: #fb3748;
    height: 100%;
  }

  tr {
    background-color: #f7f8fc; /* Jadval uyalarining default foni */
    padding: 18px 12px;
    height: 100%;
  }
  tr:hover {
    td {
      background-color: #f1f1f1; /* Hover effekti */
    }
  }

  tbody {
    /* border-bottom: 10px solid white; */
    height: 100%;
  }
  tbody tr {
    border-bottom: 10px solid white;
  }

  thead tr th {
    text-align: center !important;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;
    height: 100%;

    > button {
      background-color: white;
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;
      height: 100%;

      &:active {
        opacity: 0.5;
      }
    }
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      font-size: 12px;
      padding: 8px;
    }
  }

  .flex {
    display: flex !important;
    // align-items: center;
    height: 100px;
    // padding-top: 150px;
    justify-content: center;
  }
  .flex > .item {
    display: flex;
    padding-top: 14px;
  }
  .flex > div > button {
    border: none;
  }
`;

const Table = ({
  data = [],
  loading = true,
  setLoading = () => {},
  title = "",
}) => {
  //   const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const currentData = data;

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

      {/* <ModalManager id={openModalId} setId={setOpenModalId} /> */}
      <WhiteWrapper>
        <TitleSmall>{title}</TitleSmall>
        <ResponsiveTableAdmin>
          <table>
            <thead>
              <tr>
                <th className="idfixed">{translate("Препарат")}</th>
                <th>{translate("Продажа (отчет. период)")}</th>
                <th>{translate("Лимит")}</th>
                <th>{translate("Факт от продаж")}</th>
                <th>{translate("Рецептурник")}</th>
                <td>
                  <Line />
                </td>
                <th>{translate("СУ")}</th>
                <td>
                  <Line />
                </td>
                <th>{translate("СБ")}</th>
                <td>
                  <Line />
                </td>
                <th>{translate("ГЗ")}</th>
                <td>
                  <Line />
                </td>
                <th>{translate("КВ")}</th>
                <td>
                  <Line />
                </td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((row) => (
                  <tr key={row?.id}>
                    <td className="idfixed">
                      {editId === row.id ? (
                        <Input
                          type="text"
                          name="name"
                          value={editedRow.name}
                          onChange={(value) => handleInputChange("name", value)}
                          placeholder="Препарат"
                        />
                      ) : (
                        row?.name
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="prodaj"
                          value={editedRow.prodaj}
                          onChange={(value) =>
                            handleInputChange("prodaj", value)
                          }
                          placeholder="Продажа"
                        />
                      ) : (
                        row?.dosage
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="Таш"
                          value={editedRow.Таш}
                          onChange={(value) => handleInputChange("Таш", value)}
                          placeholder="Лимит"
                        />
                      ) : (
                        row?.quantity
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="Сам"
                          value={editedRow.Сам}
                          onChange={(value) => handleInputChange("Сам", value)}
                          placeholder=" Факт от продаж	"
                        />
                      ) : (
                        row?.price
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="Бух"
                          value={editedRow.Бух}
                          onChange={(value) => handleInputChange("Бух", value)}
                          placeholder="Enter Рецептурник"
                        />
                      ) : (
                        row?.Рецептурник
                      )}
                    </td>
                    <td>
                      <Line />
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="Анж"
                          value={editedRow.Анж}
                          onChange={(value) => handleInputChange("Анж", value)}
                          placeholder="Enter СУ"
                        />
                      ) : (
                        <>{row?.СУ}</>
                      )}
                    </td>
                    <td>
                      <Line />
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="Фер"
                          value={editedRow.Фер}
                          onChange={(value) => handleInputChange("Фер", value)}
                          placeholder="Enter СБ"
                        />
                      ) : (
                        <>{row?.СБ}</>
                      )}
                    </td>
                    <td>
                      <Line />
                    </td>
                    <td>
                      {editId === row.id ? (
                        <Input
                          type="number"
                          name="Нам"
                          value={editedRow.Нам}
                          onChange={(value) => handleInputChange("Нам", value)}
                          placeholder="Enter ГЗ"
                        />
                      ) : (
                        <>{row?.ГЗ}</>
                      )}
                    </td>
                    <td>
                      <Line />
                    </td>
                    <td>
                      {editId === row.id ? (
                        <>
                          <Input
                            type="number"
                            name="Каш"
                            value={editedRow.Каш}
                            onChange={(value) =>
                              handleInputChange("Каш", value)
                            }
                            placeholder="Enter КВ"
                          />
                        </>
                      ) : (
                        <>{row?.КВ}</>
                      )}
                    </td>
                    <td>
                      <Line />
                    </td>
                    <td className="flex">
                      {editId === row.id ? (
                        <div className="item">
                          <button
                            style={{ background: "transparent" }}
                            className="Viewbutton"
                            onClick={handleSave}
                          >
                            <i class="fa-solid fa-floppy-disk colorBlue"></i>
                          </button>
                          <button
                            style={{ background: "transparent" }}
                            className="Viewbutton colorBlue"
                            onClick={handleCancel}
                          >
                            <i class="fa-solid fa-close colorRed"></i>
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            style={{ background: "transparent", padding: "0" }}
                            className="Viewbutton"
                            onClick={() => handleEditClick(row)}
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
                                d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                                fill="#216BF4"
                              />
                              <path
                                d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                                fill="#216BF4"
                              />
                            </svg>
                          </button>
                          {/* <button
                            style={{ background: "transparent", padding: "0" }}
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
                                d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"
                                fill="#FB3748"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.42543 11.4815C9.83759 11.4381 10.2051 11.7547 10.2463 12.1885L10.7463 17.4517C10.7875 17.8855 10.4868 18.2724 10.0747 18.3158C9.66253 18.3592 9.29499 18.0426 9.25378 17.6088L8.75378 12.3456C8.71256 11.9118 9.01327 11.5249 9.42543 11.4815Z"
                                fill="#FB3748"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5747 11.4815C14.9868 11.5249 15.2875 11.9118 15.2463 12.3456L14.7463 17.6088C14.7051 18.0426 14.3376 18.3592 13.9254 18.3158C13.5133 18.2724 13.2126 17.8855 13.2538 17.4517L13.7538 12.1885C13.795 11.7547 14.1625 11.4381 14.5747 11.4815Z"
                                fill="#FB3748"
                              />
                              <path
                                opacity="0.5"
                                d="M11.5956 22.0006H12.4044C15.1871 22.0006 16.5785 22.0006 17.4831 21.1147C18.3878 20.2288 18.4803 18.7756 18.6654 15.8691L18.9321 11.6812C19.0326 10.1042 19.0828 9.31573 18.6289 8.81607C18.1751 8.31641 17.4087 8.31641 15.876 8.31641H8.12405C6.59127 8.31641 5.82488 8.31641 5.37105 8.81607C4.91722 9.31573 4.96744 10.1042 5.06788 11.6812L5.33459 15.8691C5.5197 18.7756 5.61225 20.2288 6.51689 21.1147C7.42153 22.0006 8.81289 22.0006 11.5956 22.0006Z"
                                fill="#FB3748"
                              />
                            </svg>
                          </button> */}
                        </>
                      )}
                    </td>
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
          </table>
        </ResponsiveTableAdmin>

        {/* <PaginationButtonsWrapper>
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            <LeftArrow />
          </button>
          <span>
            {currentPage + 1} {translate("from")} {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            <RightArrow />
          </button>
        </PaginationButtonsWrapper> */}
      </WhiteWrapper>
    </Container>
  );
};

export default Table;
