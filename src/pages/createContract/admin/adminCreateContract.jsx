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
import { AnaliktikaCon } from "../../analiktika/style";
import { Title } from "../../../root/style";
import Icon from "../../../components/Generic/Icon/Icon";
import UserGroup from "../../../assets/svg/UsersGroup";
import GenericCalendar from "../../../components/Generic/GenericCalendar/GenericCalendar";

const AdminCreateContract = () => {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [date, setData] = useState("");

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

  const handleSubmit = () => {
    console.log("Создание договора отправлено!");
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

                <GenericCalendar onChange={setData} />
              </div>
            </InputWrapper>
            <InputWrapper>
              <label>Ф.И.О. и год рождения пациента</label>
              <Input placeholder="Тимур Шамшетдинов" />
              <Input placeholder="2003" />
            </InputWrapper>
            <InputWrapper>
              <label>Контактные данные пациента</label>
              <Input placeholder="+998 90 777 90 90" />
            </InputWrapper>
          </InputGroup>

          {/* Правая сторона */}
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
              />
            </InputWrapper>
            <InputWrapper>
              <label>Описание задачи</label>
              <Input placeholder="Описание договора..." />
            </InputWrapper>
            <InputWrapper>
              <label>Сроки выполнения</label>
              <DateRangePicker />
            </InputWrapper>
            <InputWrapper>
              <label>На сумму</label>
              <Input placeholder="240 тыс. сум" />
            </InputWrapper>
          </InputGroup>
          <InputGroup>
            <label>KPI</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <Input placeholder="2 тыс. сум" />
              <Input placeholder="120 шт." />
              <Input placeholder="240 тыс. сум" />
            </div>
          </InputGroup>
          <Button onClick={handleSubmit}>Создать</Button>
        </FormSection>
      </InnerContainerGrid>
    </PageContainer>
  );
};

export default AdminCreateContract;
