import React, {useEffect, useRef, useState} from "react";
import {
    DeleteBtn,
    ModalBodyHeader,
    ModalBodySection,
    ModalContainer,
    ModalHeader,
    ModalInnerSection,
    ModalUserProfilePicture,
} from "../../../root/Modal.js";

import {MiniTitleSmall, Title} from "../../../root/style.js";
import EditableInput from "../../../components/Generic/EditableInput/EditableInput.jsx";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import ProfilePic1 from "../../../assets/img/profile/profile2.svg";
import CloseIcon from "../../../assets/svg/closeIcon.jsx";
import GenericAnalitikaTable from "../../manager/analiktika/GenericTable.jsx";
import {
    useAddDistrict,
    useAddRegion,
    useGetDoctorsFilter,
    useGetProfileInfo, useGetRegions,
    useSaveReportManager,
    useUpdateWorkplace
} from "../../../utils/server/server.js";
import Input from "../../../components/Generic/Input/Input.jsx";
import {message} from "antd";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import {transformRegionsForSelect} from "../../../utils/transformRegionsForSelect.js";

const ModalAddDistrict = ({
                              open = false, setOpen = () => {
    }
                          }) => {
    const {translate,language} = useLanguage();
    const [loading, setLoading] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        nameUzLatin: "",
        nameRussian: "",
        nameUzCyrillic: "",
        regionId: 0
    });

    const onClose = () => {
        setFormData({
            name: "",
            nameUzLatin: "",
            nameRussian: "",
            nameUzCyrillic: "",
            regionId: 0
        })
        setOpen(false)
    };
    const changeInput = (value, name) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    };

    const {data: Regions, isLoading} = useGetRegions();
    const regionsTranslate = transformRegionsForSelect(Regions, language);

    const mutation = useAddDistrict();

    const AddRegion = () => {
        setLoading(1)
        console.log("formData",formData)

        const emptyFields = Object.entries({
            ...formData,
            regionId: "123"
        })
            .filter(([key, value]) => typeof(value)==="string"?!value.trim():value) // Bo‘sh yoki faqat bo‘sh joylardan iborat maydonlarni tekshirish
            .map(([key]) => key); // Faqat maydon nomlarini olish

        if (emptyFields.length > 0) {
            message.error(translate("fields_empty") + `: ${emptyFields.join(", ")}`);
            setLoading(0);
            return;

        }

        mutation.mutate({
            requestData: {
                ...formData,
            },
            onSuccess: () => {
                message.success(translate("district_added"));
                setTimeout(() => {
                    setLoading(false);
                    onClose()
                }, 500);
            },
            onError: (err) => {
                console.log("error", err);
                setLoading(false);
                message.error(translate("district_added_error"));
            },
        });
    };


    return <ModalContainer
        w={"1000px"}
        BorderRadius={"40px"}
        minHeight={"40vh"}
        title={
            <ModalHeader>
                <Title>{translate("addDistrict")}</Title>
                <div onClick={onClose} className="closeIcon">
                    <CloseIcon/>
                </div>
            </ModalHeader>
        }
        open={open}
        onOk={onClose}
        onCancel={onClose}
        footer={[]}
        centered
    >
        {loading ? (<div className="loaderWindow">
            <div className="loader"></div>
        </div>) : ""}
        <ModalBodyHeader m={"40px"} mb={"20px"} gridC={1}>
            <ModalBodySection height={"fit-content"}>
                <MiniTitleSmall>
                <span>
                    {translate("Выберите_регион")}
                </span>
                </MiniTitleSmall>
                <PrimarySelect
                    def={translate("Выберите_регион")}
                    borderRadius={"30px"}
                    options={regionsTranslate}
                    selectedType={"id"}
                    selectedOptionId={formData?.regionId}
                    onlyOption={1}
                    onValueChange={(value)=>changeInput(value?.id,"regionId")}
                />
            </ModalBodySection>
        </ModalBodyHeader>

        <ModalBodyHeader m={"20px"} mb={"20px"}>
            <ModalBodySection height={"fit-content"}>
                <MiniTitleSmall>
                <span>
                    {translate("lang_uz")}
                    <span className={"regular"}>{translate("lang_uz_latin")}</span>
                </span>
                </MiniTitleSmall>
                <Input
                    borderRadius={"40px"}
                    placeholder={"Toshkent"}
                    value2={formData.nameUzLatin}
                    onChange={(value) => changeInput(value, "nameUzLatin")}
                />
            </ModalBodySection>
            <ModalBodySection height={"fit-content"}>
                <MiniTitleSmall>
                <span>
                    {translate("lang_uz")}
                    <span className={"regular"}>{translate("lang_uz_krill")}</span>
                </span>
                </MiniTitleSmall>
                <Input
                    borderRadius={"40px"}
                    placeholder={"Тошкент"}
                    value2={formData.nameUzCyrillic}

                    onChange={(value) => changeInput(value, "nameUzCyrillic")}
                />
            </ModalBodySection>
            <ModalBodySection height={"fit-content"}>
                <MiniTitleSmall>
                <span>
                    {translate("lang_ru")}
                </span>
                </MiniTitleSmall>
                <Input
                    borderRadius={"40px"}
                    placeholder={"Ташкент"}
                    value2={formData.nameRussian}

                    onChange={(value) => changeInput(value, "nameRussian")}
                />
            </ModalBodySection>
            <ModalBodySection height={"fit-content"}>
                <MiniTitleSmall>
                <span>
                    {translate("lang_eng")}
                </span>
                </MiniTitleSmall>
                <Input
                    borderRadius={"40px"}
                    placeholder={"Tashkent"}
                    value2={formData.name}

                    onChange={(value) => changeInput(value, "name")}
                />
            </ModalBodySection>

        </ModalBodyHeader>
        <ModalBodyHeader gridC={1}>
            <ModalBodySection>
                <DeleteBtn
                    bgcolor={"#216BF4"}
                    onClick={AddRegion}
                >
                    {translate("adding_region")}
                </DeleteBtn>
            </ModalBodySection>
        </ModalBodyHeader>
    </ModalContainer>;
};

export default ModalAddDistrict;


// const {data: info, isLoading} = useGetProfileInfo();
// const {data: doctors, isLoading: doctorsIsLoading} = useGetDoctorsFilter({districtId: info.districtId || null});
// console.log(info)
// console.log("doctors",doctors)