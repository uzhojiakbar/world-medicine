import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    ButtonWrapper,
    Child,
    Con,
    Container,
    EditIconCon,
    IconWrap,
    Info,
    InfoContainer,
    InfoTitle, InfoTitleInner,
    InfoWrapper,
    Item,
    ItemContainer,
    Line,
    Wrap,
    Wrapper,
} from "./style";
import {MiniTitleSmall, Title} from "../../root/style";
import {useLanguage} from "../../context/LanguageContext";
import Man from "../../assets/svg/Man";
import DateRangePicker from "../../components/Generic/DataRangePicker/DataRangePicker";
import DatePicker from "./DatePicker";
import PrimarySelect from "../../components/Generic/Select/Select";
import Button from "../../components/Generic/Button/Button";
import IconPlus from "../../assets/svg/IconPlus";
import {
    useAddAdminDoctorGoal,
    useAddAdminManagerGoal,
    useGetDistrcitById,
    useGetDistricts,
    useGetDoctorsFilter, useGetDrugs,
    useGetManagers,
    useGetProfileInfo
} from "../../utils/server/server.js";
import {
    transformDistrictsForSelect,
    transformDrugsForSelect,
    transformRegionsForSelect
} from "../../utils/transformRegionsForSelect.js";
import {DirectionFlexGap, IconWrapper, RightItemMenu, SectionInner} from "../../rolls/chief/home/ManagersGoal/style.js";
import EditableSelect from "../../components/Generic/EditableSelect/EditableSelect.jsx";
import {message} from "antd";
import DeleteIcon from "../../assets/svg/DeleteIcon.jsx";
import SaveIcon from "../../assets/svg/SaveIcon.jsx";
import EditIcon from "../../assets/svg/EditIcon.jsx";
import Input from "../../components/Generic/Input/Input.jsx";

const CreateMedAgent = () => {
    const {translate, language} = useLanguage();

    // States
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("RECIPE");
    const [currentDistrict, setCurrentDistrict] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState({startDate: "", endDate: ""});
    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [editingDrugId, setEditingDrugId] = useState(null);
    const [editValue, setEditValue] = useState("");

    console.log(activeTab)
    // from Backend
    const {data: profileInfo, isLoading: IsLoadingProfileInfo} =
        useGetProfileInfo();
    const {data: district, isLoading: isDistrictLoading} = useGetDistrcitById(
        profileInfo?.districtId || null
    );
    const {data: districts, isLoading: isLoadingDistricts} =
        useGetDistricts(district?.regionId || null);
    const {data: doctors, isLoading: isLoadingDoctors} = useGetDoctorsFilter({
        districtId: currentDistrict || null,
    });
    const {data: drugs, isLoading: isLoadingDrugs} = useGetDrugs();

    // mutate
    const mutation = useAddAdminDoctorGoal();


    // translate
    const regionsTranslate = useMemo(
        () => transformDistrictsForSelect(districts, language),
        [districts, translate]
    );
    const drugsTranslate = useMemo(
        () => transformDrugsForSelect(drugs, translate),
        [drugs, translate]
    );


    // handle
    const handleChangeRegion = useCallback((selected) => {


        console.log(selected)
        setCurrentDistrict(selected?.districtId || null);
    }, []);
    const handleDateChange = useCallback((dates) => setDate(dates), []);

    //  Drugs crud
    const handleDrugSelect = useCallback(
        (selected) => {
            if (!selectedDrugs.some((d) => d.fieldName === selected.label)) {
                setSelectedDrugs((prev) => [
                    ...prev,
                    {
                        id: selected.id,
                        fieldName: selected.label,
                        quote: 0,
                    },
                ]);
            }
        },
        [selectedDrugs]
    );
    const handleDeleteDrug = useCallback((id) => {
        setSelectedDrugs((prev) => prev.filter((drug) => drug.id !== id));
    }, []);

    const handleEditInitDrug = useCallback((id, quote) => {
        setEditingDrugId(id);
        setEditValue(quote);
    }, []);

    const handleEditSaveDrug = useCallback(
        (id) => {
            console.log("click")
            setSelectedDrugs((prev) =>
                prev.map((drug) =>
                    drug.id === id ? {...drug, quote: editValue} : drug
                )
            );
            setEditingDrugId(null);
            setEditValue("");
        },
        [editValue]
    );
    const doctorOptions = useMemo(
        () =>
            doctors?.map((doctor) => ({
                value: doctor.userId,
                label: `${doctor.firstName} ${doctor.lastName}`,
                id: doctor.userId,
            })) || [],
        [doctors]
    );


    const prepareRequestData = () => {
        setLoading(1)
        if (!currentDistrict) {
            console.error(translate("Районы_не_выбраны"));
            message.warning(translate("Районы_не_выбраны"));
            setLoading(0)
            return;
        }
        if (!doctor?.id) {
            console.error(translate("врач_не_найден"));
            message.warning(translate("врач_не_найден"));
            setLoading(0)
            return;
        }
        if (!date?.startDate) {
            message.warning(translate("Дата_начала_или_окончания_не_указана"));
            console.log(translate("Дата_начала_или_окончания_не_указана"));
            setLoading(0)
            return;
        }

        const requestData = {
            "doctorId": doctor.id,
            "startDate": date.startDate === "Invalid Date" ? new Date().toISOString().split('T')[0] : date?.startDate,
            "endDate": date.endDate === "Invalid Date" ? null : date.endDate,
            "managerId": profileInfo.userId,
            "contractType": activeTab,
            "medicinesWithQuantities": selectedDrugs.map((drug) => ({
                medicineId: drug.id,
                quote: parseInt(drug.quote),
            })),
        }
        console.log("requestData", requestData);
        mutation.mutate({
            requestData: requestData,
            onSuccess: () => {
                message.success(translate("Добавлена_контракт_для_Доктор"));
                setTimeout(() => {
                    setLoading(false);
                    document.location.reload();
                }, 500);
            },
            onError: (err) => {
                console.log("error", err);
                setLoading(false);
                if (
                    err?.response?.data?.error.includes("Doctor had already assigned")
                ) {
                    message.error(translate("Доктор_уже_назначил_контракт"));
                } else  if (
                    err?.response?.data?.error.includes("Manager Goal Doesn't exists")
                ) {
                    message.error(translate("manager_goal_not_exists"));
                }
                else {
                    message.error(translate("Ошибка_добавления_контракт_для_Доктор"));
                }
            },
        });
        console.log("Request Data:", requestData);
        return requestData;
    }


    const titles = [
            {
                name: translate("RECIPE"),
                key: "RECIPE",
            },
            {
                name: translate("SU"),
                key: "SU",
            }, {
                name: translate("SB"),
                key: "SB",
            }, {
                name: translate("GZ"),
                key:
                    "GZ",
            },
            {
                name: translate("КВ"),
                key:
                    "KZ",
            }
        ]
    ;
    return (
        <Container>
            {(loading ||
                IsLoadingProfileInfo || isLoadingDistricts || isDistrictLoading
            ) && (
                <div className="loaderParent">
                    <div className="loader"></div>
                </div>
            )}
            <Wrapper>
                <Title className="titlee">{translate("Создание_договора")}</Title>
                <ButtonWrapper>
                    {titles.map(({name:tab,key},i) => (
                        <Item
                            key={i}
                            active={activeTab === key ? "true" : ""}
                            onClick={() => setActiveTab(key)}
                        >
                            {tab}
                        </Item>
                    ))}
                </ButtonWrapper>
                <InfoWrapper>
                    <InfoContainer>
                        <DirectionFlexGap gap="10px">
                            <MiniTitleSmall>{translate("Район")}</MiniTitleSmall>
                            <PrimarySelect
                                def={translate("Выберите_Район")}
                                options={regionsTranslate}
                                onValueChange={handleChangeRegion}
                                onlyOption
                            />
                        </DirectionFlexGap>
                        <SectionInner gap="10px">
                            <IconWrapper>
                                <Man/>
                            </IconWrapper>
                            <EditableSelect
                                options={doctorOptions}
                                placeholder={translate("Выберите_врача")}
                                def={translate("Выберите_врача")}
                                onClick={() => !currentDistrict && message.error(translate("Сначала_выберите_Район"))}
                                disabled={!currentDistrict}
                                onValueChange={setDoctor}
                                initialValue={doctor}
                            />
                        </SectionInner>
                        <DirectionFlexGap gap="10px">
                            <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
                            <DateRangePicker onlyFuture={1} onDateChange={handleDateChange}/>
                        </DirectionFlexGap> <DirectionFlexGap gap="10px">
                        <MiniTitleSmall>{translate("Цель")}</MiniTitleSmall>
                        <InfoTitleInner>
                            <div> {translate("Шаг")}</div>
                            <span> {translate("1.740.000")}</span>
                        </InfoTitleInner>

                    </DirectionFlexGap>
                    </InfoContainer>
                    <InfoContainer>
                        <RightItemMenu>
                            <DirectionFlexGap gap="10px">
                                <MiniTitleSmall>{translate("Препараты")}</MiniTitleSmall>
                                <PrimarySelect
                                    def={translate("Выберите_препарат")}
                                    options={drugsTranslate}
                                    onValueChange={handleDrugSelect}
                                    onlyOption
                                />
                            </DirectionFlexGap>
                            {selectedDrugs.map((v) => (
                                <ItemContainer
                                    onDoubleClick={() => handleEditInitDrug(v.id, v.quote)}
                                    key={v.id}>
                                    <Child>
                                        <EditIconCon onClick={() => handleDeleteDrug(v.id)}>
                                            <DeleteIcon/>
                                        </EditIconCon>
                                        <span>{translate(v.fieldName)}</span>
                                    </Child>
                                    <Child>
                                        {editingDrugId === v.id ? (
                                            <>
                                                <Input
                                                    height={"40px"}
                                                    type="number"
                                                    value={editValue}
                                                    onChange={setEditValue}
                                                    placeholder={translate("quote")}
                                                />
                                                <EditIconCon onClick={() => handleEditSaveDrug(v.id)}>
                                                    <SaveIcon/>
                                                </EditIconCon>
                                            </>
                                        ) : (
                                            <>
                                                <span className={v.quote == 0 ? "red" : ""}>{v.quote}</span>
                                                <EditIconCon
                                                    onClick={() => handleEditInitDrug(v.id, v.quote)}
                                                >
                                                    <EditIcon red={v.quote == 0}/>
                                                </EditIconCon>
                                            </>
                                        )}
                                    </Child>
                                </ItemContainer>
                            ))}

                        </RightItemMenu>
                    </InfoContainer>
                </InfoWrapper>
                <Button
                    onClick={prepareRequestData}
                    w={"100%"} icon={<IconPlus/>}>{translate("Создать_договор")}</Button>
            </Wrapper>
        </Container>
    );
};

export default CreateMedAgent;
