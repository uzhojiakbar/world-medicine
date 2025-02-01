import React, { useState } from "react";
import {
  DirectionFlexGap,
  FormSectionWithGrid,
  FormWrapper,
  IconWrapper,
  SectionInner,
  Wrapper,
} from "./style";
import { MiniTitleSmall, Title } from "../../../../root/style";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { useGetRegions } from "../../../../utils/server/server";
import { transformRegionsForSelect } from "../../../../utils/transformRegionsForSelect";
import { useLanguage } from "../../../../context/LanguageContext";
import EditableInput from "../../../../components/Generic/EditableInput/EditableInput";
import { ModalUserProfilePicture } from "../../../../root/Modal";
import Man from "../../../../assets/svg/Man";
import EditableSelect from "../../../../components/Generic/EditableSelect/EditableSelect";

const ManagersGoal = () => {
  const [region, setRegion] = useState("");
  const [specialist, setSpecialist] = useState("");
  const { data: Regions, isLoading } = useGetRegions();

  const { translate, language } = useLanguage();
  const regionsTranslate = transformRegionsForSelect(Regions, language);

  const handleChangeRegion = (e) => {
    setRegion(e.id);
    console.log(region);
  };

  return (
    <Wrapper>
      <Title className="titlee">
        <div>Настройка условий</div>
      </Title>

      <FormWrapper>
        <FormSectionWithGrid>
          <div>
            <DirectionFlexGap>
              <MiniTitleSmall>Регион</MiniTitleSmall>
              <PrimarySelect
                def={translate("Выберите_регион")}
                options={regionsTranslate}
                onValueChange={(e) => handleChangeRegion(e)}
                onlyOption={1}
              />
            </DirectionFlexGap>

            <SectionInner>
              <IconWrapper>
                <Man />
              </IconWrapper>

              {/* Editable Select for Specialists */}
              <EditableSelect
                options={[
                  { value: "Гинеколог", label: "Гинеколог" },
                  { value: "Травматолог", label: "Травматолог" },
                  { value: "Кардиолог", label: "Кардиолог" },
                ]}
                initialValue={specialist}
                placeholder="Выберите специальность"
                onSave={(value) => setSpecialist(value)}
                isEditable={false}
                def={translate("Ф.И.О. менеджера")}
              />

              {/* Editable Input */}
              {/* <EditableInput initialValue={"Введите значение"} isInput={1} /> */}
            </SectionInner>
          </div>
        </FormSectionWithGrid>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManagersGoal;
