import React, {useEffect, useState} from "react";
import {message} from "antd";
import styled from "styled-components";
import {TitleSmall, WhiteWrapper} from "../../root/style.js";
import {
    PaginationButtonsWrapper,
    ResponsiveTableAdmin,
} from "../../components/ResizeTable/ResizeTableAdmin/style";
import {formatPhoneNumber} from "../../utils/PhoneFormatter";
import LeftArrow from "../../assets/svg/LeftArrow";
import RightArrow from "../../assets/svg/RightArrow";
import CancelIcon from "../../assets/svg/CancelIcon";
import ReceptIcon from "../../assets/svg/ReceptIcon";
import {useLanguage} from "../../context/LanguageContext";
import {useGetContract} from "../../utils/server/server";
import Instance from "../../utils/Instance";
import {useQueryClient} from "@tanstack/react-query";

const Container = styled.div`
    position: relative;
    transition: all 0.2s ease-in-out;
`;

const ReNewConnect = ({title = ""}) => {
    const {translate,language} = useLanguage();
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isLoading} = useGetContract(currentPage,"DECLINED");

    const [isMainLoading, setMainLoading] = useState(false);

    const queryClient = useQueryClient(); // Initialize queryClient

    const totalPages = Math.ceil(data?.totalElements / 10) || 0;

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

    const currentData = data?.content;

    const onPrinyat = async (userId = 0, contract) => {
        try {
            setMainLoading(true);
            const response = await Instance.patch(
                `/v1/admin/contract/${userId}/user-enable`
            );
            // Invalidate and refetch the query to get updated data
            queryClient.invalidateQueries(["Contract", currentPage]);

            message.success(`${contract} ${translate("Успешно_получено")}`);
        } catch (error) {
            console.error("Error enabling contract", error);
            message.error(translate("произошла_ошибка"));
        } finally {
            setMainLoading(false);
        }
    };

    const onOtk = async (userId = 0, contract) => {
        try {
            setMainLoading(true);
            const response = await Instance.patch(
                `/v1/admin/contract/${userId}/user-decline`
            );
            queryClient.invalidateQueries(["Contract", currentPage]);

            message.success(
                `${contract}  ${translate("Успешно_отклонено")}`
            );
        } catch (error) {
            console.error("Error decline contract", error);
            message.error(translate("произошла_ошибка"));
        } finally {
            setMainLoading(false);
        }
    };

    console.log(currentData);

    return (
        <Container>
            {isLoading || isMainLoading ? (
                <div className="loaderParent">
                    <div className="loader"></div>
                </div>
            ) : (
                ""
            )}
            <WhiteWrapper>
                <TitleSmall>{title}</TitleSmall>
                <ResponsiveTableAdmin>
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th className="idfixed">{translate("Fullname_doctor")}</th>
                            <th>{translate("Регион")}</th>
                            <th>{translate("phone_number")}</th>
                            <th>{translate("pod_dogovor")}</th>
                            <th>{translate("Разрешение")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentData?.length > 0 ? (
                            currentData?.map((row, index) => (
                                <tr key={row?.id || index}>
                                    <td>№{index + 1}</td>
                                    <td className="idfixed">
                                        {row?.user?.firstName + " " + " " + row?.user?.lastName}
                                    </td>
                                    <td>
                                        {/* VILOYAT */}
                                        {row?.regionDistrictDTO?.[`regionName${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")}, {" "}
                                        {row?.regionDistrictDTO?.[`districtName${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")}
                                    </td>

                                    <td>{formatPhoneNumber(row?.user?.number)}</td>
                                    <td> {row?.id ? `${translate("Договоры")} №${row?.id}` : translate("NONE")} </td>

                                    <td className="buttons">
                                        <button
                                            disabled={isLoading || isMainLoading}
                                            onClick={() =>
                                                onPrinyat(row?.id, `${translate("Договоры")} №${row?.id}`)
                                            }
                                        >
                                            <ReceptIcon/>
                                            {translate("accept")}
                                        </button>
                                        <button
                                            onClick={() =>
                                                onOtk(row?.id, `${translate("Договоры")} №${row?.id}`)
                                            }
                                        >
                                            <CancelIcon/>
                                            {translate("reject")}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="empty"
                                    colSpan="7"
                                    style={{textAlign: "center"}}
                                >
                                    {translate("notInformation")}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </ResponsiveTableAdmin>

                <PaginationButtonsWrapper>
                    <button onClick={handlePrevious} disabled={currentPage === 0}>
                        <LeftArrow/>
                    </button>
                    <span>
            {currentPage + 1} {translate("from")} {""}
                        {totalPages}
          </span>
                    <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                        <RightArrow/>
                    </button>
                </PaginationButtonsWrapper>
            </WhiteWrapper>
        </Container>
    );
};

export default ReNewConnect;
