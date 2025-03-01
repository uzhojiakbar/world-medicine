import React, {useCallback, useEffect, useMemo, useState} from "react";
import {InformationTitleSpan, TitleSpan} from "../../../../root/style";
import {BaseDoctorCon, Line, NavTitleSection} from "./style";
import {useLanguage} from "../../../../context/LanguageContext";
import {Checkbox} from "antd";
import Input from "../../../../components/Generic/Input/Input";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import {Viloyatlar, Tumanlar, MestaRabot} from "../../../../mock/data";
import {useNavigate} from "react-router-dom";
import {
    useGetDistricts,
    useGetDoctors,
    useGetRegions,
} from "../../../../utils/server/server";
import FieldnamesManager from "../../../../utils/fieldnamesManager";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import Table from "./Table";
import Button from "../../../../components/Generic/Button/Button.jsx";
import IconPlus from "../../../../assets/svg/IconPlus.jsx";
import {transformDistrictsForSelect, transformRegionsForSelect} from "../../../../utils/transformRegionsForSelect.js";

const information = {
    all: 500,
    fact: 200,
    new: 10,
};

import { useRef } from "react";


const BaseDoctor = ({FilterHide, title}) => {
    const nav = useNavigate();
    const {translate, language, setLanguage} = useLanguage();

    const [selectedViloyat, setSelectedViloyat] = useState("");
    const [selectedTuman, setSelectedTuman] = useState("");
    const [selectedMestaRabot, setSelectedMestaRabot] = useState("");
    const [nameSurname, setNameSurname] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [date, setDate] = useState([]);


    const nameSurnameRef = useRef(null);
    const viloyatRef = useRef(null);
    const tumanRef = useRef(null);
    const specializationRef = useRef(null);
    const mestaRabotRef = useRef(null);
    const datePickerRef = useRef(null);


    console.log("nameSurname",nameSurname);
    const specializations = FieldnamesManager();

    const {data: regions, isLoading: isLoadingRegions} = useGetRegions();
    const {data: districts, isLoading: isLoadingDistricts} =
        useGetDistricts(selectedViloyat);
    const {data: doctors, isLoading: isLoadingDoctors} = useGetDoctors({
        regionId: selectedViloyat,
        districtId: selectedTuman ? selectedTuman : null,
        nameQuery: nameSurname || null,
    });

    console.log("doctors",doctors)


    const [filteredDoctors, setFilteredDoctors] = useState();

    useEffect(() => {
        setSelectedTuman(""); // Reset tuman when viloyat changes
    }, [selectedViloyat]);

    useEffect(() => {
        // Assuming doctors are refetched from the server when `selectedTuman` changes
        setFilteredDoctors(doctors);
    }, [selectedTuman, doctors]);

    useEffect(() => {
        // Filter doctors based on selected specialization
        const filtered = doctors?.filter(
            (doc) =>
                (!selectedSpecialization || doc.fieldName === selectedSpecialization) &&
                (!date.startDate ||
                    (new Date(doc.dateOfBirth) >= new Date(date.startDate) &&
                        new Date(doc.dateOfBirth) <= new Date(date.endDate)))
        );
        setFilteredDoctors(filtered);
    }, [selectedSpecialization, date, doctors]);

    const regionsTranslate = useMemo(
        () => transformRegionsForSelect(regions, language),
        [regions, translate]
    );

    const districtsTranslate = useMemo(
        () => transformDistrictsForSelect(districts, language),
        [districts, translate]
    );

    const getOptions = (items, language) => {
        console.log(items);

        return items?.map((item) => ({
            id: item.id,
            value: item["name"], // Using template literals to dynamically access properties based on language
        }));
    };
    const getOptionsDistricts = (items, language) => {
        console.log(items);

        return items?.map((item) => ({
            id: item?.districtId,
            value: item["name"], // Using template literals to dynamically access properties based on language
        }));
    };

    const handleDateChange = useCallback((dates) => setDate(dates), []);

    const clearFilters = () => {
        if (nameSurnameRef.current) nameSurnameRef.current.value = "";
        if (viloyatRef.current) viloyatRef.current.clear();
        if (tumanRef.current) tumanRef.current.clear();
        if (specializationRef.current) specializationRef.current.clear();
        if (mestaRabotRef.current) mestaRabotRef.current.clear();
        if (datePickerRef.current) datePickerRef.current.clear();
    };

    return (
        <BaseDoctorCon  >
            <NavTitleSection>
                {
                    title ? <div className="section1">
                            <TitleSpan>{title}</TitleSpan>
                        </div>
                        :
                        <div className="section1">
                            <TitleSpan>{translate("База_врачей")}</TitleSpan>
                            <InformationTitleSpan>
                                {translate("Всего")} {information.all} вр
                            </InformationTitleSpan>
                            <Line/>
                            <InformationTitleSpan>
                                {translate("По_факту")} {information.fact} вр
                            </InformationTitleSpan>
                            <Line/>
                            <InformationTitleSpan>
                                {translate("Новых")} {information.new} вр
                            </InformationTitleSpan>
                        </div>
                }
                <div className="section1">
                    {
                        !FilterHide ?
                            <Button
                                onClick={clearFilters}
                            >
                                {translate("Очистить фильтр")}
                            </Button>
                            : ""
                    }
                    <Button
                        onClick={() => nav("../create-doctor")}
                        icon={<IconPlus/>}
                    >
                        {translate("Добавить_врача")}
                    </Button>
                </div>
            </NavTitleSection>
            {
                !FilterHide ?
                    <div className="cards">
                        <Input
                            ref={nameSurnameRef}
                            onChange={setNameSurname}
                            placeholder={translate("Fullname")}
                        />

                        <PrimarySelect
                            ref={viloyatRef}
                            def={translate("область")}
                            options={regionsTranslate}
                            onValueChange={(value) => setSelectedViloyat(value.id)}
                            onlyOption={1}
                        />

                        <PrimarySelect
                            ref={tumanRef}
                            def={translate("Район")}
                            options={districtsTranslate}
                            onValueChange={(value) => setSelectedTuman(value.districtId)}
                            onlyOption={1}
                        />

                        <PrimarySelect
                            ref={specializationRef}
                            def="Специальность"
                            options={specializations}
                            onValueChange={(value) => setSelectedSpecialization(value.label)}
                            onlyOption={1}
                        />

                        <PrimarySelect
                            ref={mestaRabotRef}
                            def={translate("Препарат")}
                            options={MestaRabot[selectedTuman] || []}
                            onValueChange={setSelectedMestaRabot}
                        />

                        <DateRangePicker ref={datePickerRef} onDateChange={handleDateChange}/>

                        <PrimarySelect
                            def={translate("Все")}
                            options={[]}
                            onValueChange={(v) => {
                            }}
                        />
                    </div>
                    : ""
            }

            <Table
                title="Врачи"
                isLoading={isLoadingDoctors}
                data={filteredDoctors}
            />
        </BaseDoctorCon>
    );
};

export default BaseDoctor;

{/*<PrimarySelect*/}
{/*    def={translate("Категория")}*/}
{/*    options={MestaRabot[selectedTuman] || []}*/}
{/*    onValueChange={setSelectedMestaRabot}*/}
{/*/>*/}