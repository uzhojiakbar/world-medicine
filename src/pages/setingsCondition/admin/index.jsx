import React, { useState } from "react";
import { Modal } from "antd"; // Ant Design Modal
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

  // Modal uchun state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

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
    const filtered = contractData.filter((row) => {
      return (
        (selectedRegion === "" || row.region === selectedRegion) &&
        (selectedDistrict === "" || row.district === selectedDistrict) &&
        (selectedWorkPlace === "" ||
          row.workplace.includes(selectedWorkPlace)) &&
        (nameSurname === "" ||
          row.name.toLowerCase().includes(nameSurname.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  };

  const handleEdit = (row) => {
    setCurrentRow(row);
    setIsEditOpen(true); // Modalni ochish
  };

  const handleSave = () => {
    setFilteredData((prevData) =>
      prevData.map((row) =>
        row.id === currentRow.id ? { ...row, ...currentRow } : row
      )
    );
    setIsEditOpen(false); // Modalni yopish
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
            <Button MobilehiddenText={1} onClick={handleFilter}>
              Применить фильтр
            </Button>
          </SettingsCards.Filter>
        </SettingsCards>

        {/* Responsive Table */}
        <SettingsCards>
          <TitleSmall>Список договоров</TitleSmall>
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
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
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
                      <td className="buttons">
                        <button onClick={() => handleEdit(row)}>
                          <Edit />
                        </button>
                        <button>
                          <Pauza />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Нет данных для отображения
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </ResponsiveTable>
        </SettingsCards>
      </SettingsCards.Con>

      {/* Edit Modal */}
      {isEditOpen && (
        <Modal
          title="Редактировать договор"
          visible={isEditOpen}
          onOk={handleSave}
          onCancel={() => setIsEditOpen(false)}
        >
          <div>
            <Input
              value={currentRow?.name}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, name: e.target.value })
              }
              placeholder="Ф.И.О."
            />
            <DateRangePicker
              value={currentRow?.createdDate}
              onChange={(date) =>
                setCurrentRow({ ...currentRow, createdDate: date })
              }
            />
            <PrimarySelect
              def={currentRow?.status}
              options={[
                { value: "Выписан", label: "Выписан" },
                { value: "На модерации", label: "На модерации" },
                { value: "Отказано", label: "Отказано" },
              ]}
              onValueChange={(value) =>
                setCurrentRow({ ...currentRow, status: value })
              }
            />
            <Input
              value={currentRow?.kpi}
              onChange={(e) =>
                setCurrentRow({ ...currentRow, kpi: e.target.value })
              }
              placeholder="KPI"
            />
          </div>
        </Modal>
      )}
    </SettingsContainer>
  );
};

export default SettingsConditionAdmin;
