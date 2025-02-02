import React, { useState, useMemo, useCallback } from "react";
import {
  DirectionFlexGap,
  FormSectionWithGrid,
  FormWrapper,
  IconWrapper,
  SectionInner,
  SectionOuter,
  Wrapper,
} from "./style";
import { MiniTitleSmall, Title } from "../../../../root/style";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { useGetManagers, useGetRegions } from "../../../../utils/server/server";
import { transformRegionsForSelect } from "../../../../utils/transformRegionsForSelect";
import { useLanguage } from "../../../../context/LanguageContext";
import EditableSelect from "../../../../components/Generic/EditableSelect/EditableSelect";
import Man from "../../../../assets/svg/Man";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker";
import { message } from "antd";
import FieldnamesManager from "../../../../utils/fieldnamesManager";

const ManagersGoal = () => {
  const [region, setRegion] = useState(null);
  const [date, setData] = useState({ startDate: "", endDate: "" });
  const [specialist, setSpecialist] = useState({ value: "", label: "" });
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  console.log("selectedSpecializations", selectedSpecializations);

  const { translate, language } = useLanguage();
  const filendnames = FieldnamesManager();

  const { data: Regions, isLoading } = useGetRegions();
  const { data: managers, isLoading: isLoadingManager } = useGetManagers({
    regionId: region || null,
  });

  const regionsTranslate = useMemo(
    () => transformRegionsForSelect(Regions, language),
    [Regions, language]
  );

  const managerOptions = useMemo(
    () =>
      managers
        ? managers.map((manager) => ({
            value: manager.userId,
            label: `${manager.firstName} ${manager.lastName}`,
            id: manager.userId,
          }))
        : [],
    [managers]
  );

  const handleChangeRegion = useCallback(
    (e) => {
      setRegion(e.id);
      setSpecialist({ value: "", label: translate("Выберите менеджера") });
    },
    [translate]
  );

  const handleDateChange = useCallback(({ startDate, endDate }) => {
    setData({ ...data, startDate: startDate, endDate: endDate });
  }, []);

  // Tanlangan mutaxassislikni qo‘shish va selectdan olib tashlash
  const onSpecializationSelect = (selectedOption) => {
    setSelectedSpecializations((prev) => [...prev, selectedOption]);

    // Select uchun qolgan variantlarni qayta hosil qilish
    setSpecializations((prev) =>
      prev.filter((option) => option.value !== selectedOption.value)
    );
  };

  const availableSpecializations = useMemo(
    () =>
      filendnames.filter(
        (spec) =>
          !selectedSpecializations.some((sel) => sel.value === spec.value)
      ),
    [selectedSpecializations, filendnames]
  );

  return (
    <Wrapper>
      {isLoading || isLoadingManager ? (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      ) : null}
      <Title className="titlee">
        <div>Настройка условий</div>
      </Title>

      <FormWrapper>
        <FormSectionWithGrid>
          <SectionOuter>
            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Регион")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите_регион")}
                options={regionsTranslate}
                onValueChange={handleChangeRegion}
                onlyOption={1}
              />
            </DirectionFlexGap>

            <SectionInner mb={"20px"}>
              <IconWrapper>
                <Man />
              </IconWrapper>

              <EditableSelect
                options={managerOptions}
                initialValue={specialist}
                placeholder={translate("Выберите_менеджера")}
                onValueChange={setSpecialist}
                isEditable={false}
                def={specialist.label || translate("Выберите_менеджера")}
                disabled={!region}
                onClick={() =>
                  !region
                    ? message.error(translate("Сначала_выберите_регион"))
                    : ""
                }
              />
            </SectionInner>

            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
              <DateRangePicker onDateChange={handleDateChange} />
            </DirectionFlexGap>
          </SectionOuter>
          <SectionOuter>
            <DirectionFlexGap gap="10px">
              <MiniTitleSmall>{translate("Охват_врачей")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите специальность")}
                options={availableSpecializations}
                onValueChange={onSpecializationSelect}
                onlyOption={1}
              />
            </DirectionFlexGap>
          </SectionOuter>
        </FormSectionWithGrid>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManagersGoal;
