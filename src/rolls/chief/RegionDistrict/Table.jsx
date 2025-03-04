import React, {useEffect, useState} from "react";
import {TitleSmall, WhiteWrapper} from "../../../root/style";
import {
    PaginationButtonsWrapper, ResponsiveTableAdmin,
} from "../../../components/ResizeTable/ResizeTableAdmin/style";
import LeftArrow from "../../../assets/svg/LeftArrow";
import RightArrow from "../../../assets/svg/RightArrow";
import styled from "styled-components";
import {useLanguage} from "../../../context/LanguageContext";
import Input from "../../../components/Generic/Input/Input"; // Import your Input component
import {Container, Details, Wrapper} from "./TableStyle";
import Edit from "../../../assets/svg/Edit.jsx";
import DeleteIcon from "../../../assets/svg/DeleteIcon.jsx";
import DeleteIconBig from "../../../assets/svg/DeleteIconBig.jsx";
import {message} from "antd";
import {
    useDeleteDistrcit,
    useDeleteWorkplace,
    useGetRegions,
    useGetWorkplacesById
} from "../../../utils/server/server.js";
import {useQueryClient} from "@tanstack/react-query";
import ModalEditLpu from "./Modal.jsx";
import * as XLSX from "xlsx";
import {useCopyToClipboard} from "../../../utils/CopyClipboard.jsx";


const RegionTable = ({loading}) => {
    const {translate, language} = useLanguage();

    const [loadingInner, setLoadingInner] = useState(false);

    const {data: regions, isLoading: RegionsLoading} = useGetRegions();

    const {copyToClipboard} = useCopyToClipboard();


    const districtsWithRegion = regions?.flatMap(region =>
        region?.districts?.map(district => ({
            districtId: district?.districtId,
            name: district?.name,
            nameUzCyrillic: district?.nameUzCyrillic,
            nameUzLatin: district?.nameUzLatin,
            nameRussian: district?.nameRussian,
            region: {
                id: region?.id,
                name: region?.name,
                nameUzCyrillic: region?.nameUzCyrillic,
                nameUzLatin: region?.nameUzLatin,
                nameRussian: region?.nameRussian
            }
        }))
    );


    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(districtsWithRegion?.length / itemsPerPage);


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

    const currentData = districtsWithRegion?.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const deleteDistrict = useDeleteDistrcit();
    const handleDelete = (id, name) => {
        deleteDistrict.mutate(id, {
            onError: (error) => {
                console.error("Failed to delete the drug:", error);
                message.error(translate("distrcit_delete_error") + `: ${name}`);
                setLoadingInner(0);
            }, onSuccess: () => {
                message.success(translate("district_deleted") + `: ${name}`);
                setLoadingInner(0);
            },
        });

        setLoadingInner(1);
        console.log(id);
    };


    return (<Container>
        {RegionsLoading || loading || loadingInner ? (<div className="loaderFixed">
            <div className="loader"></div>
        </div>) : ""}
        <WhiteWrapper>
            <Wrapper>
                {currentData?.map((item, index) => (
                    <Details className={"doubeCLickEffect"} onDoubleClick={()=>copyToClipboard(item?.districtId)} key={index}>
                        <div className={"flexp"}>
                            <span>{item?.region?.[`name${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")}</span>
                            <span>ID: {item?.districtId}</span>
                        </div>
                        <div>{item?.[`name${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")}</div>
                        <div className="button">
                            <button
                                style={{background: "transparent", padding: "0"}}
                                className="Viewbutton"
                                onClick={() => console.log(item?.districtId)}
                            >
                                <Edit/>
                            </button>
                            <button
                                style={{background: "transparent", padding: "0"}}
                                className="Viewbutton"
                                onClick={() => handleDelete(item?.districtId, item?.[`name${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE"))}
                            >
                                <DeleteIconBig/>
                            </button>
                        </div>
                    </Details>
                ))}
            </Wrapper>
            <PaginationButtonsWrapper>
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                    <LeftArrow/>
                </button>
                <span>
            {currentPage + 1} {translate("from")} {""} {totalPages}
          </span>
                <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                    <RightArrow/>
                </button>
            </PaginationButtonsWrapper>
        </WhiteWrapper>
    </Container>);
};

export default RegionTable;
