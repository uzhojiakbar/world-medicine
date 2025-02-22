import React from "react";
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


const ModalEditLpu = ({setData, data: wk = 0}) => {
    console.log("WKLKKK", wk)

    const {translate} = useLanguage();

    if (!wk) {
        return null;
    }


    const onClose = () => {
        setData(null);
    }

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
        <ModalBodyHeader m={"20px"}>
            <MiniTitleSmall>{translate(wk.medicalInstitutionType)}</MiniTitleSmall>
        </ModalBodyHeader>
        <ModalBodyHeader m={"20px"}>
            <ModalBodySection>
                <MiniTitleSmall>{translate("Адресс")}</MiniTitleSmall>
                <ModalInnerSection>
                    <EditableInput
                        initialValue={wk?.address}
                        value={wk.name}
                        onChange={e => {
                            console.log(e.target.value)
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
                        onSave={e => {
                            console.log(e)
                        }}
                    />
                </ModalInnerSection>
            </ModalBodySection> <ModalBodySection>
            <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
            <ModalInnerSection>
                <EditableInput
                    initialValue={wk?.userDTO.firstName + " " + wk?.userDTO.lastName}
                    value={wk.name}
                    onChange={e => {
                        console.log(e.target.value)
                    }}
                />
            </ModalInnerSection>
        </ModalBodySection> <ModalBodySection>
            <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
            <ModalInnerSection>
                <EditableInput
                    initialValue={wk?.email}
                    value={wk.name}
                    onChange={e => {
                        console.log(e.target.value)
                    }}
                />
            </ModalInnerSection>
        </ModalBodySection>
        </ModalBodyHeader>
        <ModalBodyHeader m={"20px"}>
            <GenericAnalitikaTable
                data={
                    {thead: ["Специальность", "Врачи по базе", "Врачи по факту", "Выписано (Уп)"], tbody: []}
                }
                title={"asdasd"}
            />
        </ModalBodyHeader>
    </ModalContainer>;
};

export default ModalEditLpu;


