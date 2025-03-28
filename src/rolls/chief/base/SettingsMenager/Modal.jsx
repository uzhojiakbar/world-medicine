import React, {useState} from "react";
import {
    DeleteBtn,
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
import {
    useDeleteUser,
    useGetDistricts,
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
import {Card, GridContainer, KvotaCard, KvotaContainer, SubTitle} from "../SettingsMedAgent/Style.js";
import {PageContainer} from "./Style.js";

const ModalManager = ({user, isOpen, onClose}) => {
    console.log("user", user);
    if (!user) return null; // yoki biror fallback UI chiqarish


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
    const {data: workplaces, isLoading: isWorkplacesLoading} = useGetWorkplaces({
        regionId: district?.regionId || null,
        districtId: district?.districtId || null,
    });
    const regionsTranslate = transformRegionsForSelect(regions, language);
    const districtsTranslae = transformDistrictsForSelect(districts, language);
    const WorkplacesTranslate = transformWorkplacesForSelect(workplaces, language);
    const mutation = useResetPasswordWithoutOldPassword();
    const mutationDel = useDeleteUser();

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

    const StatToArr = [
        {
            id: 1, title: translate("base_doctor"), value: 0 || null,
        },
        {
            id: 2, title: translate("Кол_Рецептов_Всего"), value: 0 || null,
        },
        {
            id: 3, title: translate("Кол_Рецептов_Новых"), value: 0 || null,
        },
        {
            id: 4, title: translate("Всего_работающих"), value: 0 || null,
        },
        {
            id: 5, title: translate("Кол_препоратов_Всего"), value: 0 || null,
        },
        {
            id: 6, title: translate("Кол_препоратов_Новых"), value: 0 || null,
        },
        {
            id: 7, title: translate("Кол_препоратов_месяц"), value: 0 || null,
        },
        {
            id: 8, title: translate("Охват_Районов"), value: 0 || null,
        },
        {
            id: 9, title: translate("Охват_ЛПУ"), value: 0 || null,
        },
    ];

    return (
        (!user || isDistrictLoading || isRegionLoading || isDistrictsLoading || isWorkplacesLoading) ?
            <div className="loaderParent">
                <div className="loader"></div>
            </div>
            : <ModalContainer
                title={
                    <ModalHeader>
                        <Title>{translate("Менеджер")}</Title>
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
                        <MiniTitleSmall>{translate("entity_contacts")}</MiniTitleSmall>
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
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput initialValue={user?.email} isInput={0} inputType="text"/>
                        </ModalInnerSection>
                    </ModalBodySection>
                    <ModalBodySection>
                        <MiniTitleSmall>{translate("Специализация")}</MiniTitleSmall>
                        <ModalInnerSection>
                            <EditableInput initialValue={translate(user?.fieldName)} isInput={0} inputType="text"
                                           isEditable={false}/>
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
                <ModalBodyHeader gridC={1}>
                    <KvotaContainer>
                        <KvotaCard key={1}>
                            <p>{"Квота"}</p>
                            <h2>{"500 000"}</h2>
                        </KvotaCard>
                        <KvotaCard key={1}>
                            <p>{"Продажи"}</p>
                            <h2>{"400 000"}</h2>
                        </KvotaCard>
                        <KvotaCard key={1}>
                            <p>{"%"}</p>
                            <h2>{"70%"}</h2>
                        </KvotaCard>
                    </KvotaContainer>
                </ModalBodyHeader>

                <PageContainer>
                    <SubTitle>Выполнение KPI</SubTitle>

                    <GridContainer
                        columnCount={3}
                    >
                        {StatToArr?.map((item, index) => (<Card key={item?.id}>
                            <p>{item?.title || "title"}</p>
                            <h2>{item?.value || "0"}</h2>
                        </Card>))}
                    </GridContainer>
                </PageContainer>

                <ModalBodyHeader gridC={1}>
                    <ModalBodySection>
                        <MiniTitleSmall
                            mgn={"0 auto"}
                        >{translate("delete_manager")}</MiniTitleSmall>
                        <DeleteBtn
                            onClick={DeleteUser}
                        >
                            {translate("delete_manager")}
                        </DeleteBtn>
                    </ModalBodySection>
                </ModalBodyHeader>
            </ModalContainer>
    );
};

export default ModalManager;
