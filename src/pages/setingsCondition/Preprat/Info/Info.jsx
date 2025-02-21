import React, { useState } from "react";
import { Container, FilterSection, Figcaption, Details } from "./style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";
import DateRangePicker from "./DataRangePicker/DataRangePicker.jsx";
import { useLanguage } from "../../../../context/LanguageContext.jsx";

const Info = () => {
  const { translate } = useLanguage();

  const [dataInvestitsiya, setDataInvestitsiya] = useState([
    { id: 1, title: "<60%", subTitle: "10,0%" },
    { id: 2, title: "60% - 69,9%", subTitle: "10,5%" },
    { id: 3, title: "70% - 79,9%", subTitle: "11,0%" },
    { id: 4, title: "80% - 89,9%", subTitle: "11,5%" },
    { id: 5, title: "90 >", subTitle: "12%" },
  ]);

  const [dataUsloviya, setDataUsloviya] = useState([
    { id: 1, title: "%СУ", subTitle: "30%" },
    { id: 2, title: "%СБ", subTitle: "20%" },
    { id: 3, title: "%ГЗ", subTitle: "40%" },
    { id: 4, title: "%КВ", subTitle: "30%" },
  ]);

  const [editing, setEditing] = useState({ id: null, type: "", newValue: "" });

  const handleEdit = (id, currentVal, type) => {
    setEditing({ id, type, newValue: currentVal });
  };

  const handleSave = () => {
    if (editing.type === "investitsiya") {
      setDataInvestitsiya((prev) =>
          prev.map((item) =>
              item.id === editing.id ? { ...item, subTitle: editing.newValue } : item
          )
      );
    } else if (editing.type === "usloviya") {
      setDataUsloviya((prev) =>
          prev.map((item) =>
              item.id === editing.id ? { ...item, subTitle: editing.newValue } : item
          )
      );
    }
    setEditing({ id: null, type: "", newValue: "" }); // Tahrirlashni tugatish
  };

  return (
      <Container>
        <FilterSection>
          <Details>
            <Figcaption>
              <div>{translate("Доступный % инвестиций")}</div>
            </Figcaption>
            {dataInvestitsiya.map((v) => (
                <Figcaption key={v.id} onDoubleClick={() => handleEdit(v.id, v.subTitle, "investitsiya")}>
                  <div>{v.title}</div>
                  {editing.id === v.id ? (
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Input
                            value={editing.newValue}
                            onChange={(e) => setEditing({ ...editing, newValue: e.target.value })}
                            autoFocus
                        />
                        <div onClick={handleSave}>{translate("Сохранить")}</div>
                      </div>
                  ) : (
                      <div style={{ cursor: "pointer" }}>{v.subTitle}</div>
                  )}
                </Figcaption>
            ))}
          </Details>

          <Details>
            <Figcaption>
              <div>{translate("Условия")}</div>
            </Figcaption>
            {dataUsloviya.map((v) => (
                <Figcaption key={v.id} onDoubleClick={() => handleEdit(v.id, v.subTitle, "usloviya")}>
                  <div>{v.title}</div>
                  {editing.id === v.id ? (
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Input
                            value={editing.newValue}
                            onChange={(e) => setEditing({ ...editing, newValue: e.target.value })}
                            autoFocus
                        />
                        <div onClick={handleSave}>{translate("Сохранить")}</div>
                      </div>
                  ) : (
                      <div style={{ cursor: "pointer" }}>{v.subTitle}</div>
                  )}
                </Figcaption>
            ))}
          </Details>
        </FilterSection>

        <DateRangePicker title={translate("Срок сдачи отчета")} />
      </Container>
  );
};

export default Info;
