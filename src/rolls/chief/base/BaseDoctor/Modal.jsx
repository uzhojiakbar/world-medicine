import React from "react";
import {
    ModalBodyHeader,
    ModalBodySection,
    ModalContainer,
    ModalHeader,
    ModalInnerSection,
    ModalUserProfilePicture,
} from "../../../../root/Modal.js";
import {MiniTitleSmall, Title} from "../../../../root/style.js";
import EditableInput from "../../../../components/Generic/EditableInput/EditableInput.jsx";
import {useLanguage} from "../../../../context/LanguageContext.jsx";
import ProfilePic1 from "../../../../assets/img/profile/profile2.svg";
import {useGetUserInfo} from "../../../../utils/server/server.js";
import {useGetDistrcitById} from "../../../../utils/server/server.js";
import {useGetWorkplacesById} from "../../../../utils/server/server.js";

const ModalDoctor = ({doctorId, isOpen, onClose}) => {

    console.log("doctorId)\n", doctorId)
    const {data: user, isLoading: isUserLoading} = useGetUserInfo(doctorId);

    const {data: district, isLoading: isDistrictLoading} = useGetDistrcitById(
        user?.districtId
    );

    const {data: workplace, isLoading: isWorkplaceLoading} = useGetWorkplacesById(
        user?.workplaceId
    );

    const {translate} = useLanguage();

    // if (isUserLoading || isDistrictLoading || isWorkplaceLoading) return <div className="loaderParent">
    //     <div className="loader"></div>
    // </div>;

    console.log("user", user,);
    console.log("district", district,);
    console.log("workplace", workplace,);
    // (isUserLoading || isDistrictLoading || isWorkplaceLoading) ? <div className="loaderParent">
    //     <div className="loader"></div>
    // </div> :
    return (
         <ModalContainer
            title={
                <ModalHeader>
                    <Title>{translate("Врач")}</Title>
                    <div onClick={onClose} className="closeIcon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5"
                                  d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                                  stroke="#808080" strokeWidth="2"/>
                            <path
                                d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                                fill="#808080"/>
                        </svg>
                    </div>
                </ModalHeader>
            }
            open={isOpen}
            onOk={onClose}
            onCancel={onClose}
            footer={[]}
            centered
        >
            <ModalBodyHeader>
                <ModalBodySection>
                    <MiniTitleSmall>Ф.И.О</MiniTitleSmall>
                    <ModalInnerSection>
                        <ModalUserProfilePicture pic={ProfilePic1}/>
                        <EditableInput initialValue={`${user?.firstName} ${user?.lastName}`} isInput={0}/>
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>Ответственная зона</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue={district?.nameUzLatin || "Неизвестно"}
                            isEditable={false}
                            isInput={1}
                            inputType="text"
                        />
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>Дата рождения</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput initialValue={user?.dateOfBirth} isInput={0} inputType="text"/>
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>Контакты врача</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue={`+${user?.number}`}
                            isInput={1}
                            phoneFormat={true}
                            inputType="text"
                            isEditable={false}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>Специализация</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput initialValue={user?.fieldName} isInput={0} inputType="text" isEditable={false}/>
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>Рабочее место</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue={workplace?.address || "Неизвестно"}
                            isInput={0}
                            inputType="text"
                            isEditable={false}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>Статус</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue={user?.status === "ENABLED" ? "Активен" : "Отключен"}
                            isInput={0}
                            inputType="text"
                            isEditable={false}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
            </ModalBodyHeader>
        </ModalContainer>
    );
};

export default ModalDoctor;
