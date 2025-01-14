import React, { useState } from "react";
import {
  FormWrapper,
  IconSection,
  IconWrapper,
  InputWraper,
  Section,
  SubTitle,
  Wrapper,
} from "./style.js";
import IconPlus from "../../assets/svg/IconPlus";
import Man from "../../assets/svg/Man.jsx";
import Input2 from "../../components/Generic/Input/Input2";
import PrimarySelect from "../../components/Generic/Select/Select";
import Restart from "../../assets/svg/restart";
import Copy from "../../assets/svg/copy";
import { Tumanlar, Viloyatlar } from "../../mock/data";
import { MiniTitleSmall, Title } from "../../root/style.js";
import Button from "../../components/Generic/Button/Button.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../../assets/svg/Eye.jsx";
import ForSee from "../../assets/svg/see.jsx";

const AddMeneger = () => {
  const { translate } = useLanguage();

  const [showPassword, setShowPassword] = useState(false);

  const formDataLabels = {
    title: translate("Добавить_менеджера"),
    download: "Загрузить базу менеджеров",
    komu: "Кому",
    fullName: translate("Fullname"),
    фамилия: translate("фамилия"),
    имя: translate("имя"),
    Отчество: translate("Отчество"),
    region: "Регион",
    city: "Город",
    district: "Район",
    contactData: "Контактные данные менеджера",
    workplace: "Место работы",
    email: "Почта",
    phone: "Телефон",
    temporaryPassword: "Временный пароль",
    isAdmin: "Добавить администратора",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    region: "",
    city: "",
    district: "",
    contactData: "",
    workplace: "",
    email: "",
    phone: "",
    temporaryPassword: "",
    isAdmin: false,
  });
  const [tuman, setTuman] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target; // Inputning 'name' va 'value' qiymatlarini olish
    setFormData({
      ...formData,
      [name]: value, // 'name'ga qarab formData yangilanadi
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelectChange = (value) => {
    setTuman(Tumanlar[value]);
    setFormData({
      ...formData,
      region: value, // regionni yangilash uchun qiymatni saqlash
    });
  };

  const nav = useNavigate();

  return (
    <Wrapper>
      <Title className="titlee">
        <div>{formDataLabels.title}</div>
        <Button onClick={() => nav("../")} icon={<IconPlus />}>
          {translate("Загрузить_базу_менеджеров")}
        </Button>
      </Title>
      <FormWrapper onSubmit={handleSubmit}>
        <MiniTitleSmall>{formDataLabels.komu}</MiniTitleSmall>

        <Section now={"true"}>
          <IconWrapper>
            <Man />{" "}
          </IconWrapper>
          <Input2
            type="text"
            name="fullName" // name qiymati state kalitiga mos bo‘lishi kerak
            value={formData.fullName}
            onChange={handleChange}
            placeholder={formDataLabels.фамилия}
          />
          <Input2
            type="text"
            name="fullName" // name qiymati state kalitiga mos bo‘lishi kerak
            value={formData.fullName}
            onChange={handleChange}
            placeholder={formDataLabels.имя}
          />
          <Input2
            type="text"
            name="fullName" // name qiymati state kalitiga mos bo‘lishi kerak
            value={formData.fullName}
            onChange={handleChange}
            placeholder={formDataLabels.Отчество}
          />
        </Section>

        <MiniTitleSmall>{formDataLabels.region}</MiniTitleSmall>
        <Section>
          <PrimarySelect
            def={formDataLabels.city}
            options={Viloyatlar}
            onValueChange={handleSelectChange}
          />
          <PrimarySelect
            def={formDataLabels.district}
            options={tuman}
            onValueChange={handleSelectChange}
          />
        </Section>

        <MiniTitleSmall>{formDataLabels.contactData}</MiniTitleSmall>
        <Section>
          <Input2
            type="text"
            name="region" // 'region' nomini ishlating
            value={formData.region}
            onChange={handleChange}
            placeholder={formDataLabels.email}
          />
          <Input2
            type="number"
            name="phone"
            placeholder={"+998 "}
            onChange={handleChange}
          />
        </Section>
        <MiniTitleSmall>{formDataLabels.temporaryPassword}</MiniTitleSmall>
        <Section>
          <InputWraper>
            <Input2
              type={showPassword ? "text" : "password"}
              name="temporaryPassword"
              value={formData.temporaryPassword}
              onChange={handleChange}
              placeholder={formDataLabels.temporaryPassword}
            />
            <IconSection>
              <Restart onClick={() => {}} />
              <ForSee
                color={"#216BF4"}
                onClick={() => setShowPassword(!showPassword)}
              />
              <Copy
                onClick={() => {
                  const password = formData.temporaryPassword;
                  navigator.clipboard.writeText(password);
                }}
              />
            </IconSection>
          </InputWraper>
        </Section>
        <Button onClick={() => nav("/upravleniya-sistemoy")}>
          {formDataLabels.isAdmin}
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default AddMeneger;
