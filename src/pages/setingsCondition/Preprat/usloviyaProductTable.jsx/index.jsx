// table Data

//  const [tableData, settableData] = useState({

//     thead: ["Препарат", "CIP", "Не более", "Рецептурник",
//       {
//         title: "СУ",
//         child: ["Лимит", "Балл"]
//       },
//       {
//         title: "СУ",
//         child: ["Лимит", "Балл"]
//       },
//       {
//         title: "СУ",
//         child: ["Лимит", "Балл"]
//       },
//       {
//         title: "СУ",
//         child: ["Лимит", "Балл"]
//       },

//     ],
//     tbody: [
//       {
//         id: 1,
//         name: " Амлипин таблетки 5/10 мг",
//         cip: "12 000",
//         nebolshe: "-?%",
//         Рецептурник: "7",
//         СУ: {
//           Лимит: "11",
//           Балл: "5"
//         },
//         СБ: {
//           Лимит: "11",
//           Балл: "5"
//         },

//         ГЗ: {
//           Лимит: "11",
//           Балл: "5"
//         },
//         КВ: {
//           Лимит: "11",
//           Балл: "5"
//         },
//       },

//     ]
//   });

import React, {useEffect, useState} from "react";
import {MiniTitleSmall, TitleSmall} from "../../../../root/style.js";
import {
    PaginationButtonsWrapper,
    //   ResponsiveTableAdmin,
} from "../../../../components/ResizeTable/ResizeTableAdmin/style.js";
import LeftArrow from "../../../../assets/svg/LeftArrow.jsx";
import RightArrow from "../../../../assets/svg/RightArrow.jsx";
import styled from "styled-components";
// import ModalManager from "./Modal.jsx";
import {useLanguage} from "../../../../context/LanguageContext.jsx";
import Server, {useDeleteDrug} from "../../../../utils/server/server.js";
import {isArray} from "chart.js/helpers";
import {Input, message} from "antd";

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

        color: rgba(0, 0, 0, 0.5);
        font-family: "Vela Sans GX", sans-serif;
        font-weight: 600;

        padding: 10px 12px; /* Yuqoridan va pastdan */
    }

    td {
        color: #333; /* Default matn rangi */
        padding: 0px 17px !important;
        height: 100%;
        transition: all 0.3s;
        background-color: #f7f8fc;

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
        text-align: left !important;
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

    .margin10 {
        margin: 0 10px;
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
            border: none;
            background-color: white;
            padding: 22px 0px !important;
            border-radius: 5px;
            cursor: pointer;
            height: 100%;
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

const Article = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    > .flex {
        gap: 20px;
        display: flex;
        height: inherit;
    }
`;

export const WhiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    background-color: #ffffff;
    border-radius: 30px;

    min-height: 500px;
    height: fit-content;
    width: 100%;

    padding: 20px;
`;

const InputWrapper = styled(Input)`
    background-color: ${({bgColor}) => (bgColor ? bgColor : "var(--bg-color)")};

    border-radius: 10px;
    display: inline-block;
    height: ${({height}) => (height ? height : "60px")};
    border: none !important;

    width: 100%;
    font-size: 16px;
    font-family: "Vela Sans GX";
    min-width: 50px;

    &::placeholder {
        text-transform: capitalize;
    }
`;

const UsloviyaProductTable = ({data, loading = true, title = ""}) => {
    let {thead, tbody} = data;
    const [editId, setEditId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingIn, setLoadingIn] = useState(0);
    const deleteDrug = useDeleteDrug();
    const [editedRow, setEditedRow] = useState([...tbody]);
    const [changeRow, setChangeRow] = useState([]);
    data = editedRow;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(tbody?.length / itemsPerPage);
    const {translate} = useLanguage();
    const handleEditClick = (row) => {
        console.log("EDIT:", row);
        setEditId(row.id);
        setChangeRow(row); // Tahrirlanayotgan qatorni o'zgarish uchun saqlaymiz
    };
    const handleInputChange = (name, value, subKey) => {
        setChangeRow((prevRow) => {
            const updatedRow = { ...prevRow };

            if (subKey) {
                let newValue = value;

                // Agar "Балл" o'zgarsa, unga bog‘liq "Лимит" ham yangilansin
                if (subKey == "Балл") {
                    let limitValue = value * 2; // O'zgarish qoidasi (Misol uchun)
                    updatedRow[name] = {
                        ...(prevRow[name] || {}),
                        [subKey]: value,
                        "Лимит": limitValue,
                    };
                } else {
                    updatedRow[name] = {
                        ...(prevRow[name] || {}),
                        [subKey]: value,
                    };
                }
            } else {
                updatedRow[name] = value;
            }

            return updatedRow;
        });
    };

// O‘zgarishlarni tekshirish uchun
    useEffect(() => {
        console.log("Yangilangan changeRow:", changeRow);
    }, [changeRow]);



    const handleCancel = () => {
        setEditId(null);
    };

    const handleSave = () => {
        console.log("Updated row:", changeRow);

        setEditedRow((prevRows) =>
            prevRows.map((row) => (row.id === changeRow.id ? changeRow : row))
        );

        setEditId(null);
    };


    const handleDelete = (id, name) => {
        deleteDrug.mutate(id, {
            onError: (error) => {
                console.error("Failed to delete the drug:", error);
                message.error("Dorini o‘chirishda xatolik yuz berdi.");
                setLoadingIn(0);
            },
            onSuccess: () => {
                message.success(translate("Препарат_удален"));
                setLoadingIn(0);
            },
        });

        setLoadingIn(1);
        console.log(id);

        // setEditedRow(editedRow.filter((v) => v.id !== id));
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
    useEffect(() => {
        setEditedRow([...tbody]);
    }, [tbody]);
    return (
        <Container>
            {loading || loadingIn ? (
                <div className="loaderParent">
                    <div className="loader"></div>
                </div>
            ) : (
                ""
            )}

            {/* <ModalManager id={openModalId} setId={setOpenModalId} /> */}
            <WhiteWrapper>
                <div>
                    <TitleSmall>{title}</TitleSmall>
                    <ResponsiveTableAdmin>
                        <table>
                            <thead>
                            <tr>
                                {thead?.map((v, i) => {
                                    if (typeof v == "string") {
                                        return <th className={i == 0 && "idfixed"}>{v}</th>;
                                    } else {
                                        return (
                                            <>
                                                <td>
                                                    <Line/>
                                                </td>
                                                <th colSpan={2}>
                                                    <Article>
                                                        <div>{v?.title}</div>
                                                        <div className="flex">
                                                            {v?.child &&
                                                                v.child.map((v) => <p key={v}>{v}</p>)}
                                                        </div>
                                                    </Article>
                                                </th>
                                            </>
                                        );
                                    }
                                })}
                                <td>
                                    <Line/>
                                </td>

                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {editedRow?.length > 0 ? (
                                editedRow?.map((row, index) => {
                                    return (
                                        <tr onDoubleClick={() => handleEditClick(row)}
                                            key={row.id}>
                                            {Object.keys(row)?.map((v, i) => {
                                                if (v === "id") return null; // id ni chiqarish shart emas

                                                if (typeof row[v] === "object" && row[v] !== null) {
                                                    return (
                                                        <>
                                                            <td>
                                                                <Line/>
                                                            </td>
                                                            {editId === row.id ? (
                                                                <>
                                                                    <td>
                                                                        <InputWrapper
                                                                            type="text"
                                                                            name="Лимит"
                                                                            defaultValue={row[v]?.Лимит}
                                                                            onChange={(e) =>
                                                                                handleInputChange(v, e.target.value, index, "Лимит")
                                                                            }
                                                                            placeholder="Лимит"
                                                                            height={"50px"}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <InputWrapper
                                                                            type="text"
                                                                            name="Балл"
                                                                            defaultValue={row[v]?.Балл}
                                                                            onChange={(e) =>
                                                                                handleInputChange(v, e.target.value, index, "Балл")
                                                                            }
                                                                            placeholder="Балл"
                                                                            height={"50px"}
                                                                        />
                                                                    </td>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <td>{row[v]?.Лимит}</td>
                                                                    <td>{row[v]?.Балл}</td>
                                                                </>
                                                            )}
                                                        </>
                                                    );
                                                } else {
                                                    return editId !== row.id ? (
                                                        <td key={v} className={i === 1 ? "idfixed" : ""}>
                                                            {row[v]}
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            <InputWrapper
                                                                type="text"
                                                                name={v}
                                                                defaultValue={row[v]}
                                                                onChange={(e) => handleInputChange(v, e.target.value, index)}
                                                                placeholder={v}
                                                                height={"50px"}
                                                            />
                                                        </td>
                                                    );
                                                }
                                            })}
                                            <td>
                                                <Line/>
                                            </td>
                                            <td className="buttons">
                                                {editId === row.id ? (
                                                    <div className="buttons">
                                                        <button
                                                            style={{background: "transparent"}}
                                                            className="Viewbutton margin10"
                                                            onClick={handleSave}
                                                        >
                                                            <i className="fa-solid fa-floppy-disk colorBlue"></i>
                                                        </button>
                                                        <button
                                                            style={{background: "transparent"}}
                                                            className="Viewbutton margin10 colorBlue"
                                                            onClick={handleCancel}
                                                        >
                                                            <i className="fa-solid fa-close colorRed"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            style={{
                                                                background: "transparent",
                                                                padding: "0",
                                                            }}
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
                                                        <button
                                                            style={{
                                                                background: "transparent",
                                                                padding: "0",
                                                            }}
                                                            className="Viewbutton"
                                                            onClick={() => handleDelete(row.id)}
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
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="empty" colSpan="15" style={{textAlign: "center"}}>
                                        {loading ? "Loading..." : translate("notInformation")}
                                    </td>
                                </tr>
                            )}
                            </tbody>

                        </table>
                    </ResponsiveTableAdmin>
                </div>

                <PaginationButtonsWrapper>
                    <button onClick={handlePrevious} disabled={currentPage === 0}>
                        <LeftArrow/>
                    </button>
                    <span>
            {currentPage + 1} {translate("from")} {totalPages}
          </span>
                    <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                        <RightArrow/>
                    </button>
                </PaginationButtonsWrapper>
            </WhiteWrapper>
        </Container>
    );
};
export default UsloviyaProductTable;
