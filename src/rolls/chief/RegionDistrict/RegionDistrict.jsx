import {useQueryClient} from "@tanstack/react-query";
import React, {useState,useEffect} from "react";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import styled from "styled-components";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import {Title, TitleSmall} from "../../../root/style.js";
import Button from "../../../components/Generic/Button/Button.jsx";
import IconPlus from "../../../assets/svg/IconPlus.jsx";
import RegionTable from "./Table.jsx";
import {useDeleteDistrcit, useDeleteDrug, useGetDistricts, useGetRegions} from "../../../utils/server/server.js";
import * as XLSX from "xlsx";
import {message} from "antd";
import ModalAddRegion from "./Modal.jsx";
import ModalAddDistrict from "./ModalDistrictAdd.jsx";
import {transformDistrictsForSelect, transformRegionsForSelect} from "../../../utils/transformRegionsForSelect.js";
import {reloadPage} from "../../../utils/Instance.js";


const Container1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 50px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 15px;
    }
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 15px;
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .cards {
        border-radius: 30px;
        border: 1px solid #fafafa;
        background: #fff;
        width: 100%;
        padding: 20px;

        display: grid;
        gap: 10px;

        > .filters {
            display: grid;
            grid-template-columns: 100fr 100fr 1fr;
            gap: 10px;
            width: 100%;
        }

    }
`
const Box = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;

    @media (max-width: 768px) {
        align-items: center;
        justify-content: center;

        flex-wrap: wrap;

        gap: 15px;
    }
`;
const Text = styled.p`
    background: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    cursor: pointer;
    align-items: center;

    @media (max-width: 480px) {
        padding: 8px 16px;
        font-size: 14px;
    }

    user-select: none;

    &:hover {
        opacity: 0.5;
    }
`;
const Clear = styled.div`
    background: white;
    padding: 20px;
    cursor: pointer;
    border-radius: 20px;

    color: #216bf4;

    user-select: none;

    @media (max-width: 480px) {
        padding: 8px;
        font-size: 14px;
    }

    &:hover {
        opacity: 0.8;
    }
`;


const exportToExcel = (data) => {
    // 1. Jadval ma'lumotlarini tayyorlash
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Продажи");
    const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
    const blob = new Blob([excelBuffer], {type: "application/octet-stream"});
    saveAs(blob, "Districts.xlsx");
};


const RegionDistrict = () => {

    const [loading, setLoading] = useState(false);
    const [openAddRegion, setOpenAddRegion] = useState(false);
    const [openAddDistrict, setOpenDistrict] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [regionId, setRegionId] = useState(null);
    const [districtId, setDistrictId] = useState(null);


    const queryClient = useQueryClient();
    const {translate, language} = useLanguage();

    const {data: regions, isLoading: RegionsLoading} = useGetRegions();
    const {data: districts, isLoading: DistrictsLoading} = useGetDistricts(regionId);
    const [currentPage, setCurrentPage] = useState(0);


    const districtsWithRegion = regions?.flatMap(region => {
            return region?.districts?.map(district => ({
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
        }
    );

    useEffect(() => {
        const result = districtsWithRegion?.filter(item =>
            (!regionId || item?.region?.id === regionId) &&
            (!districtId || item?.districtId === districtId)
        );
        setFilteredData(result);
    }, [regions, regionId, districtId]);

    console.log("filterData",filteredData);

    const {data: Regions, isLoading} = useGetRegions();
    const regionsTranslate = transformRegionsForSelect(Regions, language);
    const districtsTranslate = transformDistrictsForSelect(districts, language);
    const handleRefresh = () => {
        setLoading(1);
        queryClient.invalidateQueries(["Regions"]); // Ma'lumotlarni qayta yuklash
        setTimeout(() => {
            setLoading(0);
        }, 100);
    };

    return <Wrapper>
        <Container1>
            <ModalAddRegion open={openAddRegion}  setOpen={setOpenAddRegion}/>
            <ModalAddDistrict open={openAddDistrict}  setOpen={setOpenDistrict}/>
            <div className={"cards"}>
                <TitleSmall>
                    {translate("Поиск_по_фильтрам")}
                </TitleSmall>
                <div className={"filters"}>
                    <PrimarySelect
                        def={translate("область")}
                        options={regionsTranslate}
                        onValueChange={(value) => {
                            setRegionId(value?.id)
                            setCurrentPage(0)
                        }}
                        selectedType={"id"}
                        onlyOption={1}
                    />
                    <PrimarySelect
                        def={translate("Район")}
                        options={districtsTranslate}
                        onValueChange={(value) => {
                            setDistrictId(value.districtId)
                            setCurrentPage(0)
                        }}
                        selectedType={"districtId"}
                        onlyOption={1}
                    />
                    <Text onClick={() => reloadPage()}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.53033 2.46967C9.23744 2.17678 8.76256 2.17678 8.46967 2.46967C8.17678 2.76256 8.17678 3.23744 8.46967 3.53033L9.18934 4.25H9C4.71979 4.25 1.25 7.71979 1.25 12C1.25 16.2802 4.72011 19.75 9.00028 19.75H9.5C9.91421 19.75 10.25 19.4142 10.25 19C10.25 18.5858 9.91421 18.25 9.5 18.25H9.00028C5.54846 18.25 2.75 15.4517 2.75 12C2.75 8.54822 5.54822 5.75 9 5.75H11C11.3033 5.75 11.5768 5.56727 11.6929 5.28701C11.809 5.00676 11.7448 4.68417 11.5303 4.46967L9.53033 2.46967Z"
                                fill="black"
                            />
                            <path
                                opacity="0.5"
                                d="M14.5 4.25C14.0858 4.25 13.75 4.58579 13.75 5C13.75 5.41421 14.0858 5.75 14.5 5.75H15C18.4518 5.75 21.25 8.54822 21.25 12C21.25 15.4518 18.4518 18.25 15 18.25H13C12.6967 18.25 12.4232 18.4327 12.3071 18.713C12.191 18.9932 12.2552 19.3158 12.4697 19.5303L14.4697 21.5303C14.7626 21.8232 15.2375 21.8232 15.5304 21.5303C15.8232 21.2374 15.8232 20.7626 15.5304 20.4697L14.8107 19.75H15C19.2802 19.75 22.75 16.2802 22.75 12C22.75 7.71979 19.2802 4.25 15 4.25H14.5Z"
                                fill="black"
                            />
                        </svg>
                    </Text>
                </div>
            </div>
            <TitleContainer>
                <Title>{translate("Регионы_районы")}</Title>
                <Box>
                    <Text onClick={() => setOpenAddRegion(true)}>
                        <IconPlus
                            color="#216BF4"
                            color2="#216BF4"
                        />
                        {translate("Регион")}
                    </Text>
                    <Text onClick={() => setOpenDistrict(1)}>
                        <IconPlus
                            color="#216BF4"
                            color2="#216BF4"
                        />
                        {translate("Район")}
                    </Text>
                    <Text onClick={() => handleRefresh()}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.53033 2.46967C9.23744 2.17678 8.76256 2.17678 8.46967 2.46967C8.17678 2.76256 8.17678 3.23744 8.46967 3.53033L9.18934 4.25H9C4.71979 4.25 1.25 7.71979 1.25 12C1.25 16.2802 4.72011 19.75 9.00028 19.75H9.5C9.91421 19.75 10.25 19.4142 10.25 19C10.25 18.5858 9.91421 18.25 9.5 18.25H9.00028C5.54846 18.25 2.75 15.4517 2.75 12C2.75 8.54822 5.54822 5.75 9 5.75H11C11.3033 5.75 11.5768 5.56727 11.6929 5.28701C11.809 5.00676 11.7448 4.68417 11.5303 4.46967L9.53033 2.46967Z"
                                fill="black"
                            />
                            <path
                                opacity="0.5"
                                d="M14.5 4.25C14.0858 4.25 13.75 4.58579 13.75 5C13.75 5.41421 14.0858 5.75 14.5 5.75H15C18.4518 5.75 21.25 8.54822 21.25 12C21.25 15.4518 18.4518 18.25 15 18.25H13C12.6967 18.25 12.4232 18.4327 12.3071 18.713C12.191 18.9932 12.2552 19.3158 12.4697 19.5303L14.4697 21.5303C14.7626 21.8232 15.2375 21.8232 15.5304 21.5303C15.8232 21.2374 15.8232 20.7626 15.5304 20.4697L14.8107 19.75H15C19.2802 19.75 22.75 16.2802 22.75 12C22.75 7.71979 19.2802 4.25 15 4.25H14.5Z"
                                fill="black"
                            />
                        </svg>
                        {translate("Обновить_базу")}

                    </Text>
                    <Clear onClick={() => exportToExcel(filteredData)}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.5"
                                d="M22 16.0006V15.0006C22 12.1721 21.9998 10.7584 21.1211 9.87966C20.2424 9.00098 18.8282 9.00098 15.9998 9.00098H7.99977C5.17135 9.00098 3.75713 9.00098 2.87845 9.87966C2 10.7582 2 12.1714 2 14.9984V15.0006V16.0006C2 18.829 2 20.2432 2.87868 21.1219C3.75736 22.0006 5.17157 22.0006 8 22.0006H16C18.8284 22.0006 20.2426 22.0006 21.1213 21.1219C22 20.2432 22 18.829 22 16.0006Z"
                                fill="#216BF4"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2V12.9726L9.56946 11.0119C9.29989 10.6974 8.82642 10.661 8.51192 10.9306C8.19743 11.2001 8.16101 11.6736 8.43057 11.9881L11.4305 15.4881C11.573 15.6543 11.781 15.75 12 15.75C12.2189 15.75 12.4269 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4305 11.0119L12.75 12.9726V2C12.75 1.58579 12.4142 1.25 12 1.25Z"
                                fill="#216BF4"
                            />
                        </svg>
                    </Clear>
                </Box>
            </TitleContainer>
        </Container1>
        <RegionTable
            loading={RegionsLoading || loading}
            regions={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
    </Wrapper>
}


export default RegionDistrict;