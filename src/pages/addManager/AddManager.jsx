import React, { useState } from "react";
import {
  DataLayoutGrid,
  FormWrapper,
  IconSection,
  IconWrapper,
  InputWraper,
  Section,
  Wrapper,
} from "./style.js";
import IconPlus from "../../assets/svg/IconPlus";
import Man from "../../assets/svg/Man.jsx";
import Input2 from "../../components/Generic/Input/Input2";
import PrimarySelect from "../../components/Generic/Select/Select";
import Restart from "../../assets/svg/restart";
import Copy from "../../assets/svg/copy";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { useNavigate } from "react-router-dom";
import ForSee from "../../assets/svg/see.jsx";
import {
  useGetRegions,
  useRegisterManager,
} from "../../utils/server/server.js";
import { transformRegionsForSelect } from "../../utils/transformRegionsForSelect.js";
import { MiniTitleSmall, Title } from "../../root/style.js";
import Button from "../../components/Generic/Button/Button.jsx";
import { formatPhoneNumberForBackend } from "../../utils/phoneFormatterForBackend.js";
import GenericDatePicker from "../../components/Generic/GenericCalendar/GenericCalendar.jsx";
import { message } from "antd";

const AddMeneger = () => {
  const { translate, language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const { data: Regions, isLoading } = useGetRegions();
  const [loading, setLoading] = useState(false);
  const regionsTranslate = transformRegionsForSelect(Regions, language);

  const mutation = useRegisterManager();

  console.log(loading, "loadingloadingloadingloading");

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    firstName: "",
    middleName: "",
    region: "",
    district: "",
    contactData: "",
    workplace: "",
    email: "",
    mail: "",
    phone: "",
    temporaryPassword: "",
    isAdmin: false,
    birthDate: "",
  });

  const [tuman, setTuman] = useState([]);

  const nav = useNavigate();

  const formDataLabels = {
    title: translate("Добавить_менеджера"),
    download: "Загрузить базу менеджеров",
    komu: "Кому",
    fullName: translate("Fullname"),
    фамилия: translate("фамилия"),
    имя: translate("имя"),
    Отчество: translate("Отчество"),
    region: translate("Регион"),
    city: translate("Город"),
    district: translate("Район"),
    contactData: translate("Контактные данные менеджера"),
    workplace: translate("Место_работы"),
    email: translate("Почта"),
    phone: translate("Телефон"),
    temporaryPassword: translate("Временный_пароль"),
    isAdmin: translate("Добавить_менеджера"),
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    console.log(value);

    setFormData({
      ...formData,
      [name]: value?.id,
    });

    if (name === "region") {
      const selectedRegion = regionsTranslate.find(
        (region) => region.id === value.id
      );

      setTuman(selectedRegion ? selectedRegion.districts : []);
    }
  };
  const handleCHangeName = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const SendData = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "middleName",
      "mail",
      "temporaryPassword",
      "district",
      "birthDate",
      "phone",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      message.error(translate("fill_req_error"));
    } else {
      setLoading(true);
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        email: formData.mail,
        password: formData.temporaryPassword,
        workPlaceId: 1,
        districtId: formData.district,
        birthDate: formData.birthDate,
        ...formatPhoneNumberForBackend(formData?.phone),
      };

      console.log("mutation.status", mutation.status);

      mutation.mutate({
        requestData: requestData,
        onSuccess: () => {
          message.success(translate("Manager qo'shildi!"));
          setTimeout(() => {
            setLoading(false);

            document.location.reload();
          }, 500);
        },
        onError: () => {
          setLoading(false);
          message.error(translate("Manager registratsiya qilishda xatolik"));
        },
      });
      console.log("mutation.status", mutation.status);

      console.log("requestData", requestData);
    }
  };

  return (
    <Wrapper>
      {isLoading || loading ? (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      ) : null}
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
            <Man />
          </IconWrapper>
          <DataLayoutGrid>
            <Input2
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={formDataLabels.фамилия}
            />
            <Input2
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={formDataLabels.имя}
            />
            <Input2
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder={formDataLabels.Отчество}
            />
            <GenericDatePicker
              onChange={(value) => handleCHangeName("birthDate", value)}
              format="YYYY-MM-DD"
              placeholder={translate("Дата_рождения")}
            />
          </DataLayoutGrid>
        </Section>

        <MiniTitleSmall>{formDataLabels.region}</MiniTitleSmall>
        <Section>
          <PrimarySelect
            def={formDataLabels.region}
            options={regionsTranslate}
            onlyOption={1}
            onValueChange={(value) => handleSelectChange("region", value)}
          />
          <PrimarySelect
            def={formDataLabels.district}
            options={tuman}
            onlyOption={1}
            onValueChange={(value) => handleSelectChange("district", value)}
          />
        </Section>

        <MiniTitleSmall>{formDataLabels.contactData}</MiniTitleSmall>
        <Section>
          <Input2
            type="email"
            name="mail"
            value={formData.email}
            onChange={handleChange}
            placeholder={formDataLabels.email}
          />
          <Input2
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={"+998 "}
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
                  navigator.clipboard.writeText(formData.temporaryPassword);
                }}
              />
            </IconSection>
          </InputWraper>
        </Section>
        <Button onClick={SendData}>{formDataLabels.isAdmin}</Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default AddMeneger;
