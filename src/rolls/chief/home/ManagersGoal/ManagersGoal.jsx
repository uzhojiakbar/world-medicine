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
import FieldnamesManager from "../../../../utils/fieldnamesManager";

const ManagersGoal = () => {
  const [region, setRegion] = useState(null);
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [specialist, setSpecialist] = useState({});
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const { translate } = useLanguage();

  console.log("selectedSpecializations", selectedSpecializations);

  const { data: Regions, isLoading: isLoadingRegions } = useGetRegions();
  const { data: managers, isLoading: isLoadingManagers } = useGetManagers({
    regionId: region || null,
  });

  const regionsTranslate = useMemo(
    () => transformRegionsForSelect(Regions, translate),
    [Regions, translate]
  );
  const managerOptions = useMemo(
    () =>
      managers?.map((manager) => ({
        value: manager.userId,
        label: `${manager.firstName} ${manager.lastName}`,
        id: manager.userId,
      })) || [],
    [managers]
  );

  const handleChangeRegion = useCallback((selected) => {
    setRegion(selected.value);
    setSpecialist({});
  }, []);

  const handleDateChange = useCallback((dates) => setDate(dates), []);

  const handleSpecializationSelect = useCallback(
    (selected) => {
      const newEntry = {
        id: selected.id,
        fieldName: selected.label,
        quote: 0,
        managerGoalId: 0,
      };
      if (
        !selectedSpecializations.find((s) => s.fieldName === selected.label)
      ) {
        setSelectedSpecializations((prev) => [...prev, newEntry]);
      }
    },
    [selectedSpecializations]
  );

  const availableSpecializations = useMemo(
    () =>
      FieldnamesManager().filter(
        (spec) =>
          !selectedSpecializations.some((s) => s.fieldName === spec.label)
      ),
    [selectedSpecializations]
  );

  return (
    <Wrapper>
      {isLoadingRegions || isLoadingManagers ? (
        <div className="loading">Loading...</div>
      ) : null}
      <Title>{translate("Цель_менеджеру")}</Title>
      <FormWrapper>
        <FormSectionWithGrid>
          <SectionOuter>
            <DirectionFlexGap>
              <MiniTitleSmall>{translate("Регион")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите_регион")}
                options={regionsTranslate}
                onValueChange={handleChangeRegion}
                onlyOption
              />
            </DirectionFlexGap>
            <SectionInner>
              <IconWrapper>
                <Man />
              </IconWrapper>
              <EditableSelect
                options={managerOptions}
                initialValue={specialist}
                placeholder={translate("Выберите_менеджера")}
                onValueChange={setSpecialist}
                def={specialist.label || translate("Выберите_менеджера")}
                disabled={!region}
              />
            </SectionInner>
            <DirectionFlexGap>
              <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
              <DateRangePicker onDateChange={handleDateChange} />
            </DirectionFlexGap>
          </SectionOuter>
          <SectionOuter>
            <DirectionFlexGap>
              <MiniTitleSmall>{translate("Охват_врачей")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите специальность")}
                options={availableSpecializations}
                onValueChange={handleSpecializationSelect}
                onlyOption
              />
            </DirectionFlexGap>
          </SectionOuter>
        </FormSectionWithGrid>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManagersGoal;
