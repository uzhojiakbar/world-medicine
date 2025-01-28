import React, { useState } from "react";
import {
  PageContainer,
  FormSection,
  InputWrapper,
  InputGroup,
  InnerContainerGrid,
} from "../style";
import PrimarySelect from "../../../components/Generic/Select/Select";
import Input from "../../../components/Generic/Input/Input";
import DateRangePicker from "../../../components/Generic/DataRangePicker/DataRangePicker";
import Button from "../../../components/Generic/Button/Button";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../mock/data";
import { Title } from "../../../root/style";
import Icon from "../../../components/Generic/Icon/Icon";
import UserGroup from "../../../assets/svg/UsersGroup";
import GenericCalendar from "../../../components/Generic/GenericCalendar/GenericCalendar";

const AdminCreateContract = () => {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [date, setDate] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    birthYear: "",
    contact: "",
  });
  const [contractDetails, setContractDetails] = useState({
    drug: "",
    description: "",
    amount: "",
    kpi: { amount: "", quantity: "", total: "" },
    dateRange: "",
  });

  const handleRegionChange = (value) => {
    setRegion(value);
    setDistrict("");
    setWorkplace("");
  };

  const handleDistrictChange = (value) => {
    setDistrict(value);
    setWorkplace("");
  };

  const handleWorkplaceChange = (value) => {
    setWorkplace(value);
  };

  const handlePatientInfoChange = (field, value) => {
    setPatientInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleContractDetailsChange = (field, value) => {
    setContractDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const contractData = {
      region,
      district,
      workplace,
      date,
      patientInfo,
      contractDetails,
    };

    // try {
    //   const response = await fetch("/api/contracts", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(contractData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Создание договора не удалось!");
    //   }

    //   console.log("Договор успешно создан!");
    // } catch (error) {
    //   console.error(error.message);
    // }
  };

  return (
    <PageContainer>
      <Title>Создание договора</Title>

      <InnerContainerGrid>
        <FormSection>
          {/* Левая сторона */}
          <InputGroup>
            <InputWrapper>
              <label>Кому</label>
              <div className="withIcon">
                <Icon icon={<UserGroup />} />
                <PrimarySelect
                  borderRadius="57px"
                  def={"Ф.И.О. врача"}
                  options={[{ value: "Доктор 1" }, { value: "Доктор 2" }]}
                />
              </div>
            </InputWrapper>
            <InputWrapper>
              <label>Регион</label>
              <div className="region">
                <PrimarySelect
                  def={"Город"}
                  options={Viloyatlar}
                  onValueChange={handleRegionChange}
                />
                <PrimarySelect
                  def={"Район"}
                  options={Tumanlar[region] || []}
                  onValueChange={handleDistrictChange}
                />
                <PrimarySelect
                  def={"Место работы"}
                  options={MestaRabot[district] || []}
                  onValueChange={handleWorkplaceChange}
                />

                <GenericCalendar onChange={setDate} />
              </div>
            </InputWrapper>
            <InputWrapper>
              <label>Ф.И.О. и год рождения пациента</label>
              <Input
                placeholder="Тимур Шамшетдинов"
                onChange={(e) => handlePatientInfoChange("name", e)}
              />
              <Input
                placeholder="2003"
                onChange={(e) => handlePatientInfoChange("birthYear", e)}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Контактные данные пациента</label>
              <Input
                placeholder="+998 90 777 90 90"
                onChange={(e) => handlePatientInfoChange("contact", e)}
              />
            </InputWrapper>
          </InputGroup>
        </FormSection>

        <FormSection>
          <InputGroup>
            <InputWrapper>
              <label>Препарат</label>
              <PrimarySelect
                def={"Препарат"}
                options={[
                  { value: "Препарат 1" },
                  { value: "Препарат 2" },
                  { value: "Препарат 3" },
                ]}
                onValueChange={(value) =>
                  handleContractDetailsChange("drug", value)
                }
              />
            </InputWrapper>
            <InputWrapper>
              <label>Описание задачи</label>
              <Input
                placeholder="Описание договора..."
                onChange={(e) => handleContractDetailsChange("description", e)}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Сроки выполнения</label>
              <DateRangePicker
                onChange={(value) =>
                  handleContractDetailsChange("dateRange", value)
                }
              />
            </InputWrapper>
            <InputWrapper>
              <label>На сумму</label>
              <Input
                placeholder="240 тыс. сум"
                onChange={(e) => handleContractDetailsChange("amount", e)}
              />
            </InputWrapper>
          </InputGroup>
          <InputGroup>
            <label>KPI</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <Input
                placeholder="2 тыс. сум"
                onChange={(e) =>
                  handleContractDetailsChange("kpi", {
                    ...contractDetails.kpi,
                    amount: e,
                  })
                }
              />
              <Input
                placeholder="120 шт."
                onChange={(e) =>
                  handleContractDetailsChange("kpi", {
                    ...contractDetails.kpi,
                    quantity: e,
                  })
                }
              />
              <Input
                placeholder="240 тыс. сум"
                onChange={(e) =>
                  handleContractDetailsChange("kpi", {
                    ...contractDetails.kpi,
                    total: e,
                  })
                }
              />
            </div>
          </InputGroup>
          <Button onClick={handleSubmit}>Создать</Button>
        </FormSection>
      </InnerContainerGrid>
    </PageContainer>
  );
};

export default AdminCreateContract;
