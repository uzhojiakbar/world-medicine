import React, {useState} from "react";

import styled from "styled-components";
import {useLanguage} from "../../../context/LanguageContext";

const Container = styled.div`
    position: relative;

    transition: all 0.2s ease-in-out;
`;

const WhiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    background-color: #f7f8fc;
    border-radius: 30px;

    min-height: 700px;
    max-height: 700px;
    height: fit-content;
    width: 100%;

    padding: 15px 20px;
`;

const ResponsiveTableAdmin = styled.div`

    overflow-x: auto; /* Scrollable */
    width: 100%;

    * > {
        transition: all 0.2s ease-in-out;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        /* text-align: center; */
        font-family: "Vela Sans GX", sans-serif;
    }

    th {
        font-weight: 700; /* Qalin matn */

        color: #00000033;
        font-family: "Vela Sans GX", sans-serif;
        font-weight: 600;

        padding: 18px 12px; /* Yuqoridan va pastdan */
    }

    td {
        color: #333; /* Default matn rangi */
        padding: 17px !important;
        height: 100%;
        background-color: white; /* Jadval uyalarining default foni */
        .empty {
            height: 400px;
            background-color: var(--bg-color);
            &:hover {
                background-color: var(--bg-color);
            }
        }
        .start {
            align-items: center;
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
        border-bottom: 10px solid #f7f8fc;
        user-select: none;
        cursor: pointer;
        border-radius: 10px;
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

    .active {
        background: #216BF4 !important;

    }

    .active > td {
        background: #216BF4 !important;
        color: #fff;
    }
`;


const TableRegions2 = ({
                           thead, tbody, change = () => {
    }, currentRegion
                       }) => {
    const {translate, language} = useLanguage();
    return (
        <Container>
            <WhiteWrapper>
                <ResponsiveTableAdmin>
                    <table>
                        <thead>
                        <tr>
                            {thead.length > 0 &&
                                thead.map((v, i) => {
                                    if (i >= 1)
                                        return <th style={{textAlign: "center"}}>{v}</th>;
                                    return <th style={{textAlign: "left"}}>{v}</th>;
                                })}
                        </tr>
                        </thead>
                        <tbody>
                        {tbody?.length > 0 ? (
                            tbody?.map((row, i) => (
                                <tr
                                    className={row.id === currentRegion ?
                                        `active ${1 ? "redborder" : ""} `
                                        : ``
                                }
                                    style={{border: `2px solid ${((row?.lpuAmount === 0) && (row?.doctorsByDB === 0) && (row?.doctorsInFact === 0) && (row?.population === 0) )? "#FB3748 !important" : "transparent"}`,borderRadius: "10px"}}
                                    onClick={() => change(row)}
                                    key={row?.id}>
                                    <td style={{textAlign: "left"}}>
                                        {/*(row?.lpuAmount === 0) && (row?.doctorsByDB === 0) && (row?.doctorsInFact === 0) && (row?.population === 0)*/}
                                        {row?.[`name${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")} {" "}
                                    </td>
                                    <td style={{textAlign: "center"}}>{row?.lpuAmount}</td>
                                    <td style={{textAlign: "center"}}>{row?.doctorsByDB}</td>
                                    <td style={{textAlign: "center"}}>{row?.doctorsInFact}</td>
                                    <td style={{textAlign: "center"}}>{row?.population}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="empty"
                                    colSpan="6"
                                    style={{textAlign: "center"}}
                                >
                                    {translate("notInformation")}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </ResponsiveTableAdmin>
            </WhiteWrapper>
        </Container>
    )
        ;
}


export default TableRegions2;