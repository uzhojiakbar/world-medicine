import React, { useState, useEffect } from "react";
import { Container, FilterSection, Figcaption, Details } from "./style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";
import DateRangePicker from "./DataRangePicker/DataRangePicker.jsx";
import { useLanguage } from "../../../../context/LanguageContext.jsx";
import { Button } from "antd";

const LOCAL_STORAGE_KEY_INVEST = "investitsiyaData";
const LOCAL_STORAGE_KEY_USLOVIYA = "usloviyaData";

const EditableInfo = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  return (
      <Figcaption onDoubleClick={() => setIsEditing(true)}>
        <div>{label}</div>
        {isEditing ? (
            <div style={{ display: "flex", height: "40px", alignItems: "center", gap: "10px" }}>
              <Input
                  value={editValue}
                  onChange={(value) => setEditValue(value)}
                  height={"40px"}
                  autoFocus
                  bgColor={"white"}
              />
              <Button type={"primary"} onClick={handleSave}>✔</Button>
            </div>
        ) : (
            <div style={{ cursor: "pointer", height: "40px" }}>{value}%</div>
        )}
      </Figcaption>
  );
};

const Info = () => {
  const { translate } = useLanguage();

  const [dataInvestitsiya, setDataInvestitsiya] = useState([]);
  const [dataUsloviya, setDataUsloviya] = useState([]);

  useEffect(() => {
    const savedInvestitsiya = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_INVEST));
    const savedUsloviya = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USLOVIYA));

    if (savedInvestitsiya) setDataInvestitsiya(savedInvestitsiya);
    else {
      setDataInvestitsiya([
        { id: 1, minPercentage: 0, maxPercentage: 60, percentageVal: 10 },
        { id: 2, minPercentage: 60, maxPercentage: 69.9, percentageVal: 10.5 },
        { id: 3, minPercentage: 70, maxPercentage: 79.9, percentageVal: 11 },
        { id: 4, minPercentage: 80, maxPercentage: 89.9, percentageVal: 11.5 },
        { id: 5, minPercentage: 90, maxPercentage: null, percentageVal: 12 },
      ]);
    }

    if (savedUsloviya) setDataUsloviya(savedUsloviya);
    else {
      setDataUsloviya([
        { id: 1, title: "СУ", value: 30 },
        { id: 2, title: "СБ", value: 20 },
        { id: 3, title: "ГЗ", value: 40 },
        { id: 4, title: "КВ", value: 30 },
      ]);
    }
  }, []);

  const updateInvestitsiya = (id, newValue) => {
    setDataInvestitsiya((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, percentageVal: parseFloat(newValue) || 0 } : item
        )
    );
    saveToLocal();
  };

  const updateUsloviya = (id, newValue) => {
    setDataUsloviya((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, value: parseFloat(newValue) || 0 } : item
        )
    );
    saveToLocal();
  };

  const saveToLocal = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_INVEST, JSON.stringify(dataInvestitsiya));
    localStorage.setItem(LOCAL_STORAGE_KEY_USLOVIYA, JSON.stringify(dataUsloviya));
  };

  return (
      <Container>
        <FilterSection>
          <Details>
            <Figcaption>
              <div>{translate("Доступный % инвестиций")}</div>
            </Figcaption>
            {dataInvestitsiya.map((v) => (
                <EditableInfo
                    key={v.id}
                    label={`${v.minPercentage} - ${v.maxPercentage ? v.maxPercentage : '>'}`}
                    value={v.percentageVal}
                    onSave={(newValue) => updateInvestitsiya(v.id, newValue)}
                />
            ))}
          </Details>

          <Details>
            <Figcaption>
              <div>{translate("Условия")}</div>
            </Figcaption>
            {dataUsloviya.map((v) => (
                <EditableInfo
                    key={v.id}
                    label={v.title}
                    value={v.value}
                    onSave={(newValue) => updateUsloviya(v.id, newValue)}
                />
            ))}
          </Details>
        </FilterSection>

        <DateRangePicker title={translate("Срок сдачи отчета")} />
      </Container>
  );
};

export default Info;
