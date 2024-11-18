import React, { useState } from "react";
import { SettingsContainer, SettingsCards, ResponsiveTable } from "./style";
import { Title, TitleSmall } from "../../../root/style";
import PrimarySelect from "../../../components/Generic/Select/Select";
import Input from "../../../components/Generic/Input/Input";
import DateRangePicker from "../../../components/Generic/DataRangePicker/DataRangePicker";
import Button from "../../../components/Generic/Button/Button";
import IconPlus from "../../../assets/svg/IconPlus";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../mock/data";

const SettingsConditionAdmin = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");
  const [nameSurname, setNameSurname] = useState("");

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setSelectedDistrict("");
    setSelectedWorkPlace("");
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWorkPlace("");
  };

  const handleWorkPlaceChange = (value) => {
    setSelectedWorkPlace(value);
  };

  return (
    <SettingsContainer>
      <Title>
        <span>Настройка условий</span>
        <Button icon={<IconPlus />}>Создать договор</Button>
      </Title>
      <SettingsCards.Con>
        {/* Filters */}
        <SettingsCards>
          <TitleSmall>Поиск договора по фильтрам</TitleSmall>
          <SettingsCards.Filter>
            <PrimarySelect
              def={"Выберите область"}
              options={Viloyatlar}
              onValueChange={handleRegionChange}
            />
            <PrimarySelect
              def={"Выберите район"}
              options={Tumanlar[selectedRegion] || []}
              onValueChange={handleDistrictChange}
            />
            <PrimarySelect
              def={"Место работы"}
              options={MestaRabot[selectedDistrict] || []}
              onValueChange={handleWorkPlaceChange}
            />
            <Input
              onChange={(e) => setNameSurname(e.target.value)}
              placeholder={"Ф.И.О."}
            />
            <DateRangePicker />
          </SettingsCards.Filter>
        </SettingsCards>

        {/* Responsive Table */}
        <SettingsCards>
          <ResponsiveTable>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Ф.И.О.</th>
                  <th>Место работы</th>
                  <th>Дата создания</th>
                  <th>Статус</th>
                  <th>Выполнено (KPI)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Иванов Дмитрий Евгеньевич</td>
                  <td>Ташкент, Городская больница</td>
                  <td>20.12.2024</td>
                  <td style={{ color: "green" }}>Активен</td>
                  <td>12%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Григорьев Алексей Иванов</td>
                  <td>Ташкент, Медицинский центр</td>
                  <td>21.12.2024</td>
                  <td style={{ color: "red" }}>Действителен</td>
                  <td>10%</td>
                </tr>
              </tbody>
            </table>
          </ResponsiveTable>
        </SettingsCards>
      </SettingsCards.Con>
    </SettingsContainer>
  );
};

export default SettingsConditionAdmin;
