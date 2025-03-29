import React, {useCallback, useMemo, useState} from "react";
import {
    DeleteBtn,
    ModalBodyHeader,
    ModalBodySection,
    ModalContainer,
    ModalHeader, SelectedMNNstyle,
    SelectedMNNstyleContainer
} from "../../../root/Modal.js";
import {MiniTitleSmall, Title} from "../../../root/style.js";
import CloseIcon from "../../../assets/svg/closeIcon.jsx";
import {useLanguage} from "../../../context/LanguageContext.jsx";
import {
    useAddDrugs, useAddMnn,
    useAddWorkplace, useDeleteMnn,
    useGetDistricts,
    useGetDoctorsFilter,
    useGetMnns,
    useGetRegions
} from "../../../utils/server/server.js";
import {
    transformDistrictsForSelect,
    TransformInsitutation,
    TransformMnns,
    transformRegionsForSelect,
    transformWorkplacesForSelect
} from "../../../utils/transformRegionsForSelect.js";
import PrimarySelect from "../../../components/Generic/Select/Select.jsx";
import Input2 from "../../../components/Generic/Input/Input2.jsx";
import {message} from "antd";
import {useQueryClient} from "@tanstack/react-query";
import {typePreparationForSelect, volumePreparationForSelect} from "../../../utils/Generics.js";
import {motion} from "framer-motion";
import DeleteIcon from "../../../assets/svg/DeleteIcon.jsx";
import DeleteIconBig from "../../../assets/svg/DeleteIconBig.jsx";

const AddMnn = ({open, setOpen}) => {
    const {translate, language} = useLanguage();
    const [formData, setFormData] = useState({})
    const [selectedMNNs, setSelectedMNNs] = useState([])
    const [loading, setLoading] = useState(0);
    const mutation = useAddDrugs()
    const {data: mnnsDb, isLoading: isLoadingMnns} = useGetMnns();
    console.log("mnnsDb", mnnsDb)

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        setFormData({
            ...formData, [name]: value,
        })
    };

    const queryClient = useQueryClient();

    const handleRefresh = () => {
        setLoading(1);
        queryClient.invalidateQueries(["Drugs"]); // Ma'lumotlarni qayta yuklash
        setTimeout(() => {
            setLoading(0);
        }, 100);
    };

    // --------------- DELETE MNN ------------------

    const mutationDeleteMnn = useDeleteMnn()
    const mutationAddMnn = useAddMnn()

    const DeleteMnn = (id) => {
        setLoading(1)
        mutationDeleteMnn.mutate(
            {
                MnnData: id,
                onSuccess: () => {
                    setLoading(0)
                },
                onError: () => {
                    setLoading(0)
                }
            }
        )
    }

    const AddMnn = () => {
        if (!formData?.addName) {
            return;
        }

        setLoading(1)
        mutationAddMnn.mutate(
            {
                name: formData?.addName,
                onSuccess: () => {
                    setFormData((prev) => ({
                        ...prev,
                        addName: "",  // INPUT TOZALANADI
                    }));
                    setLoading(0)
                },
                onError: () => {
                    setLoading(0)
                }
            }
        )
    }

    console.log("formData",formData)

    return <ModalContainer
        w={"1000px"}
        title={<ModalHeader>
            <Title>{translate("Добавить_МНН")}</Title>
            <div onClick={() => setOpen(false)} className="closeIcon">
                <CloseIcon/>
            </div>
        </ModalHeader>}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[]}
        centered
    >
        {loading || isLoadingMnns ? (<div className="loaderWindow">
            <div className="loader"></div>
        </div>) : ""}
        <ModalBodyHeader gridC={1}>
            <ModalBodySection fd={"row"}>
                <Input2
                    type="text"
                    name="addName"
                    deffvalue={formData.addName}
                    onChange={handleChange}
                    placeholder={translate("Напишите_название_MNN")}
                    style={{flex: "6"}}
                />
                <div
                    style={{flex: "1"}}
                >
                    <DeleteBtn
                        bgcolor={"#216BF4"}
                        onClick={AddMnn}
                        BorderRadius={"10px"}
                    >
                        {translate("Добавить_МНН")}
                    </DeleteBtn>
                </div>
            </ModalBodySection>
        </ModalBodyHeader>
        <ModalBodyHeader gridC={1}>
            <MiniTitleSmall
            >
                {translate("List_of_inns")}
            </MiniTitleSmall>
            <Input2
                type="text"
                name="Searchname"
                value={formData?.Searchname}
                onChange={handleChange}
                placeholder={translate("mnn_search")}
            />
            <SelectedMNNstyleContainer>
                {mnnsDb?.length > 0 && (
                    <>
                        {mnnsDb.map((mNn) =>
                                mNn?.name?.toLowerCase()?.includes(formData?.Searchname?.toLowerCase() || "") && (
                                    <motion.div
                                        key={mNn.id}
                                        initial={{opacity: 0, scale: 0.1}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.8}}
                                        transition={{duration: 0.3}}
                                    >
                                        <SelectedMNNstyle >
                                            <div className="text">{mNn?.name}</div>
                                            <div onClick={() => DeleteMnn(mNn?.id)} className={"closeIcon"}>
                                                <DeleteIconBig/>
                                            </div>
                                        </SelectedMNNstyle>
                                    </motion.div>
                                )
                        )}
                    </>
                )}
            </SelectedMNNstyleContainer>
        </ModalBodyHeader>


    </ModalContainer>
};

export default AddMnn;


{/*<ModalBodyHeader gridC={1}>*/}
{/*    <ModalBodySection>*/}
{/*        <DeleteBtn*/}
{/*            bgcolor={"#216BF4"}*/}
{/*            onClick={SendData}*/}
{/*        >*/}
{/*            {translate("Добавить_препорат")}*/}
{/*        </DeleteBtn>*/}
{/*    </ModalBodySection>*/}
{/*</ModalBodyHeader>*/}

// <ModalBodyHeader m={"20px"}>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Область")}</MiniTitleSmall>
//     <PrimarySelect
//         def={translate("Область")}
//         options={translateRegions}
//         onlyOption={1}
//         onValueChange={(value) => handleSelectChange("region", value.id)}
//         selectedType={"id"}
//     />
//   </ModalBodySection> <ModalBodySection>
//   <MiniTitleSmall>{translate("Район")}</MiniTitleSmall>
//   <PrimarySelect
//       def={translate("Район")}
//       options={translateDIstricts}
//       onlyOption={1}
//       onValueChange={(value) => handleSelectChange("district", value?.districtId)}
//       selectedType={"districtId"}
//   />
// </ModalBodySection>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Форма_учреждения")}</MiniTitleSmall>
//     <PrimarySelect
//         def={translate("Форма_учреждения")}
//         options={translateInsitution}
//         onlyOption={1}
//         onValueChange={(value) => handleSelectChange("medicalInstitutionType", value?.key)}
//         selectedType={"id"}
//     />
//   </ModalBodySection>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Глав_Врач")}</MiniTitleSmall>
//     <PrimarySelect
//         def={translate("Глав_Врач")}
//         options={doctorOptions}
//         onlyOption={1}
//         onValueChange={(value) => handleSelectChange("chiefDoctorId", value?.id)}
//         selectedType={"id"}
//     />
//   </ModalBodySection>
//
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Название_организации")}</MiniTitleSmall>
//     <Input2
//         type="text"
//         name="name"
//         value={formData?.address}
//         onChange={handleChange}
//         placeholder={translate("Название_организации")}
//     />
//   </ModalBodySection>
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Адресс")}</MiniTitleSmall>
//     <Input2
//         type="text"
//         name="address"
//         value={formData?.address}
//         onChange={handleChange}
//         placeholder={translate("address_template")}
//     />
//   </ModalBodySection>
//
//   <ModalBodySection>
//     <MiniTitleSmall>{translate("Телефон")}</MiniTitleSmall>
//     <div className={"number-login"}>
//       <Input2
//           name="phone"
//           className={"countryCode"} disabled
//           placeholder={translate("+998")}
//       />
//       <Input2
//           type="number"
//           name="phone"
//           value={formData?.phone}
//           onChange={handleChange}
//           placeholder={translate("900000000")}
//       />
//     </div>
//   </ModalBodySection>
//
//
//   <ModalBodySection>
//
//     <MiniTitleSmall>{translate("Почта")}</MiniTitleSmall>
//     <Input2
//         type="email"
//         name="email"
//         value={formData?.email}
//         onChange={handleChange}
//         placeholder={translate("email_temp")}
//     />
//   </ModalBodySection>
//
// </ModalBodyHeader>
