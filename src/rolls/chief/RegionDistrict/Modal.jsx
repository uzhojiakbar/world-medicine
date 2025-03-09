import React, {useEffect, useState} from "react";
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
    useAddRegion,
    useGetDoctorsFilter,
    useGetProfileInfo,
    useSaveReportManager,
    useUpdateWorkplace
} from "../../../utils/server/server.js";
import Input from "../../../components/Generic/Input/Input.jsx";
import {message} from "antd";

const ModalAddRegion = ({
                            open = false, setOpen = () => {
    }
                        }) => {
    const {translate} = useLanguage();
    const [loading, setLoading] = useState(0);


    const onClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        name: "",
        nameUzLatin: "",
        nameRussian: "",
        nameUzCyrillic: ""
    });

    const changeInput = (value, name) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(formData);
    };

    const mutation = useAddRegion();

    const AddRegion = () => {
        setLoading(1);

        const emptyFields = Object.entries(formData)
            .filter(([key, value]) => !value.trim()) // Bo‘sh yoki faqat bo‘sh joylardan iborat maydonlarni tekshirish
            .map(([key]) => key); // Faqat maydon nomlarini olish

        if (emptyFields.length > 0) {
            message.error(translate("fields_empty") + `: ${emptyFields.join(", ")}`);
            setLoading(0);
            return;

        }

        mutation.mutate({
            requestData: {
                ...formData,
                districts: [
                    formData
                ]
            },
            onSuccess: () => {
                message.success(translate("region_added"));
                setTimeout(() => {
                    setLoading(false);
                    onClose()
                }, 500);
            },
            onError: (err) => {
                console.log("error", err);
                setLoading(false);
                message.error(translate("region_add_error"));
            },
        });
    };

    return <ModalContainer
        BorderRadius={"40px"}
        title={
            <ModalHeader>
                <Title>{translate("add_region")}</Title>
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
        <ModalBodyHeader>
            <MiniTitleSmall>
                {translate("add_region_title")}
            </MiniTitleSmall>
        </ModalBodyHeader>
        <ModalBodyHeader  m={"20px"} mb={"20px"}>
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
                    onChange={(value) => changeInput(value, "name")}
                />
            </ModalBodySection>

        </ModalBodyHeader>
        <ModalBodyHeader gridC={1}>
                <DeleteBtn
                    bgcolor={"#216BF4"}
                    onClick={AddRegion}
                >
                    {translate("adding_region")}
                </DeleteBtn>
        </ModalBodyHeader>
    </ModalContainer>;
};

export default ModalAddRegion;


// const {data: info, isLoading} = useGetProfileInfo();
// const {data: doctors, isLoading: doctorsIsLoading} = useGetDoctorsFilter({districtId: info.districtId || null});
// console.log(info)
// console.log("doctors",doctors)