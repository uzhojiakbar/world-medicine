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

const ManagersGoal = () => {
  const [region, setRegion] = useState(null);
  const [specialist, setSpecialist] = useState({
    value: "",
    label: "",
  });

  const { data: Regions, isLoading } = useGetRegions();
  const { data: managers, isLoading: isLoadingManagers } = useGetManagers({
    regionId: region || null,
  });

  const { translate, language } = useLanguage();

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
    console.log("Boshlanish sanasi:", startDate);
    console.log("Tugash sanasi:", endDate);
  }, []);

  return (
    <Wrapper>
      {isLoading || isLoadingManagers ? (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
      <Title className="titlee">
        <div>Настройка условий</div>
      </Title>

      <FormWrapper>
        <FormSectionWithGrid>
          <SectionOuter>
            <DirectionFlexGap>
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
              />
            </SectionInner>

            <DirectionFlexGap>
              <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
              <DateRangePicker
                onDateChange={handleDateChange}
                bgColor={"white"}
              />
            </DirectionFlexGap>
          </SectionOuter>
          <SectionOuter></SectionOuter>
        </FormSectionWithGrid>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManagersGoal;
