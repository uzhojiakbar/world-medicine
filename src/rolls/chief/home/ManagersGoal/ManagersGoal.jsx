import React, { useState } from "react";
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

const ManagersGoal = () => {
  const [region, setRegion] = useState(null);
  const [specialist, setSpecialist] = useState({
    value: "",
    label: "",
  });

  const { data: Regions, isLoading } = useGetRegions();
  const { translate, language } = useLanguage();
  const regionsTranslate = transformRegionsForSelect(Regions, language);

  const { data: managers } = useGetManagers({
    regionId: region || null,
  });

  const managerOptions = managers
    ? managers.map((manager) => ({
        value: manager.userId,
        label: `${manager.firstName} ${manager.lastName}`,
        id: manager.userId,
      }))
    : [];

  const handleChangeRegion = (e) => {
    setRegion(e.id);

    // Agar manager tanlangan bo‘lsa, default holatga qaytarish
    if (specialist?.value) {
      setSpecialist({ value: "", label: translate("Выберите менеджера") });
    }
  };

  return (
    <Wrapper>
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
                onValueChange={(e) => handleChangeRegion(e)}
                onlyOption={1}
              />
            </DirectionFlexGap>

            <SectionInner mb={"20px"}>
              <IconWrapper>
                <Man />
              </IconWrapper>

              {/* Editable Select for Managers */}
              <EditableSelect
                options={managerOptions}
                initialValue={specialist}
                placeholder={translate("Выберите менеджера")}
                onValueChange={(value) => setSpecialist(value)}
                isEditable={false}
                def={specialist.label || translate("Выберите менеджера")}
                disabled={!region}
              />
            </SectionInner>

            <DirectionFlexGap>
              <MiniTitleSmall>{translate("Период_выполнения")}</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите_регион")}
                options={regionsTranslate}
                onValueChange={(e) => handleChangeRegion(e)}
                onlyOption={1}
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
