import React, {useMemo, useState} from "react";
import {DeleteBtn, ModalBodyHeader, ModalBodySection, ModalContainer, ModalHeader} from "../../../root/Modal.js";
import {MiniTitleSmall, Title} from "../../../root/style.js";
import CloseIcon from "../../../assets/svg/closeIcon.jsx";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import {useAddWorkplace, useGetDistricts, useGetDoctorsFilter, useGetRegions} from "../../../utils/server/server.js";
import {
    transformDistrictsForSelect, TransformInsitutation, transformRegionsForSelect, transformWorkplacesForSelect
} from "../../../utils/transformRegionsForSelect.js";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import Input2 from "../../../components/Generic/Input/Input2.jsx";
import {useForm} from "antd/es/form/Form.js";
import {medicalInstitutionType} from "../../../utils/medicalInstitutionType.js";
import {message} from "antd";
import {formatPhoneNumberForBackend} from "../../../utils/phoneFormatterForBackend.js";
import {useQueryClient} from "@tanstack/react-query";

const AddLpu = ({open, setOpen}) => {
    const {translate, language} = useLanguage();
    const [formData, setFormData] = useState({
        region: 0, district: 0,
    })


    const [loading, setLoading] = useState(0);

    console.log(formData)
    const mutation = useAddWorkplace()

    const {data: Regions, isLoading: isLoadingRegions} = useGetRegions();
    const {data: Districts, isLoading: isLoadingDistrict} = useGetDistricts(formData?.region || null);
    const {data: doctors, isLoading: isLoadingDoctors} = useGetDoctorsFilter({
        regionId: formData?.region || null, districtId: formData?.district || null,
    });

    const translateRegions = transformRegionsForSelect(Regions, language)
    const translateDIstricts = transformDistrictsForSelect(Districts, language)
    const translateInsitution = TransformInsitutation(medicalInstitutionType, language, translate)


    const doctorOptions = useMemo(() => doctors?.map((manager) => ({
        value: `${manager.firstName} ${manager.lastName}`,
        label: `${manager.firstName} ${manager.lastName}`,
        id: manager.userId,
    })) || [], [doctors, formData]);


    const handleSelectChange = (name, value) => {
        console.log(name, value);
        setFormData({
            ...formData, [name]: value,
        })
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        setFormData({
            ...formData, [name]: value,
        })
    };

    const queryClient = useQueryClient();

    const handleRefresh = () => {
        setLoading(1);
        queryClient.invalidateQueries(["getWorkplacec"]); // Ma'lumotlarni qayta yuklash
        setTimeout(() => {
            setLoading(0);
        }, 100);
    };

    const SendData = () => {

        if (!formData?.district) {
            console.error(translate("Районы_не_выбраны"));
            message.warning(translate("Районы_не_выбраны"));
            return;
        }
        if (!formData?.medicalInstitutionType) {
            console.error(translate("Форма_учреждения_не_выбраны"));
            message.warning(translate("Форма_учреждения_не_выбраны"));
            return;
        }

        if (!formData?.name) {
            console.error(translate("Введите_название_организации"));
            message.warning(translate("Введите_название_организации"));
            return;
        }
        if (!formData?.address) {
            console.error(translate("Введите_Адресс"));
            message.warning(translate("Введите_Адресс"));
            return;
        }
        if (!formData?.phone) {
            console.error(translate("Введите_номер_телефона"));
            message.warning(translate("Введите_номер_телефона"));
            return;
        }
        if (!formData?.email) {
            console.error(translate("Введите_email"));
            message.warning(translate("Введите_email"));
            return;
        }

        const requiredFields = [];

        const missingFields = requiredFields.filter((field) => !formData[field]);
        if (missingFields.length > 0) {
            message.error(translate("fill_req_error"));
        } else {
            setLoading(true);
            const requestData = {
                "name": formData?.name,
                "address": formData?.address,
                "phone": `998${formData?.phone}`,
                "email": formData?.email,
                "medicalInstitutionType": formData?.medicalInstitutionType,
                "chiefDoctorId": formData?.chiefDoctorId,
                "districtId": formData?.district,
            }

            console.log("mutation.status", mutation.status);

            console.log(requestData)

            mutation.mutate({
                requestData: requestData, onSuccess: () => {
                    message.success(translate("lpu_created"));
                    setTimeout(() => {
                        setLoading(false);
                        handleRefresh()
                        setOpen(false)
                    }, 500);
                }, onError: () => {
                    setLoading(false);
                    message.error(translate("lpu_created_error"));
                },
            });
        }
    };


    return <ModalContainer
        w={"1000px"}
        title={<ModalHeader>
            <Title>{translate("Workplace")}</Title>
            <div onClick={() => setOpen(false)} className="closeIcon">
                <CloseIcon/>
            </div>
        </ModalHeader>}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[]}
        centered
    >
        {isLoadingRegions || loading || isLoadingDoctors || isLoadingDistrict ? (<div className="loaderWindow">
            <div className="loader"></div>
        </div>) : ""}
        <ModalBodyHeader m={"20px"}>
            <MiniTitleSmall>{translate("Онкологический_центр")}</MiniTitleSmall>
        </ModalBodyHeader>
        <ModalBodyHeader m={"20px"}>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Область")}</MiniTitleSmall>
                <PrimarySelect
                    def={translate("Область")}
                    options={translateRegions}
                    onlyOption={1}
                    onValueChange={(value) => handleSelectChange("region", value.id)}
                    selectedType={"id"}
                />
            </ModalBodySection> <ModalBodySection>
            <MiniTitleSmall>{translate("Район")}</MiniTitleSmall>
            <PrimarySelect
                def={translate("Район")}
                options={translateDIstricts}
                onlyOption={1}
                onValueChange={(value) => handleSelectChange("district", value?.districtId)}
                selectedType={"districtId"}
            />
        </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Форма_учреждения")}</MiniTitleSmall>
                <PrimarySelect
                    def={translate("Форма_учреждения")}
                    options={translateInsitution}
                    onlyOption={1}
                    onValueChange={(value) => handleSelectChange("medicalInstitutionType", value?.key)}
                    selectedType={"id"}
                />
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
                <PrimarySelect
                    def={translate("Глав_Врач")}
                    options={doctorOptions}
                    onlyOption={1}
                    onValueChange={(value) => handleSelectChange("chiefDoctorId", value?.id)}
                    selectedType={"id"}
                />
            </ModalBodySection>

            <ModalBodySection>
                <MiniTitleSmall>{translate("Название_организации")}</MiniTitleSmall>
                <Input2
                    type="text"
                    name="name"
                    value={formData?.address}
                    onChange={handleChange}
                    placeholder={translate("Название_организации")}
                />
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Адресс")}</MiniTitleSmall>
                <Input2
                    type="text"
                    name="address"
                    value={formData?.address}
                    onChange={handleChange}
                    placeholder={translate("address_template")}
                />
            </ModalBodySection>

            <ModalBodySection>
                <MiniTitleSmall>{translate("Телефон")}</MiniTitleSmall>
                <div className={"number-login"}>
                    <Input2
                        name="phone"
                        className={"countryCode"} disabled
                        placeholder={translate("+998")}
                    />
                    <Input2
                        type="number"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        placeholder={translate("900000000")}
                    />
                </div>
            </ModalBodySection>


            <ModalBodySection>

                <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
                <Input2
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    placeholder={translate("email_temp")}
                />
            </ModalBodySection>

        </ModalBodyHeader>
        <ModalBodyHeader gridC={1}>
            <ModalBodySection>
                <MiniTitleSmall
                    mgn={"0 auto"}
                >
                    {translate("adding_lpu")}
                </MiniTitleSmall>
                <DeleteBtn
                    bgcolor={"#216BF4"}
                    onClick={SendData}
                >
                    {translate("add_lpu")}
                </DeleteBtn>
            </ModalBodySection>
        </ModalBodyHeader>

    </ModalContainer>
};

export default AddLpu;
