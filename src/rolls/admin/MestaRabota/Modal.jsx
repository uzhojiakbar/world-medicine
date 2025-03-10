import React, {useEffect, useState} from "react";
import {
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
    useGetDoctorsFilter,
    useGetProfileInfo,
    useGetWorkplaceOne,
    useUpdateWorkplace
} from "../../../utils/server/server.js";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import {TransformInsitutation, TransFormUsersForSelect} from "../../../utils/transformRegionsForSelect.js";
import {message} from "antd";
import {medicalInstitutionType} from "../../../utils/medicalInstitutionType.js";

const ModalEditLpu = ({setData, data: tempwk = 0}) => {
    const {translate, language} = useLanguage();
    if (!tempwk?.id) {
        return null;
    }

    const {data: wk, isLoading: isLoadingWKK} = useGetWorkplaceOne(tempwk?.id || null)

    const mutation = useUpdateWorkplace();
    const [isLoading, setIsLoading] = useState(0);
    const [uptData, setUptData] = useState({
        name: wk?.name,
        phone: wk?.phone,
        email: wk?.email,
        chiefDoctorId: "",
    });
    const handleUpdate = () => {
        console.log("uptData", uptData);
        // setIsLoading(true);
        // mutation.mutate(
        //     {
        //         requestData: {
        //             id: wk.id,
        //             uptData: {
        //                 name: uptData?.name,
        //                 address: wk?.address,
        //                 description: wk?.description,
        //                 medicalInstitutionType: wk?.medicalInstitutionType,
        //                 districtId: wk?.regionDistrictDTO?.districtId,
        //                 phone: uptData?.phone,
        //                 email: uptData?.email,
        //                 chiefDoctorId: uptData?.chiefDoctorId,
        //             }
        //         },
        //         onSuccess: () => {
        //             setIsLoading(0);
        //             console.log("updated workplace",{
        //                 name: uptData?.name,
        //                 address: wk?.address,
        //                 description: wk?.description,
        //                 medicalInstitutionType: wk?.medicalInstitutionType,
        //                 districtId: wk?.regionDistrictDTO?.districtId,
        //                 phone: uptData?.phone,
        //                 email: uptData?.email,
        //                 chiefDoctorId: wk?.userDTO?.creatorId,
        //             });
        //         },
        //         onError: () => {
        //             setIsLoading(0);
        //             console.log(" error updated workplace",{
        //                 name: uptData?.name,
        //                 address: wk?.address,
        //                 description: wk?.description,
        //                 medicalInstitutionType: wk?.medicalInstitutionType,
        //                 districtId: wk?.regionDistrictDTO?.districtId,
        //                 phone: uptData?.phone,
        //                 email: uptData?.email,
        //                 chiefDoctorId: wk?.userDTO?.creatorId,
        //             });
        //         }
        //     }
        // )
    }

    const onClose = () => {
        setData(null);
    }
    useEffect(() => {
        handleUpdate()
    }, [uptData])

    const {data: doctors} = useGetDoctorsFilter({
        districtId: wk?.regionDistrictDTO?.districtId
    })

    const translateDoctors = TransFormUsersForSelect(doctors);

    const onUpdate = ({name = "", value = ""}, text = 1) => {

        if (text) {
            setIsLoading(1)
            mutation.mutate(
                {
                    requestData: {
                        id: wk?.id || tempwk?.id,
                        uptData: {
                            id: tempwk?.id || null,
                            name: wk?.name || null,
                            address: wk?.address || null,
                            description: wk?.description || null,
                            phone: wk?.phone || null,
                            email: wk?.email || null,
                            medicalInstitutionType: wk?.medicalInstitutionType || null,
                            chiefDoctorId: wk?.userDTO?.userId || null,
                            districtId: wk?.regionDistrictDTO?.districtId || null,
                            [name]: value
                        }
                    },
                    onSuccess: () => {
                        message.success(translate("updated"));
                        setIsLoading(0);
                    },
                    onError: () => {
                        message.success(translate("error"));
                        setIsLoading(0);
                    }
                }
            )
        }

    }


    const translateInsitution = TransformInsitutation(medicalInstitutionType, language, translate)


    return <ModalContainer
        title={
            <ModalHeader>
                <Title>{translate("Workplace")}</Title>
                <div onClick={onClose} className="closeIcon">
                    <CloseIcon/>
                </div>
            </ModalHeader>
        }
        open={wk}
        onOk={onClose}
        onCancel={onClose}
        footer={[]}
        centered
    >
        {isLoading || isLoadingWKK ? (<div className="loaderWindow">
            <div className="loader"></div>
        </div>) : ""}
        {/*<ModalBodyHeader m={"20px"}>*/}
        {/*    <MiniTitleSmall>{translate(wk?.medicalInstitutionType)}</MiniTitleSmall>*/}
        {/*</ModalBodyHeader>*/}
        <ModalBodyHeader mb={"40px"} m={"20px"}>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Адресс")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        initialValue={wk?.name}
                        value={wk?.name}
                        onSave={e => onUpdate({name: "name", value: e})}
                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Телефон")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        isPhoneNumber={true}
                        initialValue={wk?.phone || ""}
                        value={wk?.phone}
                        onSave={e =>
                            onUpdate({name: "phone", value: e})
                        }

                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
                <ModalInnerSection>
                    <PrimarySelect
                        def={""}
                        options={translateDoctors}
                        onlyOption={1}
                        selectedOptionId={wk?.userDTO?.userId}
                        selectedType={"id"}
                        onValueChange={(value) => onUpdate({name: "chiefDoctorId", value: value?.id})}
                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        initialValue={wk?.email}
                        value={wk?.email}
                        onSave={e => onUpdate({name: "email", value: e})}

                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
                <ModalInnerSection>
                    {
                        console.log("TYPE", )
                    }
                    <PrimarySelect
                        def={""}
                        options={translateInsitution}
                        onlyOption={1}
                        selectedOptionId={() => translateInsitution.filter((v) => v.key === wk?.medicalInstitutionType)[0]?.id}
                        selectedType={"id"}
                        onValueChange={(value) => onUpdate({name: "medicalInstitutionType", value: value?.key})}
                    />
                </ModalInnerSection>
            </ModalBodySection>

        </ModalBodyHeader>
        <GenericAnalitikaTable
            data={
                {thead: ["Специальность", "Врачи по базе", "Врачи по факту", "Выписано (Уп)"], tbody: []}
            }
        />
    </ModalContainer>;
};

export default ModalEditLpu;


// const {data: info, isLoading} = useGetProfileInfo();
// const {data: doctors, isLoading: doctorsIsLoading} = useGetDoctorsFilter({districtId: info.districtId || null});
// console.log(info)
// console.log("doctors",doctors)