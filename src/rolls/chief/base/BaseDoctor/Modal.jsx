import React, {useState} from "react";
import {
    DeleteBtn,
    ModalBodyHeader,
    ModalBodySection, ModalButtons,
    ModalContainer,
    ModalHeader,
    ModalInnerSection,
    ModalUserProfilePicture,
} from "../../../../root/Modal.js";
import {MiniTitleSmall, Title} from "../../../../root/style.js";
import EditableInput from "../../../../components/Generic/EditableInput/EditableInput.jsx";
import {useLanguage} from "../../../../context/LanguageContext.jsx";
import ProfilePic1 from "../../../../assets/img/profile/profile2.svg";
import {
    useDeleteUser,
    useGetDistricts, useGetDoctorContract,
    useGetRegions,
    useGetUserInfo,
    useGetWorkplaces,
    useRegisterManager, useResetPasswordWithoutOldPassword
} from "../../../../utils/server/server.js";
import {useGetDistrcitById} from "../../../../utils/server/server.js";
import {useGetWorkplacesById} from "../../../../utils/server/server.js";
import log from "eslint-plugin-react/lib/util/log.js";
import PrimarySelect from "../../../../components/Generic/Select/Select.jsx";
import {
    transformDistrictsForSelect,
    transformRegionsForSelect,
    transformWorkplacesForSelect
} from "../../../../utils/transformRegionsForSelect.js";
import {ResetPassword, Section} from "@/pages/profile/admin/style.js";
import {message} from "antd";
import {Highlight, InfoWrapper, Item, TitleSmall} from "../../../manager/style.js";
import ArrowUpSelect from "../../../../assets/svg/ArrowUpSelect.jsx";
import ArrowDownSelect from "../../../../assets/svg/ArrowDownSelect.jsx";
import {AnimatePresence, motion} from "framer-motion";

const ModalDoctor = ({user, isOpen, onClose}) => {
    if (!user) return null;


    const [loading, setLoading] = useState(false)

    console.log("user", user)
    const {translate, language} = useLanguage();

    const {data: district, isLoading: isDistrictLoading} = useGetDistrcitById(
        user?.districtId
    );

    const {data: regions, isLoading: isRegionLoading} = useGetRegions(
        )
    ;
    const {data: districts, isLoading: isDistrictsLoading} = useGetDistricts(district?.regionId);
    const {data: doctorContract, isLoading: isLoadingDoctorContract} = useGetDoctorContract(user?.userId);
    const {data: workplaces, isLoading: isWorkplacesLoading} = useGetWorkplaces({
        regionId: district?.regionId || null,
        districtId: district?.districtId || null,
    });
    const regionsTranslate = transformRegionsForSelect(regions, language);
    const districtsTranslae = transformDistrictsForSelect(districts, language);
    const WorkplacesTranslate = transformWorkplacesForSelect(workplaces, language);


    const [inDetail, setInDetail] = useState(false);
    const [editContract, setEditContract] = useState(false);


    const mutation = useResetPasswordWithoutOldPassword();
    const mutationDel = useDeleteUser();

    console.log("doctorContract", doctorContract)

    const ResetPasswordFunc = () => {
        setLoading(1);
        const requestData = {
            "phoneNumber": user?.number,
            "newPassword": user?.number
        }
        mutation.mutate({
            requestData: requestData, onSuccess: () => {
                message.success(translate("password_reseted") + user?.number);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }, onError: () => {
                setLoading(false);
                message.error(translate("password_reset_error"));
            },
        });
    }

    const DeleteUser = () => {
        setLoading(1);
        const requestData = {
            userId: user.userId
        }
        mutationDel.mutate({
            requestData: requestData, onSuccess: () => {
                message.success(translate("user_delete"));
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }, onError: () => {
                setLoading(false);
                message.error(translate("user_delete_error"));
            },
        });
        onClose()
    }
    console.log("user", user,);
    console.log("workplaces", workplaces,);


    const modalVariants = {
        hidden: {opacity: 0, y: -20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.3}},
        exit: {opacity: 0, y: -20, transition: {duration: 0.2}},
    };

    const handleEditContract = () => {
        setInDetail(true);
        setEditContract(!editContract);
    }

    return (
        (!user || isDistrictLoading || isRegionLoading || isDistrictsLoading || isWorkplacesLoading) ?
            <div className="loaderParent">
                <div className="loader"></div>
            </div>
            : <ModalContainer
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
                {loading ?
                    <div className="loaderWindow">
                        <div className="loader"></div>
                    </div>
                    : ""}
                <ModalBodyHeader>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Fullname")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <ModalUserProfilePicture pic={ProfilePic1}/>
                            <EditableInput
                                initialValue={user ? `${user.firstName ?? ""} ${user.lastName ?? ""} ${user.middleName ?? ""}` : "Noma'lum"}
                                isInput={0}/>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Регион")}</MiniTitleSmall>
                        <ModalInnerSection gap={"2px"}>
                            <PrimarySelect
                                def={""}
                                options={regionsTranslate}
                                onlyOption={1}
                                className={"select-left-border maxwidth"}
                                selectedOptionId={district?.regionId}
                                selectedType={"id"}
                                onValueChange={(value) => console.log("workplace", value)}
                            />
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("data_register")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput initialValue={user?.dateOfCreation?.split("T")[0]} isInput={0} inputType="text"/>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Район")}</MiniTitleSmall>
                        <ModalInnerSection gap={"2px"}>
                            <PrimarySelect
                                def={""}
                                options={districtsTranslae || []}
                                onlyOption={1}
                                selectedOptionId={district?.districtId}
                                selectedType={"distric"}
                                className={"select-middle-border maxwidth"}
                                onValueChange={(value) => console.log("workplace", value)}
                            />
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Дата_рождения")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput initialValue={user?.dateOfBirth} isInput={0} inputType="text"/>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Место_работы")}</MiniTitleSmall>
                        <ModalInnerSection gap={"2px"}>
                            <PrimarySelect
                                def={""}
                                options={WorkplacesTranslate || []}
                                selectedOptionId={user?.workplaceId}
                                selectedType={"id"}
                                className={"select-right-border maxwidth"}
                                onlyOption={1}
                                onValueChange={(value) => console.log("workplace", value)}
                            />
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Контакты_врача")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput
                                isPhoneNumber={true}
                                initialValue={user?.number || ""}
                                value={user?.number}
                                onSave={e =>
                                    console.log(e)
                                }
                            />
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Логин")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput initialValue={`${user?.number}`} isInput={0} inputType="text"/>
                        </ModalInnerSection>
                    </ModalBodySection>
                    {
                        user?.email ? <ModalBodySection>
                                <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
                                <ModalInnerSection>
                                    <EditableInput initialValue={user?.email} isInput={0} inputType="text"/>
                                </ModalInnerSection>
                            </ModalBodySection>
                            : ""
                    }
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Специализация")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput initialValue={translate(user?.fieldName)} isInput={0} inputType="text"
                                           isEditable={false}/>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Статус")}</MiniTitleSmall>
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


                <ModalBodyHeader gridC={1}>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Сбросить_пароль")}</MiniTitleSmall>
                        <ResetPassword
                            mt={"0px"}
                            ResetPassword pad={"none"}
                            onClick={() => ResetPasswordFunc()}
                        >
                            {translate("get_new_pass")}
                        </ResetPassword>
                    </ModalBodySection>
                </ModalBodyHeader>

                <ModalBodyHeader

                    m={"20px"}
                    mb={"20px"}
                    gridC={1}
                >
                    {
                        doctorContract ?

                            inDetail ? <ModalButtons
                                    onClick={() => setInDetail(!inDetail)}
                                    gap={"2px"}
                                >
                                    {translate("Подробнее")} <ArrowUpSelect/>
                                </ModalButtons>
                                : <ModalButtons
                                    gap={"2px"}
                                    onClick={() => setInDetail(!inDetail)}
                                >
                                    {translate("Подробнее")} <ArrowDownSelect/>
                                </ModalButtons>

                            : ""
                    }
                </ModalBodyHeader>

                <AnimatePresence>

                    {
                        inDetail ? doctorContract ?
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={modalVariants}
                                >

                                    <ModalBodyHeader gridC={2}>
                                        {
                                            doctorContract?.contractedMedicineWithQuantity?.length > 0 ?
                                                editContract ?
                                                    <InfoWrapper
                                                        bg={'#F7F8FC'}
                                                    >
                                                        <TitleSmall size={"18px"}>
                                                            {translate("contract_doctor_paket")}
                                                        </TitleSmall>
                                                        {doctorContract?.contractedMedicineWithQuantity?.map((v) => {
                                                            const percentage = (v?.contractMedicineAmount?.amount || 0 / v?.quote || 0) * 100;

                                                            return <Item bg={"white"} className="itemInner">
                                                                <Highlight foiz={`${percentage.toFixed(2)}%`}/>
                                                                <TitleSmall
                                                                    size={"12px"}>{translate(v?.medicine?.name)}</TitleSmall>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        userSelect: "none",
                                                                        gap: "10px",
                                                                    }}
                                                                >
                                                                    {v?.quote}
                                                                    <svg
                                                                        width="18"
                                                                        height="18"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            opacity="0.5"
                                                                            d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                                                                            fill="#216BF4"
                                                                        />
                                                                        <path
                                                                            d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                                                                            fill="#216BF4"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </Item>
                                                        })}
                                                    </InfoWrapper>
                                                    :
                                                    <InfoWrapper
                                                        bg={'#F7F8FC'}
                                                    >
                                                        <TitleSmall size={"18px"}>
                                                            {translate("contract_doctor_paket")}
                                                        </TitleSmall>
                                                        {doctorContract?.contractedMedicineWithQuantity?.map((v) => {
                                                            const percentage = (v?.contractMedicineAmount?.amount || 0 / v?.quote || 0) * 100;

                                                            return <Item bg={"white"} className="itemInner">
                                                                <Highlight foiz={`${percentage.toFixed(2)}%`}/>
                                                                <TitleSmall
                                                                    size={"12px"}>{translate(v?.medicine?.name)}</TitleSmall>
                                                                <TitleSmall
                                                                    size={"12px"}>{v?.contractMedicineAmount?.amount || 0} из {v?.quote || 0}</TitleSmall>
                                                            </Item>
                                                        })}
                                                    </InfoWrapper>
                                                :
                                                ""
                                        }
                                        {
                                            doctorContract?.outOfContractMedicineAmount?.length > 0 ?
                                                <InfoWrapper>
                                                    <TitleSmall size={"18px"}>
                                                        {translate("OutOfContractDoctor")}
                                                    </TitleSmall>
                                                    {doctorContract?.outOfContractMedicineAmount?.map((v) => {
                                                        // const percentage = (v?.contractMedicineAmount?.amount || 0 / v?.quote || 0) * 100;
                                                        const percentage = 0 * 100;

                                                        return <Item className="itemInner">
                                                            <Highlight foiz={`${percentage.toFixed(2)}%`}/>
                                                            <TitleSmall
                                                                size={"12px"}>{translate(v?.medicine?.name)}</TitleSmall>
                                                            <TitleSmall
                                                                size={"12px"}>{v?.amount || 0} </TitleSmall>
                                                        </Item>
                                                    })}
                                                </InfoWrapper>
                                                :
                                                ""
                                        }
                                    </ModalBodyHeader>
                                </motion.div>

                                :
                                <ModalBodyHeader>
                                    <TitleSmall size={"18px"}>
                                        {translate("no_contract_doctor")}
                                        {/*{translate("Заключение договоров")}*/}
                                    </TitleSmall>
                                </ModalBodyHeader>
                            : ""
                    }
                </AnimatePresence>


                <ModalBodyHeader
                    m={"40px"}
                    gridC={1}

                >
                    <ModalButtons
                    >
                        {/*<MiniTitleSmall*/}
                        {/*    mgn={"0 auto"}*/}
                        {/*>{translate("deleted_doctor")}</MiniTitleSmall>*/}
                        {
                            doctorContract ? editContract ? <DeleteBtn
                                        bgcolor="#F7F8FC"
                                        color={"#000"}
                                        className={"btn"}
                                        onClick={handleEditContract}
                                    >
                                        Сохранить
                                    </DeleteBtn>
                                    : <DeleteBtn
                                        bgcolor="#F7F8FC"
                                        color={"#000"}
                                        className={"btn"}
                                        onClick={handleEditContract}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.5"
                                                d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                                                fill="#216BF4"
                                            />
                                            <path
                                                d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                                                fill="#216BF4"
                                            />
                                        </svg>
                                        {translate("edit_contract")}
                                    </DeleteBtn>
                                : ""
                        }
                        <DeleteBtn
                            className={"btn"}
                            onClick={DeleteUser}
                        >
                            {translate("delete_doctor")}
                        </DeleteBtn>
                    </ModalButtons>
                </ModalBodyHeader>


            </ModalContainer>
    );
};

export default ModalDoctor;
