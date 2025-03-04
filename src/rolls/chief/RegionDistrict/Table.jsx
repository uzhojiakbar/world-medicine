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
import {useDeleteWorkplace, useGetRegions, useGetWorkplacesById} from "../../../utils/server/server.js";
import {useQueryClient} from "@tanstack/react-query";
import ModalEditLpu from "./Modal.jsx";
import * as XLSX from "xlsx";


const RegionTable = ({loading}) => {
    const {translate} = useLanguage();
    const {data: regions, isLoading: RegionsLoading} = useGetRegions();


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

    return (<Container>
        {RegionsLoading || loading ? (<div className="loaderFixed">
            <div className="loader"></div>
        </div>) : ""}
        <WhiteWrapper>
            <Wrapper>
                {districtsWithRegion?.map((item, index) => (
                    <Details key={index}>
                        <div className={"flexp"}>
                            <span>{item?.region?.name}</span>
                            <span>ID: {item?.districtId}</span>
                        </div>
                        <div>{item?.name}</div>
                        <div className="button">
                            <button
                                style={{background: "transparent", padding: "0"}}
                                className="Viewbutton"
                                onClick={() => console.log(row.districtId)}
                            >
                                <Edit/>
                            </button>
                            <button
                                style={{background: "transparent", padding: "0"}}
                                className="Viewbutton"
                                onClick={() => console.log(row.districtId)}
                            >
                                <DeleteIconBig/>
                            </button>
                        </div>
                    </Details>
                ))}
            </Wrapper>
        </WhiteWrapper>
    </Container>);
};

export default RegionTable;
