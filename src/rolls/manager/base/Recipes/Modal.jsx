import {
    ContainerInner,
    ModalBody,
    ModalBodyHeader,
    ModalBodySection,
    ModalContainer,
    ModalHeader,
    ModalInnerSection,
    ModalUserProfilePicture,
} from "../../../../root/Modal";
import {MiniTitleSmall, Title} from "../../../../root/style";
import EditableInput from "../../../../components/Generic/EditableInput/EditableInput";
import {useLanguage} from "../../../../context/LanguageContext";
import CalendarIcon from "../../../../assets/svg/CalendarIcon";
import Table2 from "./Table2Mini";
import React, {useEffect, useState} from "react";
import {StaticText} from "../../../../components/Generic/EditableInput/style.js";
import {formatPhoneNumber} from "../../../../utils/PhoneFormatter.js";


const ModalPrescription = ({
                               id = {}, setId = () => {
    }
                           }) => {

    console.log("id", "id", id)
    const {translate} = useLanguage();
    const [doctorInfo, setDoctorInfo] = useState({});

    const onClose = () => {
        setId({});
        setDoctorInfo({});
    }

    useEffect(() => {
        setDoctorInfo(id);
    }, [id]);

    return (
        <ModalContainer
            w={"50vw"}
            title={
                <ModalHeader>
                    <Title>{translate("Описание_рецепта")}</Title>
                    <div onClick={onClose} className="closeIcon">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.5"
                                d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                                stroke="#808080"
                                strokeWidth="2"
                            />
                            <path
                                d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                                fill="#808080"
                            />
                        </svg>
                    </div>
                </ModalHeader>
            }
            open={Object?.keys(id)?.length}
            onOk={onClose}
            onCancel={onClose}
            footer={[]}
            centered
        >
            <ModalBody style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <ModalBodyHeader gridC={2}>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Врач")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <ModalUserProfilePicture/>
                            <ContainerInner>
                                <StaticText>
                                    {
                                        `${doctorInfo?.doctor?.firstName ?? ""} ${doctorInfo?.doctor?.lastName}  ${doctorInfo?.doctor?.middleName} `
                                    }
                                </StaticText>
                            </ContainerInner>
                            {/*<EditableInput initialValue={`${doctorInfo?.doctor?.firstName ?? ""} ${doctorInfo?.doctor?.lastName}  ${doctorInfo?.doctor?.middleName} `}  />*/}
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Место_работы")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <ContainerInner>
                                <StaticText>
                                    {
                                        `${id?.doctor?.workPlaceDTO?.name ?? ""} `
                                    }
                                </StaticText>
                            </ContainerInner>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Дата_назначения")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <ContainerInner>
                                <StaticText>
                                    {
                                        `${id?.dateCreation} `
                                    }
                                </StaticText>
                            </ContainerInner>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Контакты_врача")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <ContainerInner>
                                <StaticText>
                                    {
                                        formatPhoneNumber(`${id?.doctor?.number} `)
                                    }
                                </StaticText>
                            </ContainerInner>

                        </ModalInnerSection>
                    </ModalBodySection>
                </ModalBodyHeader>
                <ModalBodySection>
                    <MiniTitleSmall>{translate("Пациент")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <ContainerInner brdr={"10px"}>
                            <StaticText>
                                {
                                    formatPhoneNumber(`${id?.firstName ?? ""} ${id?.lastName ?? ""} ${id?.middleName ?? ""} `)
                                }
                            </StaticText>
                        </ContainerInner>

                        {/*<EditableInput*/}
                        {/*    brdr={"10px"}*/}
                        {/*    initialValue="2005 год"*/}
                        {/*    isInput={false}*/}
                        {/*    inputType="text"*/}
                        {/*    icon={<CalendarIcon/>}*/}
                        {/*/>*/}
                        <ContainerInner brdr={"10px"}
                        >
                            <StaticText>
                                {
                                   id?.dateOfBirth
                                }
                            </StaticText>
                             <CalendarIcon/>
                        </ContainerInner>
                        <ContainerInner brdr={"10px"}>
                            <StaticText>
                                {
                                    formatPhoneNumber(`${id?.phoneNumberPrefix?.replace("+", "") ?? ""} ${id?.phoneNumber ?? ""}`)
                                }
                            </StaticText>
                        </ContainerInner>
                    </ModalInnerSection>
                </ModalBodySection>

                <Table2
                    title={translate("Рекомендованные_препараты")}
                    data={[] || []}
                />
                <ModalBodySection>
                    <MiniTitleSmall>
                        {translate("Дополнительные_комментарии")}
                    </MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue="Асц употреблять строго до еды"
                            isInput={false}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
            </ModalBody>
        </ModalContainer>
    );
};

export default ModalPrescription;
