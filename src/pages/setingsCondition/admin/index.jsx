import React, { useState } from "react";
import { SettingsContainer, SettingsCards, ResponsiveTable } from "./style";
import { Title, TitleSmall } from "../../../root/style";
import PrimarySelect from "../../../components/Generic/Select/Select";
import Input from "../../../components/Generic/Input/Input";
import DateRangePicker from "../../../components/Generic/DataRangePicker/DataRangePicker";
import Button from "../../../components/Generic/Button/Button";
import IconPlus from "../../../assets/svg/IconPlus";
import { Viloyatlar, Tumanlar, MestaRabot } from "../../../mock/data";
import { contractData } from "../../../mock/contractData";
import Edit from "../../../assets/svg/Edit";
import Pauza from "../../../assets/svg/Pauza";

const SettingsConditionAdmin = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWorkPlace, setSelectedWorkPlace] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [filteredData, setFilteredData] = useState(contractData);

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

  const handleFilter = () => {
    // Filtrlash
    const filtered = contractData.filter((row) => {
      return (
        (selectedRegion === "" || row.region === selectedRegion) && // Region bo'yicha
        (selectedDistrict === "" || row.district === selectedDistrict) && // Tuman bo'yicha
        (selectedWorkPlace === "" ||
          row.workplace.includes(selectedWorkPlace)) && // Ish joyi bo'yicha
        (nameSurname === "" ||
          row.name.toLowerCase().includes(nameSurname.toLowerCase())) // Ism bo'yicha
      );
    });
    setFilteredData(filtered); // Filtrlangan ma'lumotlarni saqlash
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
            <Input onChange={setNameSurname} placeholder={"Ф.И.О."} />
            <DateRangePicker />
            <Button onClick={handleFilter}>Применить фильтр</Button>{" "}
            {/* Filtrni qo'llash tugmasi */}
          </SettingsCards.Filter>
        </SettingsCards>

        {/* Responsive Table */}
        <SettingsCards>
          <ResponsiveTable>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th className="idfixed">Ф.И.О.</th>
                  <th>Место работы</th>
                  <th>Дата создания</th>
                  <th>Статус</th>
                  <th>Выполнено (KPI)</th>
                  <th>Редактировать</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td>№{row.id}</td>
                    <td className="idfixed">{row.name}</td>
                    <td>{row.workplace}</td>
                    <td>Создан {row.createdDate}</td>
                    <td>
                      <div className={`status ${row.statusClass}`}>
                        {row.status}
                      </div>
                    </td>
                    <td>{row.kpi}</td>
                    <td>
                      <button>
                        <Edit />
                      </button>
                      <button>
                        <Pauza />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
        </SettingsCards>
      </SettingsCards.Con>
    </SettingsContainer>
  );
};

export default SettingsConditionAdmin;
