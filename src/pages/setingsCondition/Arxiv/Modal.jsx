import React, {useState} from "react";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import {
    ModalBodyHeader,
    ModalBodySection,
    ModalContainer,
    ModalHeader,
    ModalInnerSection, ModalUserProfilePicture
} from "../../../root/Modal.js";
import {MiniTitleSmall, Title, TitleBlue} from "../../../root/style.js";
// import {} from "../../../rolls/manager/reportsClient/Modal/style.js";
import {Item, TableRow, TableStyled} from "../../../rolls/manager/reportsManager/Modal/style.js";
import ProfilePic1 from "../../../assets/img/profile/profile2.svg";
import EditableInput from "../../../components/Generic/EditableInput/EditableInput.jsx";
import {formatPhoneNumber} from "../../../utils/PhoneFormatter.js";

const ModalContract = ({contract, isOpen, onClose}) => {
    if (!contract?.id) return null;
    const [loading, setLoading] = useState(false)
    const {translate, language} = useLanguage();

    const row = contract

    console.log("Currrent",row)

    return (!contract?.id || loading) ?
        <div className="loaderParent">
            <div className="loader"></div>
        </div> :
        <ModalContainer
            title={<ModalHeader>
                <Title>{translate("Договоры")} №{contract?.id} </Title>
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
            </ModalHeader>}
            open={isOpen}
            onOk={onClose}
            onCancel={onClose}
            footer={[]}
            centered
        >

            {/*------ DOCTOR INFO */}
            <ModalBodyHeader>
                {/*------ DOCTOR FULL NAME*/}
                <ModalBodySection>
                    <MiniTitleSmall>{translate("Врач")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <ModalUserProfilePicture pic={ProfilePic1}/>
                        <EditableInput
                            initialValue={row?.doctor ? `${row?.doctor.firstName ?? ""} ${row?.doctor.lastName ?? ""}` : "Noma'lum"}
                            isInput={0}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
                {/*------ DOCTOR WORKPLACE */}
                <ModalBodySection>
                    <MiniTitleSmall>{translate("Место_работы")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue={row?.doctor ?
                                `${row?.doctor?.regionDistrictDTO?.[`regionName${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")},
                                    ${row?.doctor?.regionDistrictDTO?.[`districtName${language === "ru" ? "Russian" : language === "uz" ? "UzLatin" : ""}`] || translate("NONE")},
                                    ${row?.doctor?.workPlaceDTO?.address || translate("NONE")}                                    `
                                : "Noma'lum"}
                            isInput={0}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
                {/*------ Data Register */}
                <ModalBodySection>
                    <MiniTitleSmall>{translate("data_register")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput initialValue={row?.doctor?.dateOfCreation?.split("T")[0]} isInput={0}
                                       inputType="text"/>
                    </ModalInnerSection>
                </ModalBodySection>
                {/*------ Contact Doctor */}
                <ModalBodySection>
                    <MiniTitleSmall>{translate("Контакты_врача")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            initialValue={formatPhoneNumber(row?.doctor?.number) || ""}
                            isInput={0}
                        />
                    </ModalInnerSection>
                </ModalBodySection>
            </ModalBodyHeader>

            {/*------ Contract Type */}
            <ModalBodyHeader gap={"10px"} gridC={1} m={"40px"}>
                <ModalBodySection height={"50px"} >
                    <TitleBlue>{translate("Условие_работы")}: {translate(contract?.contractType)}</TitleBlue>
                </ModalBodySection>
            </ModalBodyHeader>

            {/*------ TABLE */}
            <ModalBodyHeader m={"40px"} gridC={1}>

                <TableStyled>
                    <tr>
                        <th className={"left"}>{translate("Препарат")}</th>
                        <th>{translate("квота")}</th>
                        <th>{translate("Выписано")}</th>
                        <th>{translate("RECIPE")}</th>
                        <th>{translate("SU")}</th>
                        <th>{translate("SB")}</th>
                        <th>{translate("GZ")}</th>
                        <th>{translate("KZ")}</th>
                    </tr>
                    {
                        contract?.medicinesWithQuantities?.map(({quote,contractMedicineAmount,medicine: v}) => {

                            console.log("vvvvvv",v)
                            return <TableRow key={v?.id} background={"#F7F8FC"}>

                                <Item className={"left"}>
                                   <span style={{marginRight: "10px"}}>
                                       {
                                           v?.id
                                       }
                                   </span>
                                    {
                                        language == "ru" ? v?.["nameRussian"]
                                            : language == "uz" ? v?.["nameUzLatin"] : v?.["name"]

                                    }
                                </Item>
                                <Item>
                                    {
                                        quote
                                    }
                                </Item>
                                <Item>
                                    {
                                        contractMedicineAmount?.amount
                                    }
                                </Item>
                                <Item>
                                    {
                                        v?.prescription ?  v?.prescription : "-"
                                    }
                                </Item>
                                <Item>
                                    {
                                        v?.suBall ? v?.suBall : "-"
                                    }
                                </Item>
                                <Item>
                                    {
                                        v?.sbBall ? v?.sbBall : "-"
                                    }
                                </Item>
                                <Item>
                                    {
                                        v?.gzBall ? v?.gzBall : "-"
                                    }
                                </Item>
                                <Item>
                                    {
                                        v?.kbBall ? v?.kbBall : "-"
                                    }
                                </Item>
                            </TableRow>
                        })
                    }

                </TableStyled>
            </ModalBodyHeader>

        </ModalContainer>
};

export default ModalContract;
