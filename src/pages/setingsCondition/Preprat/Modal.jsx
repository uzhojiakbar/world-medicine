import React, {useCallback, useMemo, useState} from "react";
import {
    DeleteBtn,
    ModalBodyHeader,
    ModalBodySection,
    ModalContainer,
    ModalHeader, SelectedMNNstyle,
    SelectedMNNstyleContainer
} from "../../../root/Modal.js";
import {MiniTitleSmall, Title} from "../../../root/style.js";
import CloseIcon from "../../../assets/svg/closeIcon.jsx";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import {
    useAddDrugs,
    useAddWorkplace,
    useGetDistricts,
    useGetDoctorsFilter,
    useGetMnns,
    useGetRegions
} from "../../../utils/server/server.js";
import {
    transformDistrictsForSelect,
    TransformInsitutation,
    TransformMnns,
    transformRegionsForSelect,
    transformWorkplacesForSelect
} from "../../../utils/transformRegionsForSelect.js";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import Input2 from "../../../components/Generic/Input/Input2.jsx";
import {message} from "antd";
import {useQueryClient} from "@tanstack/react-query";
import {typePreparationForSelect, volumePreparationForSelect} from "../../../utils/Generics.js";

const AddMedicine = ({open, setOpen}) => {
    const {translate, language} = useLanguage();
    const [formData, setFormData] = useState({})
    const [selectedMNNs, setSelectedMNNs] = useState([])
    const [loading, setLoading] = useState(0);
    const mutation = useAddDrugs()
    const {data: mnnsDb, isLoading: isLoadingMnns} = useGetMnns();
    const transformMnns = TransformMnns(mnnsDb)

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
        queryClient.invalidateQueries(["Drugs"]); // Ma'lumotlarni qayta yuklash
        setTimeout(() => {
            setLoading(0);
        }, 100);
    };

    const SendData = () => {
        const requestData = {
            ...formData,
            inn: selectedMNNs.map(v => v?.value)
        };

        const requiredFields = [
            "nameUzLatin", "nameRussian", "name", "prescription", "type", "volume",
            "cip", "quantity", "suBall", "suLimit", "suPercentage", "sbPercentage", "sbLimit",
            "sbBall", "gzBall", "gzLimit", "gzPercentage", "kbPercentage", "kbLimit", "kbBall", "inn"
        ];

        const missingFields = requiredFields.filter((field) => {
            const value = requestData[field];
            return value === undefined || value === null || value === '' ||
                (Array.isArray(value) && value.length === 0);
        });

        if (missingFields.length > 0) {
            console.log("Majburiy maydonlar bo'sh yoki noto'g'ri:", missingFields);
            message.warning(translate("requeired_data") + ": " + missingFields.join(", "));
        } else {
            setLoading(true);
            mutation.mutate({
                requestData: requestData, onSuccess: () => {
                    message.success(translate("medicine_added"));
                    setTimeout(() => {
                        setLoading(false);
                        handleRefresh()
                        setOpen(false)
                    }, 500);
                }, onError: () => {
                    setLoading(false);
                    handleRefresh()
                    message.error(translate("medicine_added_error"));
                },
            });
        }
    }

    const handelMNNSChange = useCallback(
        (selected) => {
            if (!selected) return; // Agar tanlov bo‘lmasa, hech narsa qilmasin
            setSelectedMNNs((prev) => {
                // Agar tanlangan element allaqachon `prev` ichida bo'lsa, qo‘shmaydi
                if (prev.some((s) => s.id === selected.id)) {
                    return prev;
                }
                return [
                    ...prev,
                    {
                        id: selected.id,
                        value: selected.value,
                    },
                ];
            });
        },
        [setSelectedMNNs] // `selectedMNNs` emas, balki `setSelectedMNNs` dependency bo‘lishi kerak
    );


    return <ModalContainer
        w={"1000px"}

        title={<ModalHeader>
            <Title>{translate("Добавление_препората")}</Title>
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
        {loading || isLoadingMnns ? (<div className="loaderWindow">
            <div className="loader"></div>
        </div>) : ""}
        <ModalBodyHeader m={"20px"}>
            <MiniTitleSmall>{translate("medicine_name_translations")}</MiniTitleSmall>
        </ModalBodyHeader>
        <ModalBodyHeader gridC={3}>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("lang_uz")} <span>{translate("lang_uz_latin")}</span>
                </MiniTitleSmall>
                <Input2
                    type="text"
                    name="nameUzLatin"
                    value={formData?.nameUzLatin}
                    onChange={handleChange}
                    placeholder={translate("placeholder_uz")}
                />
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("lang_ru")}
                </MiniTitleSmall>
                <Input2
                    type="text"
                    name="nameRussian"
                    value={formData?.nameRussian}
                    onChange={handleChange}
                    placeholder={translate("placeholder_ru")}
                />
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("lang_eng")}
                </MiniTitleSmall>
                <Input2
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    placeholder={translate("placeholder_eng")}
                />
            </ModalBodySection>


        </ModalBodyHeader>
        <ModalBodyHeader gridC={1}>
            <ModalBodySection>
                <MiniTitleSmall
                >
                    {translate("List_of_inns")}
                </MiniTitleSmall>
                <PrimarySelect
                    options={transformMnns}
                    onValueChange={handelMNNSChange}
                    def={translate("select_mnn")}
                    onlyOption={1}
                    selectedOptions={"id"}
                />
            </ModalBodySection>
            <SelectedMNNstyleContainer>
                {
                    selectedMNNs?.length > 0 ? <>
                        {
                            selectedMNNs?.map((mNn) => <SelectedMNNstyle
                                onClick={() => setSelectedMNNs((prev) => prev.filter((item) => item.id !== mNn.id))}
                            >
                                <div className={"text"}>
                                    {mNn?.value}
                                </div>
                                <div
                                >
                                    <svg className={"closeIcon"} width="22" height="22" viewBox="0 0 22 22" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.0303 7.96965C8.73741 7.67676 8.26253 7.67676 7.96964 7.96965C7.67675 8.26255 7.67675 8.73742 7.96964 9.03031L9.93932 11L7.96966 12.9697C7.67677 13.2625 7.67677 13.7374 7.96966 14.0303C8.26255 14.3232 8.73743 14.3232 9.03032 14.0303L11 12.0607L12.9696 14.0303C13.2625 14.3232 13.7374 14.3232 14.0303 14.0303C14.3232 13.7374 14.3232 13.2625 14.0303 12.9696L12.0606 11L14.0303 9.03033C14.3232 8.73744 14.3232 8.26257 14.0303 7.96968C13.7374 7.67678 13.2625 7.67678 12.9696 7.96968L11 9.93933L9.0303 7.96965Z"
                                            fill="#1C274C"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25ZM1.75 11C1.75 5.89137 5.89137 1.75 11 1.75C16.1086 1.75 20.25 5.89137 20.25 11C20.25 16.1086 16.1086 20.25 11 20.25C5.89137 20.25 1.75 16.1086 1.75 11Z"
                                              fill="#1C274C"/>
                                    </svg>
                                </div>
                            </SelectedMNNstyle>)
                        }
                    </> : null
                }
            </SelectedMNNstyleContainer>
        </ModalBodyHeader>

        <ModalBodyHeader gridC={2}>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("type_medicine")}
                </MiniTitleSmall>
                <div className={"flexForSelectAndInput"}>
                    <Input2
                        type="number"
                        name="prescription"
                        value={formData?.prescription}
                        onChange={handleChange}
                        placeholder={translate("0")}
                    />
                    <PrimarySelect
                        options={volumePreparationForSelect(translate)}
                        onlyOption={1}
                        onValueChange={(value) =>
                            setFormData((prev) => ({...prev, volume: value.label}))
                        }
                        selectedOptions={"id"}
                        selectedOptionId={1}
                    />
                </div>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("type")}
                </MiniTitleSmall>
                <PrimarySelect
                    options={typePreparationForSelect(translate)}
                    onlyOption={1}
                    onValueChange={(value) =>
                        setFormData((prev) => ({...prev, type: value.label}))
                    }
                    selectedOptions={"id"}
                    selectedOptionId={1}
                />
            </ModalBodySection>
        </ModalBodyHeader>

        <ModalBodyHeader gridC={2}>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("sum")}
                </MiniTitleSmall>
                <Input2
                    type="number"
                    name="cip"
                    value={formData?.cip}
                    onChange={handleChange}
                    placeholder={translate("enter_sum")}
                />
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall
                    gap={"5px"}
                    jc={"flex-start"}
                >
                    {translate("Количество")}
                </MiniTitleSmall>
                <Input2
                    type="number"
                    name="quantity"
                    value={formData?.quantity}
                    onChange={handleChange}
                    placeholder={translate("700")}
                />
            </ModalBodySection>
        </ModalBodyHeader>


        <ModalBodyHeader gridC={1} gap={"10px"}>
            <MiniTitleSmall
                gap={"5px"}
                jc={"flex-start"}
            >
                {translate("СУ")}
            </MiniTitleSmall>
            <div className={"cugzInputs"}>
                <Input2
                    type="number"
                    name="suBall"
                    value={formData?.suBall}
                    onChange={handleChange}
                    placeholder={translate("Балл")}
                />
                <Input2
                    type="number"
                    name="suLimit"
                    value={formData?.suLimit}
                    onChange={handleChange}
                    placeholder={translate("Лимит")}
                />
                <Input2
                    type="number"
                    name="suPercentage"
                    value={formData?.suPercentage}
                    onChange={handleChange}
                    placeholder={translate("Процент")}
                />
            </div>
        </ModalBodyHeader>

        <ModalBodyHeader gridC={1} gap={"10px"}>
            <MiniTitleSmall
                gap={"5px"}
                jc={"flex-start"}
            >
                {translate("СБ")}
            </MiniTitleSmall>
            <div className={"cugzInputs"}>
                <Input2
                    type="number"
                    name="sbBall"
                    value={formData?.sbBall}
                    onChange={handleChange}
                    placeholder={translate("Балл")}
                />
                <Input2
                    type="number"
                    name="sbLimit"
                    value={formData?.sbLimit}
                    onChange={handleChange}
                    placeholder={translate("Лимит")}
                />
                <Input2
                    type="number"
                    name="sbPercentage"
                    value={formData?.sbPercentage}
                    onChange={handleChange}
                    placeholder={translate("Процент")}
                />
            </div>
        </ModalBodyHeader>

        <ModalBodyHeader gridC={1} gap={"10px"}>
            <MiniTitleSmall
                gap={"5px"}
                jc={"flex-start"}
            >
                {translate("ГЗ")}
            </MiniTitleSmall>
            <div className={"cugzInputs"}>
                <Input2
                    type="number"
                    name="gzBall"
                    value={formData?.gzBall}
                    onChange={handleChange}
                    placeholder={translate("Балл")}
                />
                <Input2
                    type="number"
                    name="gzLimit"
                    value={formData?.gzLimit}
                    onChange={handleChange}
                    placeholder={translate("Лимит")}
                />
                <Input2
                    type="number"
                    name="gzPercentage"
                    value={formData?.gzPercentage}
                    onChange={handleChange}
                    placeholder={translate("Процент")}
                />
            </div>
        </ModalBodyHeader>


        <ModalBodyHeader gridC={1} gap={"10px"}>
            <MiniTitleSmall
                gap={"5px"}
                jc={"flex-start"}
            >
                {translate("КВ")}
            </MiniTitleSmall>
            <div className={"cugzInputs"}>
                <Input2
                    type="number"
                    name="kbBall"
                    value={formData?.kbBall}
                    onChange={handleChange}
                    placeholder={translate("Балл")}
                />
                <Input2
                    type="number"
                    name="kbLimit"
                    value={formData?.kbLimit}
                    onChange={handleChange}
                    placeholder={translate("Лимит")}
                />
                <Input2
                    type="number"
                    name="kbPercentage"
                    value={formData?.kbPercentage}
                    onChange={handleChange}
                    placeholder={translate("Процент")}
                />
            </div>
        </ModalBodyHeader>


        <ModalBodyHeader gridC={1}>
            <ModalBodySection>
                <DeleteBtn
                    bgcolor={"#216BF4"}
                    onClick={SendData}
                >
                    {translate("Добавить_препорат")}
                </DeleteBtn>
            </ModalBodySection>
        </ModalBodyHeader>
    </ModalContainer>
};

export default AddMedicine;

// <ModalBodyHeader m={"20px"}>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Область")}</MiniTitleSmall>
//     <PrimarySelect
//         def={translate("Область")}
//         options={translateRegions}
//         onlyOption={1}
//         onValueChange={(value) => handleSelectChange("region", value.id)}
//         selectedType={"id"}
//     />
//   </ModalBodySection> <ModalBodySection>
//   <MiniTitleSmall>{translate("Район")}</MiniTitleSmall>
//   <PrimarySelect
//       def={translate("Район")}
//       options={translateDIstricts}
//       onlyOption={1}
//       onValueChange={(value) => handleSelectChange("district", value?.districtId)}
//       selectedType={"districtId"}
//   />
// </ModalBodySection>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Форма_учреждения")}</MiniTitleSmall>
//     <PrimarySelect
//         def={translate("Форма_учреждения")}
//         options={translateInsitution}
//         onlyOption={1}
//         onValueChange={(value) => handleSelectChange("medicalInstitutionType", value?.key)}
//         selectedType={"id"}
//     />
//   </ModalBodySection>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
//     <PrimarySelect
//         def={translate("Глав_Врач")}
//         options={doctorOptions}
//         onlyOption={1}
//         onValueChange={(value) => handleSelectChange("chiefDoctorId", value?.id)}
//         selectedType={"id"}
//     />
//   </ModalBodySection>
//
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Название_организации")}</MiniTitleSmall>
//     <Input2
//         type="text"
//         name="name"
//         value={formData?.address}
//         onChange={handleChange}
//         placeholder={translate("Название_организации")}
//     />
//   </ModalBodySection>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Адресс")}</MiniTitleSmall>
//     <Input2
//         type="text"
//         name="address"
//         value={formData?.address}
//         onChange={handleChange}
//         placeholder={translate("address_template")}
//     />
//   </ModalBodySection>
//
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Телефон")}</MiniTitleSmall>
//     <div className={"number-login"}>
//       <Input2
//           name="phone"
//           className={"countryCode"} disabled
//           placeholder={translate("+998")}
//       />
//       <Input2
//           type="number"
//           name="phone"
//           value={formData?.phone}
//           onChange={handleChange}
//           placeholder={translate("900000000")}
//       />
//     </div>
//   </ModalBodySection>
//
//
//   <ModalBodySection>
//
//     <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
//     <Input2
//         type="email"
//         name="email"
//         value={formData?.email}
//         onChange={handleChange}
//         placeholder={translate("email_temp")}
//     />
//   </ModalBodySection>
//
// </ModalBodyHeader>
