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
    useGetStaticticsMedAgent,
    useGetUserInfo,
    useGetWorkplaces,
    useRegisterManager,
    useResetPasswordWithoutOldPassword
} from "../../../../utils/server/server.js";
import {useGetDistrcitById} from "../../../../utils/server/server.js";
import {useGetWorkplacesById} from "../../../../utils/server/server.js";
import log from "eslint-plugin-react/lib/util/log.js";
import PrimarySelect from "../../../../components/Generic/Select/Select.jsx";
import {
    transformDistrictsForSelect, transformRegionsForSelect, transformWorkplacesForSelect
} from "../../../../utils/transformRegionsForSelect.js";
import {ResetPassword, Section} from "@/pages/profile/admin/style.js";
import {message} from "antd";
import {Card, GridContainer, KvotaCard, KvotaContainer, PageContainer, SubTitle} from "./Style.js";

const ModalMedAgent = ({user, isOpen, onClose}) => {
    console.log("user", user);
    if (!user) return null; // yoki biror fallback UI chiqarish


    const [loading, setLoading] = useState(false)

    console.log("user", user)
    const {translate, language} = useLanguage();

    const {data: district, isLoading: isDistrictLoading} = useGetDistrcitById(user?.districtId);
    const {data: regions, isLoading: isRegionLoading} = useGetRegions();
    const {
        data: districts,
        isLoading: isDistrictsLoading
    } = useGetDistricts(district?.regionId);

    const {data: stat, isLoading: isStatLoading} = useGetStaticticsMedAgent(user?.userId || null);

    const regionsTranslate = transformRegionsForSelect(regions, language);
    const districtsTranslae = transformDistrictsForSelect(districts, language);

    const StatToArr = [{
        id: 1, title: translate("Connected_doctors_all"), value: stat?.allConnectedDoctors || null,
    }, {
        id: 2, title: translate("Connected_contracts_all"), value: stat?.allConnectedContracts || null,
    }, {
        id: 3, title: translate("Connected_doctors_month"), value: stat?.connectedDoctorsThisMonth || null,
    }, {
        id: 4, title: translate("Connected_contracts_month"), value: stat?.connectedContractsThisMonth || null,
    }, {
        id: 5, title: translate("written_recipes_month"), value: stat?.writtenRecipesThisMonth || null,
    }, {
        id: 6, title: translate("written_medicines_month"), value: stat?.writtenMedicinesThisMonth || null,
    }];

    const mutation = useResetPasswordWithoutOldPassword();
    const mutationDel = useDeleteUser();

    const ResetPasswordFunc = () => {
        setLoading(1);
        const requestData = {
            "phoneNumber": user?.number, "newPassword": user?.number
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
    return ((!user || isDistrictLoading || isRegionLoading || isDistrictsLoading || isStatLoading) ?
        <div className="loaderParent">
            <div className="loader"></div>
        </div> : <ModalContainer
            title={<ModalHeader>
                <Title>{translate("Мед_представители")}</Title>
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
            {loading ? <div className="loaderWindow">
                <div className="loader"></div>
            </div> : ""}
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
                        <EditableInput initialValue={user?.dateOfBirth} isInput={0} inputType="text"/>
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
                    <MiniTitleSmall>{translate("data_register")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput initialValue={user?.dateOfCreation?.split("T")[0]} isInput={0} inputType="text"/>
                    </ModalInnerSection>
                </ModalBodySection>
                <ModalBodySection>
                    <MiniTitleSmall>{translate("Контакты_врача")}</MiniTitleSmall>
                    <ModalInnerSection>
                        <EditableInput
                            isPhoneNumber={true}
                            initialValue={user?.number || ""}
                            value={user?.number}
                            onSave={e => console.log(e)}
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
                    columnCount={2}
                >
                    {StatToArr?.map((item, index) => (<Card key={item?.id}>
                        <p>{item?.title || "0"}</p>
                        <h2>{item?.value || "0"}</h2>
                    </Card>))}
                </GridContainer>
            </PageContainer>
            <ModalBodyHeader gridC={1}>
                <ModalBodySection>
                    <MiniTitleSmall
                        mgn={"0 auto"}
                    >{translate("deleted_doctor")}</MiniTitleSmall>
                    <DeleteBtn
                        onClick={DeleteUser}
                    >
                        {translate("delete_doctor")}
                    </DeleteBtn>
                </ModalBodySection>
            </ModalBodyHeader>
        </ModalContainer>);
};

export default ModalMedAgent;


// import React, { useState } from "react";
// import {
//   Container,
//   Header,
//   Grid,
//   Subtext,
//   Field,
//   Fotercontainer,
//   FooterButtons,
//   IMG,
//   ImgContainer,
//   HR,
//   PageContainer,
//   GridContainer,
//   Card,
//   SubTitle,
//   RemoveSection,
//   KvotaContainer,
//   KvotaCard,
//   ModalWidth,
// } from "./Style";
// import styled from "styled-components";
// import { Modal } from "antd";
// import ModalLogin from "./modalLogin";
// import GoalSection from "./GoalSection";
// import { modal1Data } from "./modalData";
// import { modal3data } from "./modalData";
//
// const StyledModal = styled(Modal)`
//   .ant-modal-content {
//     border-radius: 16px;
//     padding: 24px;
//     width: 900px;
//   }
// `;
//
// const ModalManager = ({ isOpen, onClose }) => {
//   const kvotadata = [
//     {
//       id: 1,
//       title: "Квота",
//       name: "500 000",
//     },
//     {
//       id: 2,
//       title: "Продажи",
//       name: "400 000",
//     },
//     {
//       id: 3,
//       title: "%",
//       name: "70%",
//     },
//   ];
//
//   return (
//     <ModalWidth
//       title="Modal 1"
//       open={isOpen}
//       onOk={onClose}
//       onCancel={onClose}
//       footer={null}
//     >
//       <Container>
//         <Header>Запрос на договор</Header>
//
//         <Grid>
//           <Field>
//             <p>Врач</p>
//             <ImgContainer>
//               <IMG
//                 src="data:image/png;base64,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"
//                 alt=""
//               />
//               <Subtext>{modal1Data.doctorName}</Subtext>
//             </ImgContainer>
//           </Field>
//           <Field>
//             <p>Место работы</p>
//             <Subtext>
//               {modal1Data.workplace} <i className="fa-solid fa-pen"></i>
//             </Subtext>
//           </Field>
//           <Field>
//             <p>Дата регистрации</p>
//             <Subtext>{modal1Data.registrationDate}</Subtext>
//           </Field>
//           <Field>
//             <p>Контакты врача</p>
//             <Subtext>
//               {modal1Data.contact} <i className="fa-solid fa-pen"></i>
//             </Subtext>
//           </Field>
//         </Grid>
//
//         <HR />
//
//         <ModalLogin />
//
//         <KvotaContainer>
//           {kvotadata.map((item) => (
//             <KvotaCard key={item.id}>
//               <p>{item.title}</p>
//               <h2>{item.name}</h2>
//             </KvotaCard>
//           ))}
//         </KvotaContainer>
//
//         <PageContainer>
//           <SubTitle>Выполнение KPI</SubTitle>
//
//           <GridContainer>
//             {modal3data.map((item, index) => (
//               <Card key={index}>
//                 <p>{item.title}</p>
//                 <h2>{item.value}</h2>
//               </Card>
//             ))}
//           </GridContainer>
//         </PageContainer>
//         <HR />
//
//         <GoalSection />
//
//         <HR />
//         <Fotercontainer>
//           <h2> Удаление мед. представилетя</h2>
//           <RemoveSection>
//             <button>Удалить мед. представилетя</button>
//           </RemoveSection>
//         </Fotercontainer>
//       </Container>
//     </ModalWidth>
//   );
// };
//
// export default ModalManager;
