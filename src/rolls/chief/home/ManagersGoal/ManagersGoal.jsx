import React, { useState } from "react";
import { FormSectionWithGrid, FormWrapper, Wrapper } from "./style";
import { MiniTitleSmall, Title } from "../../../../root/style";
import PrimarySelect from "../../../../components/Generic/Select/Select";

const ManagersGoal = () => {
  const [region, setRegion] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [medicine, setMedicine] = useState("");
  const [district, setDistrict] = useState("");

  return (
    <Wrapper>
      <Title className="titlee">
        <div>Настройка условий</div>
      </Title>

      <FormWrapper>
        <FormSectionWithGrid>
          {/* Region Select */}
          <div>
            <MiniTitleSmall>Регион</MiniTitleSmall>
            <PrimarySelect
              def="Выберите регион"
              options={[
                { value: "Ташкент" },
                { value: "Самарканд" },
                { value: "Бухара" },
              ]}
              onValueChange={(selected) => setRegion(selected.value)}
            />
          </div>
        </FormSectionWithGrid>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManagersGoal;
