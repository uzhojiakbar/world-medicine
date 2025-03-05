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
import {MiniTitleSmall, TitleSmall} from "../../../root/style.js";
import {
    PaginationButtonsWrapper, //   ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style.js";
import LeftArrow from "../../../assets/svg/LeftArrow.jsx";
import RightArrow from "../../../assets/svg/RightArrow.jsx";
import styled from "styled-components";
// import ModalManager from "./Modal.jsx";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import Server, {useDeleteDrug} from "../../../utils/server/server.js";
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

        color: #216BF480;
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

    .check {
        cursor: pointer;
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
const Checkbox = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #f1f1f1;
    margin: 5px auto;
    border-radius: 4px;
`

const UsloviyaProductTable = ({
                                  data,
                                  data2,
                                  loading = true,
                                  title = "",
                                  isChecked = false,
                                  checkData = {},
                                  setCheckData = () => {
                                  }
                              }) => {

    console.log("DATA2",data2)
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

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const handleInputChange = (name, value, subKey) => {
        setChangeRow((prevRow) => ({
            ...prevRow, [name]: subKey ? {...prevRow[name], [subKey]: value} : value,
        }));
    };
    const [isCheck, setIsCheck] = useState(false)

    const handleCancel = () => {
        setEditId(null);
    };
    const handleSave = () => {
        console.log("Updated row:", changeRow);

        setEditedRow((prevRows) => prevRows.map((row) => (row.id === changeRow.id ? changeRow : row)));

        setEditId(null);
    };
    const handleDelete = (id, name) => {
        deleteDrug.mutate(id, {
            onError: (error) => {
                console.error("Failed to delete the drug:", error);
                message.error(translate("drug_delete_error"));
                setLoadingIn(0);
            }, onSuccess: () => {
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
    return (<Container>
        {loading || loadingIn ? (<div className="loaderFixed">
            <div className="loader"></div>
        </div>) : ("")}
        <WhiteWrapper>
            <div>
                <TitleSmall>{title}</TitleSmall>
                <ResponsiveTableAdmin>
                    <table>
                        <thead>
                        <tr>
                            {thead?.map((v, i) => {
                                if (typeof v == "string") {
                                    if (i > 3 && i < 9) {
                                        return <>
                                            <th className={isChecked && "check"} onClick={() => {
                                                if (isChecked) {
                                                    if (checkData[v])
                                                        setCheckData({...checkData, [v]: !checkData[v]})
                                                    else {
                                                        setCheckData({...checkData, [v]: true})
                                                    }
                                                }
                                            }}>
                                                <div>{v}</div>
                                                {isChecked &&
                                                    <div className="check">{!checkData[v] ? <Checkbox/> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                                             viewBox="0 0 25 24" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M12.625 22C7.91095 22 5.55393 22 4.08947 20.5355C2.625 19.0711 2.625 16.714 2.625 12C2.625 7.28595 2.625 4.92893 4.08947 3.46447C5.55393 2 7.91095 2 12.625 2C17.339 2 19.6961 2 21.1605 3.46447C22.625 4.92893 22.625 7.28595 22.625 12C22.625 16.714 22.625 19.0711 21.1605 20.5355C19.6961 22 17.339 22 12.625 22ZM16.6553 8.96967C16.9482 9.26256 16.9482 9.73744 16.6553 10.0303L11.6553 15.0303C11.3624 15.3232 10.8876 15.3232 10.5947 15.0303L8.59467 13.0303C8.30178 12.7374 8.30178 12.2626 8.59467 11.9697C8.88756 11.6768 9.36244 11.6768 9.65533 11.9697L11.125 13.4393L15.5947 8.96967C15.8876 8.67678 16.3624 8.67678 16.6553 8.96967Z"
                                                                  fill="#191716"/>
                                                        </svg>}</div>
                                                }
                                            </th>
                                            <th><Line/></th>
                                        </>
                                    } else return <th className={i == 0 ? "idfixed" : isChecked ? "check" : ""}
                                                      onClick={() => {
                                                          if (isChecked) {
                                                              if (checkData[v])
                                                                  setCheckData({...checkData, [v]: !checkData[v]})
                                                              else {
                                                                  setCheckData({...checkData, [v]: true})
                                                              }
                                                          }
                                                      }}>
                                        <div>{v}</div>
                                        {
                                            isChecked && i !== 0 &&
                                            <div className="check">{!checkData[v] ? <Checkbox/> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                                     viewBox="0 0 25 24" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M12.625 22C7.91095 22 5.55393 22 4.08947 20.5355C2.625 19.0711 2.625 16.714 2.625 12C2.625 7.28595 2.625 4.92893 4.08947 3.46447C5.55393 2 7.91095 2 12.625 2C17.339 2 19.6961 2 21.1605 3.46447C22.625 4.92893 22.625 7.28595 22.625 12C22.625 16.714 22.625 19.0711 21.1605 20.5355C19.6961 22 17.339 22 12.625 22ZM16.6553 8.96967C16.9482 9.26256 16.9482 9.73744 16.6553 10.0303L11.6553 15.0303C11.3624 15.3232 10.8876 15.3232 10.5947 15.0303L8.59467 13.0303C8.30178 12.7374 8.30178 12.2626 8.59467 11.9697C8.88756 11.6768 9.36244 11.6768 9.65533 11.9697L11.125 13.4393L15.5947 8.96967C15.8876 8.67678 16.3624 8.67678 16.6553 8.96967Z"
                                                          fill="#191716"/>
                                                </svg>}</div>
                                        }

                                    </th>
                                } else {
                                    return (<>

                                        <th>
                                            <Article>
                                                <div>{v?.title}</div>
                                                <div className="flex">
                                                    {v?.child && v.child.map((v) => <p key={v}>{v}</p>)}
                                                </div>
                                            </Article>
                                        </th>
                                    </>);
                                }
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {editedRow?.length > 0 ? (editedRow?.map((row, index) => {
                            return (<tr onDoubleClick={() => setSelectedMedicine(row)}
                                        key={row.id}>
                                {Object.keys(row)?.map((v, i) => {
                                    if (v === "id") return null; // id ni chiqarish shart emas

                                    if (typeof row[v] === "object" && row[v] !== null) {
                                        return (<>
                                            {editId === row.id ? (<>
                                                <td>
                                                    <InputWrapper
                                                        type="number"
                                                        name="Лимит"
                                                        defaultValue={row[v]?.Лимит}
                                                        onChange={(e) => handleInputChange(v, e.target.value, index, "Лимит")}
                                                        placeholder="Лимит"
                                                        height={"50px"}
                                                    />
                                                </td>
                                                <td>
                                                    <InputWrapper
                                                        type="number"
                                                        name="Балл"
                                                        defaultValue={row[v]?.Балл}
                                                        onChange={(e) => handleInputChange(v, e.target.value, index, "Балл")}
                                                        placeholder="Балл"
                                                        height={"50px"}
                                                    />
                                                </td>
                                            </>) : (<>
                                                <td>{row[v]?.Лимит}</td>
                                                <td>{row[v]?.Балл}</td>
                                            </>)}
                                        </>);
                                    } else {
                                        if (i > 3 && i < 9) {

                                        }
                                        return <>
                                            {editId !== row.id ? (
                                                <td key={v} className={i === 1 ? "idfixed" : ""}>
                                                    {row[v]}
                                                </td>) : (<td>
                                                <InputWrapper
                                                    type="text"
                                                    name={v}
                                                    defaultValue={row[v]}
                                                    onChange={(e) => handleInputChange(v, e.target.value, index)}
                                                    placeholder={v}
                                                    height={"50px"}
                                                />
                                            </td>)}
                                            {i > 4 && i < 10 && <td><Line/></td>}
                                        </>
                                    }
                                })}
                                {!isChecked ? <td className="buttons">
                                    {editId === row.id ? (<div className="buttons">
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
                                    </div>) : (<>
                                        <button
                                            style={{
                                                background: "transparent", padding: "0",
                                            }}
                                            className="Viewbutton"
                                            onClick={() => setSelectedMedicine(row)}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12Z" fill="#343434"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#343434"/>
                                            </svg>

                                        </button>

                                    </>)}
                                </td> : <td></td>}
                            </tr>);
                        })) : (<tr>
                            <td className="empty" colSpan="15" style={{textAlign: "center"}}>
                                {loading ? "Loading..." : translate("notInformation")}
                            </td>
                        </tr>)}
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
    </Container>);
};
export default UsloviyaProductTable;