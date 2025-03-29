import React, {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Checkbox} from "antd";
import {MainWrapperGap, Title, TitleSmall} from "../../../../root/style.js";
import Button from "../../../../components/Generic/Button/Button.jsx";
import IconPlus from "../../../../assets/svg/IconPlus.jsx";
import Input from "../../../../components/Generic/Input/Input.jsx";
import PrimarySelect from "../../../../components/Generic/Select/Select.jsx";
import Table from "./Table.jsx";
import {useLanguage} from "../../../../context/LanguageContext.jsx";
import {
    useGetAdmins,
    useGetDistricts,
    useGetProfileInfo,
    useGetRegions
} from "../../../../utils/server/server.js";
import {FilterCardsWrapper} from "../../../../pages/admin/settingSystemAdmin/style.js";
import {transformDistrictsForSelect, transformRegionsForSelect} from "../../../../utils/transformRegionsForSelect.js";
import {useQueryClient} from "@tanstack/react-query";

// const queryClient = useQueryClient();
// await queryClient.invalidateQueries(["getAdmins"]);

// GetMedAgents
// GetManagers
// getAdmins
// GetDoctorsFilter

const SettingsFieldForce = ({id}) => {
    const nav = useNavigate();
    const {translate, language} = useLanguage();

    const [selectedViloyat, setSelectedViloyat] = useState("");
    const [selectedTuman, setSelectedTuman] = useState("");
    const [nameSurname, setNameSurname] = useState("");
    const [checked, setChecked] = useState(false);

    const {data: profileInfo, isLoading: IsLoadingProfileInfo} =
        useGetProfileInfo();

    const {data: regions, isLoading: isLoadingRegions} = useGetRegions();
    const {data: districts, isLoading: isLoadingDistricts} =
        useGetDistricts(selectedViloyat);

    const {data: MedAgents, isLoading} = useGetAdmins({
        creatorId: checked ? profileInfo?.userId : null, // Agarda checkbox bosilgan bo'lsa, foydalanuvchi ID sini qo'shish
        countryId: null, // Agar kerak bo'lsa, qo'shish
        regionId: selectedViloyat || null,
        districtId: selectedTuman || null,
        nameQuery: nameSurname || null,
    });


    const regionsTranslate = useMemo(
        () => transformRegionsForSelect(regions, language),
        [regions, translate]
    );

    const districtsTranslate = useMemo(
        () => transformDistrictsForSelect(districts, language),
        [districts, translate]
    );

    return (
        <MainWrapperGap id={id || "administration"}>
            <Title>
                <span>{translate("field_force")}</span>
                <Button onClick={() => nav("../create-admin")} icon={<IconPlus/>}>
                    {translate("add_addmin")}
                </Button>
            </Title>

            <FilterCardsWrapper grid={4}>
                <TitleSmall>{translate("manager_filter")}</TitleSmall>
                <div className="cards">
                    <PrimarySelect
                        def={translate("область")}
                        options={regionsTranslate}
                        onValueChange={(value) => setSelectedViloyat(value.id)}
                        onlyOption={1}
                    />
                    <PrimarySelect
                        def={translate("Район")}
                        options={districtsTranslate}
                        onValueChange={(value) => setSelectedTuman(value.districtId)}
                        onlyOption={1}
                    />
                    <Input
                        onChange={setNameSurname}
                        placeholder={translate("Fullname_doctor")}
                    />
                    <Checkbox
                        onChange={(e) => setChecked(e.target.checked)}
                        checked={checked}
                    >
                        {translate("Назначен_мною")}
                    </Checkbox>
                </div>
            </FilterCardsWrapper>


            <Table data={MedAgents || []}
                   isLoading={isLoading || isLoadingRegions || isLoadingDistricts || IsLoadingProfileInfo}/>
        </MainWrapperGap>
    );
};

export default SettingsFieldForce;
