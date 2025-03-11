import React, {useCallback, useMemo, useState} from "react";
import {
    AllChartContainer,
    AppointmentWrapper,
    ChartContainer,
    Child,
    Container,
    FilterWrapper,
    Form,
    InfoContainer,
    InfoItem,
    Item,
    ItemWrapper,
    Wrapper,
    Title,
} from "./style";
import GenericAnalitikaTable from "./GenericTable";
import SalesChart from "./SelesChart";
import HorizontalChart from "../../../../components/HorizontalBar";
import ChartBar from "../../../../components/ChartBar";
import PieDiagram from "../../../../components/PieDiagram/PieDiagream2";
import Input2 from "../../../../components/Generic/Input/Input2";
import {Tumanlar} from "../../../../mock/data";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import {useLanguage} from "../../../../context/LanguageContext";
import {useGetDashboard, useGetDistricts, useGetRegions} from "../../../../utils/server/server.js";
import {transformDistrictsForSelect, transformRegionsForSelect} from "../../../../utils/transformRegionsForSelect.js";
import TableRegions from "./TableRegions.jsx";
import {motion} from "framer-motion";
import TableRegions2 from "./TableRegions2.jsx";
import TableSpec from "./TableSpec.jsx";
import OxvatChart from "../../../../Asadbek/charts/OxvatChart/index.jsx";

const AnalitikaChiefPage = () => {
    const {translate, language} = useLanguage();
    const [region, setRegion] = useState(null);
    const [district, setDistrict] = useState(null);
    const {data: dashboardData, isLoading: isLoadingDashboard} = useGetDashboard({
        regionId: region || null,
        districtId: district || null,
    })
    console.log("dashboardData", dashboardData)


    const {data: Regions, isLoading: loadingRegions} = useGetRegions();
    const {data: Districts, isLoading: loadingDistricts} = useGetDistricts(region || null);

    const regionsTranslate = useMemo(
        () => transformRegionsForSelect(Regions, language),
        [Regions, translate]
    );
    const districtsTranslate = useMemo(
        () => transformDistrictsForSelect(Districts, language),
        [Districts, translate]
    );
    const [selectedTuman, setSelectedTuman] = useState("");
    const handleChangeRegion = useCallback((selected) => {
        console.log("1111111111", selected);
        setRegion(selected.id);
    }, []);

    const handleChangeDistrict = useCallback((selected, dId) => {

        if (dId) {
            console.log(selected, dId);
            console.log(selected, dId);
            console.log(selected, dId);
            console.log(selected, dId);
            console.log("1111111111", selected);
            setDistrict(selected);
        } else {
            setDistrict(selected.id);

        }
    }, []);

    const [active, setActive] = useState(1);

    const [formData, setFormData] = useState({
        district: selectedTuman || "",
        preparation: "",
        fullName: "",
        Специальность: "",
        lpu: "",
    });

    const handleChange = (e) => {
        let name,
            value = "";
        if (!Array.isArray(e)) {
            name = e.target.name;
            value = e.target.value;
        } else {
            name = e[0];
            value = e[1];
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // formData ichidagi qiymatni yangilash
        }));
    };


    const tableData = {
        thead: {
            viloyat: "Регион",
            price: "Кол-во сотрудников",
        },
        tbody: [
            {id: 1, viloyat: "Ташкентская", price: "5"},
            {id: 2, viloyat: "Сырдарьинская", price: "1"},
            {id: 3, viloyat: "Навоийская", price: "3"},
            {id: 4, viloyat: "Ферганская", price: "6"},
            {id: 5, viloyat: "Андижанская", price: "2"},
            {id: 6, viloyat: "Бухарская", price: "8"},
            {id: 7, viloyat: "Хорезмская", price: "4"},
            {id: 8, viloyat: "Кашкадарьинская", price: "1"},
            {id: 9, viloyat: "Навоийская", price: "4"},
        ],
    };

    const назначению = [
        {title: "1 Ношпа", price: "110"},
        {title: "4 Гастал", price: "110"},
        {title: "2 АЦЦ", price: "110"},
        {title: "5 Нафтизин", price: "110"},
        {title: "3 Терафлю", price: "110"},
        {title: "6 Марганцовка", price: "110"},
    ];

    return (
        <Container>
            {loadingRegions || isLoadingDashboard || loadingDistricts ? (
                <div className="loaderParent">
                    <div className="loader"></div>
                </div>
            ) : (
                ""
            )}
            <Title>{translate("Аналитика")}</Title>

            <Wrapper>
                <ItemWrapper>
                    <FilterWrapper>
                        <Form>
                            <PrimarySelect
                                def={translate("Регион")}
                                options={regionsTranslate || []}
                                onValueChange={handleChangeRegion}
                                onlyOption={1}
                                selectedType="id"
                                selectedOptionId={region}
                            />
                            <PrimarySelect
                                def={translate("Район")}
                                options={districtsTranslate}
                                onValueChange={(value) => handleChangeDistrict(value?.districtId, 1)}
                                onlyOption={1}
                                selectedType="districtId"
                            />
                            <PrimarySelect
                                def={translate("ЛПУ")}
                                options={[]}
                                onValueChange={(value) => handleChange(["lpu", value])}
                            />

                            {/* * */}

                            <PrimarySelect
                                def={translate("Специальность")}
                                options={[]}
                                onValueChange={(value) =>
                                    handleChange(["Специальность", value])
                                }
                            />
                            <Input2
                                type={"text"}
                                placeholder={translate("Ф.И.О")}
                                onChange={handleChange}
                                name="fullName"
                            />
                            <PrimarySelect
                                def={translate("Препарат")}
                                options={[]}
                                onValueChange={(value) => handleChange(["preparation", value])}
                            />
                            <DateRangePicker/>
                        </Form>
                        <InfoContainer>
                            <InfoItem>
                                <Title size={"24"}>{translate("Квота")}</Title>
                                <Title size={"38"} title="true">
                                    {dashboardData?.quote}
                                </Title>
                            </InfoItem>
                            <InfoItem>
                                <Title size={"24"}>{translate("Продажи")}</Title>
                                <Title size={"38"} title="true">
                                    {dashboardData?.sales}
                                </Title>
                            </InfoItem>
                            <InfoItem>
                                <Title size={"24"}>%</Title>
                                <Title size={"38"} title="true">
                                    {dashboardData?.quote > 0
                                        ? ((dashboardData?.sales / dashboardData?.quote) * 100).toFixed(2) + "%"
                                        : "0%"}
                                </Title>
                            </InfoItem>
                        </InfoContainer>
                    </FilterWrapper>
                    {
                        region ?
                            district ? <FilterWrapper>
                                <TableSpec
                                    thead={["Специальность", "Врачи по базе", "Врачи по факту"]}
                                    tbody={dashboardData?.recordDistrictDTO?.recordWorkPlaceStatsDTOList}
                                    data={tableData}
                                    currentRegion={region}
                                />
                            </FilterWrapper> : <FilterWrapper>
                                <TableRegions
                                    thead={[translate("Регион"), translate("amount-kolvo")]}
                                    tbody={dashboardData?.recordDistrictDTO?.employeeStatsList}
                                    data={tableData}
                                    change={handleChangeDistrict}
                                />
                            </FilterWrapper>
                            :
                            <FilterWrapper>
                                <TableRegions
                                    thead={[translate("Регион"), translate("amount-kolvo")]}
                                    tbody={dashboardData?.recordRegionDTO?.employeeStatsList}
                                    data={tableData}
                                    currentRegion={region}
                                    change={handleChangeRegion}
                                />
                            </FilterWrapper>
                    }
                </ItemWrapper>
                {
                    region ?
                        district ? "" : <ItemWrapper>
                            <FilterWrapper>
                                <TableRegions2
                                    thead={["Регион", "ЛПУ", "Врачи по базе", "Врачи по факту", "Население"]}
                                    tbody={dashboardData?.recordDistrictDTO?.recordStatsEmployeeFactList}
                                    data={tableData}
                                    currentRegion={region}
                                />
                            </FilterWrapper>
                            <FilterWrapper>
                                <TableSpec
                                    thead={["Специальность", "Врачи по базе", "Врачи по факту"]}
                                    tbody={dashboardData?.recordDistrictDTO?.recordWorkPlaceStatsDTOList}
                                    data={tableData}
                                    currentRegion={region}
                                />
                            </FilterWrapper>
                        </ItemWrapper>
                        :
                        <ItemWrapper>
                            <FilterWrapper>
                                <TableRegions2
                                    thead={["Регион", "ЛПУ", "Врачи по базе", "Врачи по факту", "Население"]}
                                    tbody={dashboardData?.recordRegionDTO?.recordStatsEmployeeFactList}
                                    data={tableData}
                                    currentRegion={region}
                                />
                            </FilterWrapper>
                            <FilterWrapper>
                                <TableSpec
                                    thead={["Специальность", "Врачи по базе", "Врачи по факту"]}
                                    tbody={dashboardData?.recordRegionDTO?.recordWorkPlaceStatsDTOList}
                                    data={tableData}
                                    currentRegion={region}
                                />
                            </FilterWrapper>
                        </ItemWrapper>
                }

                {
                    // region ? <ItemWrapper>
                    //     <FilterWrapper>
                    //         <TableRegions data={tableData}/>
                    //     </FilterWrapper>
                    //     <FilterWrapper>
                    //         <GenericAnalitikaTable data={tableData}/>
                    //     </FilterWrapper>
                    // </ItemWrapper> :       <ItemWrapper>
                    //     <FilterWrapper>
                    //         <GenericAnalitikaTable data={tableData}/>
                    //     </FilterWrapper>
                    //     <FilterWrapper>
                    //         <GenericAnalitikaTable data={tableData}/>
                    //     </FilterWrapper>
                    // </ItemWrapper>
                }

            </Wrapper>

            <AllChartContainer>
                <ChartContainer>
                    <AppointmentWrapper>
                        <Title size={"24"}>
                            {translate("Топ")} {6}{" "}
                            {translate("по назначению")}
                        </Title>
                        {dashboardData?.topProductsOnSellDTO?.map((v) => {
                            return (
                                <Item>
                                    <div>{v?.medicine?.name}</div>
                                    <div>
                                        {v?.amount} {translate("шт")}.
                                    </div>
                                </Item>
                            );
                        })}
                    </AppointmentWrapper>
                    <AppointmentWrapper>
                        <SalesChart title={"Статистика продаж"} active={active}/>
                    </AppointmentWrapper>
                </ChartContainer>
                <ChartContainer>
                    <AppointmentWrapper gap={"0px"}>
                        <Child>
                            <PieDiagram
                                item={["Рецепт", "СБ", "СУ", "ГЭ"]}
                                bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
                                title={translate("Инвестиции_по_упаковкам")}
                            />
                            <PieDiagram
                                item={["Рецепт", "СБ", "СУ", "ГЭ"]}
                                bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
                                title={translate("Инвестиции_по_сумме")}
                            />
                        </Child>
                        <Child>
                            <Child>
                                <SalesChart
                                    title={"Статистика выполнение задач"}
                                    active={active}
                                    seles={["Выполнено", "Квота"]}
                                />
                            </Child>
                            <Child>
                                <PieDiagram
                                    item={["Рецепт", "СБ", "СУ", "ГЭ"]}
                                    bgColor={["#001EB9", "#FF5B99", "#C4D9FF", "#35FF50"]}
                                    title={translate("Рецептов_в_месяц")}
                                />
                            </Child>
                        </Child>
                        {/*<Child>*/}
                        {/*  <HorizontalChart title={"Продажа препаратов по регионам"} />*/}
                        {/*  <ChartBar title={"Активность врачей"} active={active} />*/}
                        {/*</Child>*/}
                    </AppointmentWrapper>
                </ChartContainer>
                <ChartContainer>
                    <OxvatChart
                        title={translate("Охват_врачей")}
                    />
                </ChartContainer>
            </AllChartContainer>
        </Container>
    );
};

export default AnalitikaChiefPage;
