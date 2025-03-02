import React, {useRef, useState} from "react";
import {
    DataLayoutGrid, FormWrapper, IconSection, IconWrapper, InputWraper, Section, Wrapper,
} from "./style.js";
import IconPlus from "../../assets/svg/IconPlus";
import Man from "../../assets/svg/Man.jsx";
import Input2 from "../../components/Generic/Input/Input2";
import PrimarySelect from "../../components/Generic/Select/Select";
import Restart from "../../assets/svg/restart";
import Copy from "../../assets/svg/copy";
import {useLanguage} from "../../context/LanguageContext.jsx";
import {useNavigate} from "react-router-dom";
import ForSee from "../../assets/svg/see.jsx";
import {
    useGetRegions, useGetWorkplaces, useRegisterDoctor, useRegisterManager, useUploadDoctor,
} from "../../utils/server/server.js";
import {transformRegionsForSelect, transformWorkplacesForSelect} from "../../utils/transformRegionsForSelect.js";
import {MiniTitleSmall, Title} from "../../root/style.js";
import Button from "../../components/Generic/Button/Button.jsx";
import {formatPhoneNumberForBackend} from "../../utils/phoneFormatterForBackend.js";
import GenericDatePicker from "../../components/Generic/GenericCalendar/GenericCalendar.jsx";
import {message} from "antd";
import FieldnamesManager from "../../utils/fieldnamesManager.js";
import styled from "styled-components";
import * as XLSX from "xlsx";

const HiddenInput = styled.input`
    display: none;
`;
const AddDoctor = () => {
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const processExcelData = (rawData) => {
        if (!rawData || rawData.length < 2) {
            console.error("❌ Xatolik: Excel fayli bo‘sh yoki noto‘g‘ri formatda!");
            return [];
        }

        const headers = rawData[0]; // Birinchi qator - sarlavhalar
        const dataRows = rawData.slice(1); // Qolgan qatorlar - ma'lumotlar

        const formattedData = [];

        for (const row of dataRows) {
            const [
                index, lastName, firstName, middleName, role, birthDate,
                regionId, districtId, workPlaceId, fieldName, email,
                phone, password
            ] = row;

            // ❗ **Validatsiya (bo‘sh maydon yoki noto‘g‘ri format)** ❗
            if (
                !firstName || !lastName || !password || !workPlaceId ||
                !districtId || !birthDate || !phone
            ) {
                console.error(`❌ Xatolik: ${firstName || "Foydaluvchi"} ma’lumotlari to‘liq emas!`);
                message.error(`Xatolik: ${firstName || "Foydaluvchi"} ma’lumotlari to‘liq emas!`)
                return []; //  Ma’lumot noto‘g‘ri bo‘lsa, bo‘sh array qaytariladi
            }
            formattedData.push({
                firstName,
                lastName,
                middleName: middleName || "string", // Agar yo‘q bo‘lsa, bo‘sh string
                email: email || null,
                password,
                workPlaceId,
                districtId,
                birthDate,
                fieldName: fieldName || "NEUROLOGIST", // Default qiymat
                position: "string",
                gender: "MALE",
                role: "CHIEF",
                ...formatPhoneNumberForBackend(`${phone}`), // Telefon formatlash
            });
        }

        console.log("✅ Excel ma’lumotlari formatlandi:", formattedData);
        return formattedData;
    };
    const handleFileChange = (event) => {
        console.log(1)
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: "array"});
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                let rawData = XLSX.utils.sheet_to_json(sheet, {header: 1});
                rawData = rawData.filter(row => row.some(cell => cell !== null && cell !== ""));
                console.log("📥 Raw Excel Data (Cleaned):", rawData);
                const formattedJson = processExcelData(rawData);
                setJsonData(formattedJson);
                console.log("📤 Converted JSON:", formattedJson);
            };
            reader.readAsArrayBuffer(file);
        }

    };


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
        fieldname: ""
    });
    const {translate, language} = useLanguage();
    const [showPassword, setShowPassword] = useState(false);
    const {data: Regions, isLoading} = useGetRegions();
    const {data: Workpalces, isLoadingWorkPlaces} = useGetWorkplaces(
        {
            regionId: formData.region || null,
            districtId: formData.district || null,
        }
    );

    const [jsonData, setJsonData] = useState([]);

    const specializations = FieldnamesManager();
    const [loading, setLoading] = useState(false);
    const regionsTranslate = transformRegionsForSelect(Regions, language);
    const WrkPlc = transformWorkplacesForSelect(Workpalces);


    const CancelUpload = () => {
        setJsonData([]); // JSON ma'lumotlarini tozalaydi
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Fayl inputini tozalaydi
            fileInputRef.current.files = []; // Fayl inputini tozalaydi
        }
        console.log("🚫 Yuklash bekor qilindi!");
        message.warning("Yuklash bekor qilindi!");
    };

    const mutation = useRegisterDoctor();
    const mutationUpload = useUploadDoctor();
    const [tuman, setTuman] = useState([]);

    const nav = useNavigate();

    const formDataLabels = {
        title: translate("Добавить_врача"),
        download: "Загрузить_базу_врача",
        komu: "Кому",
        fullName: translate("Fullname"),
        фамилия: translate("фамилия"),
        имя: translate("имя"),
        Отчество: translate("Отчество"),
        region: translate("Регион"),
        workplace_spec: translate("Место_работы_и_специализация"),
        city: translate("Город"),
        district: translate("Район"),
        contactData: translate("Контактные_данные"),
        workplace: translate("Место_работы"),
        email: translate("Почта"),
        phone: translate("Телефон"),
        temporaryPassword: translate("Временный_пароль"),
        isAdmin: translate("Добавить_врача"),
        fieldname: translate("select-specializations")
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value,
        });
    };

    const handleSelectChange = (name, value) => {
        console.log(value);

        setFormData({
            ...formData, [name]: value?.id || value?.districtId,
        });

        if (name === "region") {
            const selectedRegion = regionsTranslate.find((region) => region.id === value.id);

            setTuman(selectedRegion ? selectedRegion.districts : []);
        }
    };
    const handleSelectChangeFieldname = (name, value) => {
        setFormData({
            ...formData, [name]: value.label,
        });
    };
    const handleCHangeName = (name, value) => {
        setFormData({
            ...formData, [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const SendData = () => {
        const requiredFields = ["firstName", "lastName", "temporaryPassword", "district", "birthDate", "phone", "workplace", "fieldname"];

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
                workPlaceId: formData.workplace,
                districtId: formData.district,
                birthDate: formData.birthDate,
                fieldName: formData?.fieldname || "NEUROLOGIST",
                position: "string",
                gender: "MALE",
                role: "CHIEF", ...formatPhoneNumberForBackend(formData?.phone),
            };

            console.log("mutation.status", mutation.status);

            console.log(requestData)

            mutation.mutate({
                requestData: requestData, onSuccess: () => {
                    message.success(translate("доктор_создан"));
                    setTimeout(() => {
                        setLoading(false);
                        document.location.reload();
                    }, 500);
                }, onError: () => {
                    setLoading(false);
                    message.error(translate("create-doctor-error"));
                },
            });
        }
    };
    const SendDatas = async () => {
        if (!jsonData?.length) {
            message.error("❌ Malumotlar topilmadi!");
            return;
        }

        setLoading(true);

        try {
            await mutationUpload.mutateAsync({
                requestData: jsonData, onSuccess: (data) => {
                    console.log(data)
                    if (data === "Doctors upload partially failed. Please check the input data.") {
                        message.warning(translate("доктор_создан_частично"));
                    } else {
                        message.success(translate("доктор_создан"));
                    }
                }, onError: (error) => {
                    console.log(error)
                    setLoading(false);
                    message.error(translate("create-doctor-error"));
                }, // Har bir elementni serverga jo‘natamiz
            })
        } finally {
            setLoading(false);
        }
    };


    return (
        <Wrapper>
            {isLoading || loading || isLoadingWorkPlaces ? (<div className="loaderParent">
                <div className="loader"></div>
            </div>) : null}
            <Title className="titlee">
                <div>{formDataLabels.title}</div>
                {
                    jsonData?.length ?
                        <div className={"buttons"}>
                            <Button
                                onClick={CancelUpload}
                            >
                                Bekor qilish
                            </Button>
                            <Button
                                icon={<IconPlus/>} onClick={SendDatas}
                            >
                                Send data to server
                            </Button>
                        </div>
                        : <div className="buttons">
                            <HiddenInput
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx"
                                onChange={handleFileChange}
                            />
                            <Button icon={<IconPlus/>} onClick={handleButtonClick}>
                                {translate("Загрузить_продажи_за_месяц")}
                            </Button>
                        </div>
                }
                {/*<Button onClick={() => nav("../")} icon={<IconPlus/>}>*/}
                {/*    {translate("Загрузить_базу_врача")}*/}
                {/*</Button>*/}
            </Title>
            <FormWrapper onSubmit={handleSubmit}>
                <MiniTitleSmall>{formDataLabels.komu}</MiniTitleSmall>
                <Section now={"true"}>
                    <IconWrapper>
                        <Man/>
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
                <MiniTitleSmall>{formDataLabels.workplace_spec}</MiniTitleSmall>
                <Section>
                    <PrimarySelect
                        def={formDataLabels.workplace}
                        options={WrkPlc}
                        onlyOption={1}
                        onValueChange={(value) => handleSelectChange("workplace", value)}
                    />

                    <PrimarySelect
                        def={formDataLabels.fieldname}
                        options={specializations}
                        onlyOption={1}
                        onValueChange={(value) => handleSelectChangeFieldname("fieldname", value)}
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
                            <Restart onClick={() => {
                            }}/>
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
            </FormWrapper>
            <Button
                mw={"1000px"}
                w={"100%"}
                onClick={SendData}>{formDataLabels.isAdmin}</Button>
        </Wrapper>);
};

export default AddDoctor;
