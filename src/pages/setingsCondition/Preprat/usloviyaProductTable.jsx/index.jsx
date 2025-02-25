import React, {useEffect, useState} from "react";
import {MiniTitleSmall, TitleSmall} from "../../../../root/style.js";
import {
    PaginationButtonsWrapper,
    //   ResponsiveTableAdmin,
} from "../../../../components/ResizeTable/ResizeTableAdmin/style.js";
import LeftArrow from "../../../../assets/svg/LeftArrow.jsx";
import RightArrow from "../../../../assets/svg/RightArrow.jsx";
import styled from "styled-components";
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
    const itemsPerPage = 10; // Har bir sahifada 10 ta ma'lumot
    const totalPages = Math.ceil(tbody?.length / itemsPerPage);
    const {translate} = useLanguage();
    const handleEditClick = (row) => {
        console.log("EDIT:", row);
        setEditId(row.id);
        setChangeRow(row); // Tahrirlanayotgan qatorni o'zgarish uchun saqlaymiz
    };
    const handleInputChange = (name, value, ind, subKey) => {
        setChangeRow((prevRow) => {
            const updatedRow = {...prevRow};

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

    const paginatedData = editedRow.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <Container>
            {loading || loadingIn ? (
                <div className="loaderParent">
                    <div className="loader"></div>
                </div>
            ) : (
                ""
            )}

            <WhiteWrapper>
                <div>
                    <TitleSmall>{title}</TitleSmall>
                    <ResponsiveTableAdmin>
                        <table>
                            <thead>
                            <tr>
                                {thead?.map((v, i) => {
                                    if (typeof v === "string") {
                                        return <th className={i === 0 ? "idfixed" : ""}>{v}</th>;
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
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, index) => {
                                    return (
                                        <tr
                                            onDoubleClick={() => handleEditClick(row)}
                                            key={row.id}
                                        >
                                            {Object.keys(row)?.map((v, i) => {
                                                if (v === "id") return null;

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
                                                                onChange={(e) =>
                                                                    handleInputChange(v, e.target.value, index)
                                                                }
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
                                                            <i className="fa-solid fa-pencil colorBlue"></i>
                                                        </button>
                                                        <button
                                                            style={{
                                                                background: "transparent",
                                                                padding: "0",
                                                            }}
                                                            className="Viewbutton"
                                                            onClick={() => handleDelete(row.id)}
                                                        >
                                                            <i className="fa-solid fa-trash colorRed"></i>
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
