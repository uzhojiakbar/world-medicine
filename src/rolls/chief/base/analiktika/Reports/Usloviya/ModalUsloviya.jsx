import React, { useState } from "react";
import {
  ModalBody,
  ModalContainer,
  ModalInnerSection,
} from "../../../../root/Modal";
import { MiniTitleSmall, TitleSmall } from "../../../../root/style";

import { useLanguage } from "../../../../context/LanguageContext";

import styled from "styled-components";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { Viloyatlar } from "../../../../mock/data";
import Input2 from "../../../../components/Generic/Input/Input2";
import MiniTable from "./TableMini";
const dataRet = {};

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;
  border-radius: 10px;
  background-color: #f7f8fc;
  width: 100%;
`;

const ModalFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > .closeIcon {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const ModalSelectWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ModalDefinition = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f7f8fc;
  width: 100%;
  padding: 17px 20px;
  border-radius: 10px;
`;

const ModalDefinitionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  > .closeIcon {
    height: 48px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const ModalUsloviyaPrescription = ({ id = 454, setId = () => {} }) => {
  const [formData, setFormData] = useState({
    Район: "",
    ЛПУ: "",
    fullName: "",
    Специальность: "",
    Выписано: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    let name,
      value = "";
    if (!Array.isArray(e)) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = e[0];
      value = e[1];
    }
    console.log(name, e, "kjkasjklajslkj");

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // formData ichidagi qiymatni yangilash
    }));
  };
  const handleSave = (value) => {
    console.log("Saved value:", value);
  };

  const user = dataRet;

  const { translate } = useLanguage();

  const data = [
    {
      id: 1,
      fullName: "Смирнова Анна Ивановна",
      Район: "Шайхантохур",
      ЛПУ: "Medion Clinic.",
      Специальность: "Терапевт",
      Телефон: "97 727 0131",
      Выписано: "40",
      Коррекция: "20",
      Процент: "50%",
    },
    {
      id: 2,
      fullName: "Морозова Ольга Павловна",
      Район: "Шайхантохур",
      ЛПУ: "Medion Clinic.",
      Специальность: "Терапевт",
      Телефон: "97 727 0131",
      Выписано: "40",
      Коррекция: "20",
      Процент: "50%",
    },
    {
      id: 3,
      fullName: "Белова Мария Дмитриевна",
      Район: "Шайхантохур",
      ЛПУ: "Medion Clinic.",
      Специальность: "Терапевт",
      Телефон: "97 727 0131",
      Выписано: "40",
      Коррекция: "20",
      Процент: "50%",
    },
  ];

  return (
    <ModalContainer
      w={"50vw"}
      title={
        <ModalHeader>
          <ModalFilterHeader>
            <TitleSmall>{translate("Поиск выписок по фильтрам")}</TitleSmall>
            <div onClick={() => setId(false)} className="closeIcon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                  stroke="#808080"
                  strokeWidth="2"
                />
                <path
                  d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                  fill="#808080"
                />
              </svg>
            </div>
          </ModalFilterHeader>
          <ModalSelectWrapper>
            <Input2
              type={"text"}
              placeholder={translate("Ф.И.О")}
              onChange={handleChange}
              name="fullName"
              bgColor={"white"}
            />

            <PrimarySelect
              def={translate("Район")}
              bgColor={"white"}
              options={Viloyatlar}
              onValueChange={(e) => handleChange(["Район", e])}
            />

            <PrimarySelect
              def={translate("ЛПУ")}
              bgColor={"white"}
              options={Viloyatlar}
              onValueChange={(e) => handleChange(["ЛПУ", e])}
            />

            <PrimarySelect
              def={translate("Специальность")}
              bgColor={"white"}
              options={Viloyatlar}
              onValueChange={(e) => {
                console.log(e, "hhhhhhhhhhhhh");

                handleChange(["Специальность", e]);
              }}
            />

            <PrimarySelect
              def={translate("Выписано")}
              bgColor={"white"}
              options={Viloyatlar}
              onValueChange={(e) => handleChange(["Выписано", e])}
            />
          </ModalSelectWrapper>
        </ModalHeader>
      }
      open={id}
      onOk={() => setId(false)}
      onCancel={() => setId(false)}
      footer={[]}
      centered
    >
      <ModalBody>
        <ModalInnerSection>
          <ModalDefinitionWrapper>
            <ModalDefinition>
              <MiniTitleSmall>{translate("Дозволено")}</MiniTitleSmall>
              <MiniTitleSmall>900</MiniTitleSmall>
            </ModalDefinition>
            <ModalDefinition>
              <MiniTitleSmall>{translate("Дозволено")}</MiniTitleSmall>
              <MiniTitleSmall>900</MiniTitleSmall>
            </ModalDefinition>
            <div className="closeIcon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                  stroke="#808080"
                  strokeWidth="2"
                />
                <path
                  d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                  fill="#808080"
                />
              </svg>
            </div>
          </ModalDefinitionWrapper>
        </ModalInnerSection>

        <MiniTable data={data || []} filterData={formData} />
      </ModalBody>
    </ModalContainer>
  );
};

export default ModalUsloviyaPrescription;
