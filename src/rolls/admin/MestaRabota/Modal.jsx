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
import {useGetDoctorsFilter, useGetProfileInfo, useUpdateWorkplace} from "../../../utils/server/server.js";

const ModalEditLpu = ({setData, data: wk = 0}) => {
    const {translate} = useLanguage();
    if (!wk) {
        return null;
    }
    const mutation = useUpdateWorkplace();
    const [isLoading, setIsLoading] = useState(0);
    const [uptData, setUptData] = useState({
        name: wk.name,
        phone: wk.phone,
        email: wk.email,
        firstname: "",
    });
    const handleUpdate = () => {
        setIsLoading(true);
        mutation.mutate(
            {
                requestData: {
                    id: wk.id,
                    uptData: {
                        name: uptData?.name,
                        address: wk?.address,
                        description: wk?.description,
                        medicalInstitutionType: wk?.medicalInstitutionType,
                        districtId: wk?.regionDistrictDTO?.districtId,
                        phone: uptData?.phone,
                        email: uptData?.email,
                        chiefDoctorId: wk?.userDTO?.creatorId,
                    }
                },
                onSuccess: () => {
                    setIsLoading(0);
                    console.log("updated workplace",{
                        name: uptData?.name,
                        address: wk?.address,
                        description: wk?.description,
                        medicalInstitutionType: wk?.medicalInstitutionType,
                        districtId: wk?.regionDistrictDTO?.districtId,
                        phone: uptData?.phone,
                        email: uptData?.email,
                        chiefDoctorId: wk?.userDTO?.creatorId,
                    });
                },
                onError: () => {
                    setIsLoading(0);
                    console.log(" error updated workplace",{
                        name: uptData?.name,
                        address: wk?.address,
                        description: wk?.description,
                        medicalInstitutionType: wk?.medicalInstitutionType,
                        districtId: wk?.regionDistrictDTO?.districtId,
                        phone: uptData?.phone,
                        email: uptData?.email,
                        chiefDoctorId: wk?.userDTO?.creatorId,
                    });
                }
            }
        )
        setIsLoading(0)
    }

    const onClose = () => {
        setData(null);
    }
    useEffect(() => {
        handleUpdate()
        console.log("1111111111111111111")
    },[uptData])
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
        {isLoading ? (<div className="loaderParent">
            <div className="loader"></div>
        </div>) : ""}
        <ModalBodyHeader m={"20px"}>
            <MiniTitleSmall>{translate(wk.medicalInstitutionType)}</MiniTitleSmall>
        </ModalBodyHeader>
        <ModalBodyHeader mb={"40px"} m={"20px"}>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Адресс")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        initialValue={wk?.address}
                        value={wk.name}
                        onSave={e => {
                            setUptData({...uptData, name: e})
                        }}
                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Телефон")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        isPhoneNumber={true}
                        initialValue={wk?.phone || ""}
                        value={wk.name}
                        onSave={e =>
                            setUptData({...uptData, phone: e})
                        }
                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        initialValue={wk?.userDTO?.firstName + " " + wk?.userDTO?.lastName}
                        value={wk?.userDTO?.firstName + " " + wk?.userDTO?.lastName}
                        onSave={e => {
                            setUptData({...uptData, firstname: e})
                        }}
                    />
                </ModalInnerSection>
            </ModalBodySection>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        initialValue={wk?.email}
                        value={wk?.email}
                        onSave={e => {
                            setUptData({...uptData, email: e})
                        }}
                    />
                </ModalInnerSection>
            </ModalBodySection>
        </ModalBodyHeader>
        <GenericAnalitikaTable
            data={
                {thead: ["Специальность", "Врачи по базе", "Врачи по факту", "Выписано (Уп)"], tbody: []}
            }
            title={"asdasd"}
        />
    </ModalContainer>;
};

export default ModalEditLpu;



// const {data: info, isLoading} = useGetProfileInfo();
// const {data: doctors, isLoading: doctorsIsLoading} = useGetDoctorsFilter({districtId: info.districtId || null});
// console.log(info)
// console.log("doctors",doctors)