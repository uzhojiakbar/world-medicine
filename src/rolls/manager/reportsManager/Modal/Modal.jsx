// import { Title } from "../../../../root/style";
import {
    ModalOverlay,
    ModalContainer,
    FilterContainer,
    Select,
    StatsContainer,
    Stat,
    TableStyled,
    TableRow,
    CloseButton,
    Item,
    Title,
    ChangeRow,
    IconChange,
    InputWrapper,
    Wrapp
} from "./style"
import PrimarySelect from "../../../../components/Generic/Select/Select"
import {useLanguage} from "../../../../context/LanguageContext";
import {useEffect, useState} from "react";
import Input2 from "../../../../components/Generic/Input/Input2";
import {Tumanlar} from "../../../../mock/data";
import {formatPhoneNumber} from "../../../../utils/PhoneFormatter.js";
import Instance from "../../../../utils/Instance.js";

const tableData = [
    {
        id: 1,
        data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
        highlight: true,
        colors: {
            iconcolor: "#FB3748",
            textcolor: "black",
        },
    },
    {
        id: 1,
        data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"],
        highlight: true,
        colors: {
            bgcolorr: "#FFDB43",
            textcolor: "black",
            iconcolor: "#216BF4",
        },
    },
    {
        id: 1,
        data: ["Артрокол р-р д/ин амп.10мг/2мл №5", "XX", "XX", "XX"],
        highlight: true,
        colors: {
            bgcolorr: "#FB3748",
            iconbgcolor: "#e1858d",
            iconcolor: "white",
            textcolor: "white",
        },
    },
];

const UsloviyaModal = ({
                           onclose = () => {
                           }, id = 0, thead = [], data = [],
                           selectedID,
                       }) => {
    if (data.length) {
        data = tableData
    }

    console.log("selectedID",selectedID)

    const {translate} = useLanguage();
    const [filterData, setFilterData] = useState({})
    const [change, setChange] = useState(false)
    const [writtenAll, setWrittenAll] = useState(0)
    const [editCorrection, setEditCorrection] = useState({});
    const [modalId, setModalId] = useState(id);



    const [ids, setIds] = useState({...id})

    useEffect(() => {
        if (id) {
            setModalId(id);
        }
    }, [id]);


    useEffect(() => {
        if (!modalId?.doctorReportListDTOList) return;

        const totalWritten = modalId?.doctorReportListDTOList.reduce((sum, row) => {
            const medicine = row?.contractDTO?.medicinesWithQuantities?.find(
                (med) => med.medicineId === selectedID
            );
            return sum + (medicine?.contractMedicineAmount.amount || 0);
        }, 0);

        setWrittenAll(totalWritten);
    }, [id,modalId, selectedID]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFilterData((filterData) => ({
            ...filterData,
            [name]: value, // formData ichidagi qiymatni yangilash
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleSelectChange = ([name, value]) => {
        setFilterData((filterData) => ({
            ...filterData,
            [name]: value, // select uchun tanlangan qiymatni saqlash
        }));
    };
    const handleVipasanoChange = (name, value) => {
        setChange({...change, [name]: value})
    }

    const handleSave = async (row) => {
        try {
            const updatedCorrection = editCorrection[row.contractDTO.id] || row?.contractDTO?.medicinesWithQuantities?.find(med => med.medicineId === selectedID)?.correction;
            const quantityId = row?.contractDTO?.medicinesWithQuantities?.find(med => med.medicineId === selectedID)?.quantityId;

            console.log("row", row);
            console.log("updatedCorrection", updatedCorrection);
            console.log("URLLLL", `/v1/report/correction/${quantityId}?correction=${updatedCorrection}`);

            const res = await Instance.put(`/v1/report/correction/${quantityId}?correction=${updatedCorrection}`);

            console.log("REEEEEEED", res);
            console.log("Saqlangan correction:", updatedCorrection);

            // **modalId ichidagi correction ni yangilash**
            setModalId((prevModalId) => ({
                ...prevModalId,
                doctorReportListDTOList: prevModalId.doctorReportListDTOList.map((item) =>
                    item.contractDTO.id === row.contractDTO.id
                        ? {
                            ...item,
                            contractDTO: {
                                ...item.contractDTO,
                                medicinesWithQuantities: item.contractDTO.medicinesWithQuantities.map((med) =>
                                    med.medicineId === selectedID
                                        ? { ...med, correction: updatedCorrection }
                                        : med
                                ),
                            },
                        }
                        : item
                ),
            }));

            // O'zgarishlarni tozalash
            setChange(null);
            setEditCorrection({});
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    console.log("MODALDATA", ids)
    return (
        <ModalOverlay open={id}
                      onOk={() => onclose()}
                      onCancel={() => onclose(false)}
                      footer={[]}
                      centered>
            <ModalContainer>
                <div>
                    <Title size="24px">{translate("Поиск выписок по фильтрам")}</Title>
                    <CloseButton onClick={() => onclose(false)}>
                        <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5"
                                  d="M28.3337 16.4993C28.3337 23.3108 22.8118 28.8327 16.0003 28.8327C9.18881 28.8327 3.66699 23.3108 3.66699 16.4993C3.66699 9.68783 9.18881 4.16602 16.0003 4.16602C22.8118 4.16602 28.3337 9.68784 28.3337 16.4993Z"
                                  stroke="#808080" stroke-width="2"/>
                            <path
                                d="M11.9599 12.4589C12.3504 12.0684 12.9836 12.0684 13.3741 12.4589L16.0003 15.0852L18.6266 12.4589C19.0171 12.0684 19.6502 12.0684 20.0407 12.4589C20.4313 12.8495 20.4313 13.4826 20.0407 13.8732L17.4146 16.4993L20.0407 19.1255C20.4313 19.516 20.4313 20.1492 20.0407 20.5397C19.6502 20.9303 19.017 20.9303 18.6265 20.5397L16.0003 17.9136L13.3742 20.5397C12.9836 20.9303 12.3504 20.9303 11.9599 20.5397C11.5694 20.1492 11.5694 19.5161 11.9599 19.1256L14.5862 16.4993L11.9599 13.8731C11.5694 13.4826 11.5694 12.8494 11.9599 12.4589Z"
                                fill="#808080"/>
                        </svg>
                    </CloseButton>
                </div>
                <FilterContainer>
                    <Input2
                        type={"text"}
                        placeholder={translate("Ф.И.О")}
                        onChange={handleChange}
                        name="fullName"
                    />
                    <PrimarySelect
                        def={translate("Район")}
                        options={Tumanlar["Наманган"]}
                        onValueChange={(value) => handleSelectChange(["city", value])}
                    />
                    <PrimarySelect
                        def={translate("ЛПУ")}
                        options={Tumanlar["Наманган"]}
                        onValueChange={(value) => handleSelectChange(["ЛПУ", value])}
                    />
                    <PrimarySelect
                        def={translate("Специальность")}
                        options={Tumanlar["Наманган"]}
                        onValueChange={(value) => handleSelectChange(["city", value])}
                    />
                </FilterContainer>

                <StatsContainer>
                    <Stat>
                        <p>Дозволено</p>
                        <p>{id?.allowed}</p>
                    </Stat>
                    <Stat>
                        <p>Выписано</p>
                        <p>{writtenAll}</p>
                    </Stat>
                    <CloseButton onClick={() => onclose(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="3 0 40 40" fill="none">
                            <path opacity="0.5"
                                  d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                                  stroke="#808080" stroke-width="2"/>
                            <path
                                d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                                fill="#808080"/>
                        </svg>

                    </CloseButton>
                </StatsContainer>

                <TableStyled>
                    {/* <thead> */}
                    <tr>
                        {thead.map((v, i) => (
                            <th key={v}>
                                {v}
                            </th>
                        ))}
                    </tr>
                    {/* </thead> */}
                    {/* <tbody> */}

                    {
                        modalId?.doctorReportListDTOList?.length > 0 ?
                            modalId?.doctorReportListDTOList?.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                <Item>
                                    {row?.doctor?.firstName} {" "}
                                    {row?.doctor?.lastName} {" "}
                                    {row?.doctor?.middleName}
                                </Item>
                                <Item>
                                    {row?.contractDTO?.regionDistrictDTO?.districtName} {" "}
                                </Item>
                                <Item>
                                    {row?.doctor?.workPlaceDTO?.address} {" "}
                                </Item>
                                <Item>
                                    {translate(row?.doctor?.fieldName)} {" "}
                                </Item>
                                <Item>
                                    {formatPhoneNumber(row?.doctor?.number)} {" "}
                                </Item>
                                <Item>
                                    {row?.contractDTO?.medicinesWithQuantities?.find(med => med.medicineId === selectedID)?.quote || "N/A"}
                                    {/*40*/}
                                </Item>
                                <Item className={"edit"}>
                                    {change !== row?.contractDTO?.id ? (
                                        <ChangeRow>
                                            {row?.contractDTO?.medicinesWithQuantities?.find(med => med.medicineId === selectedID)?.correction || "N/A"}
                                            <IconChange>
                                                <div onClick={() => setChange(row?.contractDTO?.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                                         viewBox="0 0 12 12" fill="none">
                                                        <path opacity="0.5"
                                                              d="M10.4243 4.35653C11.1922 3.58868 11.1922 2.34374 10.4243 1.57589C9.6565 0.808036 8.41155 0.808036 7.6437 1.57589L7.2002 2.01941C7.20625 2.03775 7.21255 2.05634 7.2191 2.07518C7.38165 2.54375 7.6884 3.15801 8.2654 3.73501C8.8424 4.31202 9.45665 4.61875 9.92525 4.78131C9.944 4.78782 9.9625 4.79409 9.98075 4.80013L10.4243 4.35653Z"
                                                              fill="black"/>
                                                        <path
                                                            d="M7.2193 2L7.2002 2.01909C7.20625 2.03743 7.21255 2.05603 7.2191 2.07487C7.38165 2.54344 7.6884 3.15769 8.2654 3.7347C8.8424 4.31171 9.45665 4.61843 9.92525 4.78099C9.9438 4.78744 9.96215 4.79366 9.9803 4.79966L5.70005 9.0799C5.4115 9.36845 5.26715 9.51275 5.1081 9.63685C4.92041 9.78325 4.71734 9.90875 4.50249 10.0112C4.32035 10.0979 4.12675 10.1624 3.73959 10.2915L1.69792 10.9721C1.50739 11.0356 1.29733 10.986 1.15531 10.844C1.0133 10.702 0.963715 10.4919 1.02722 10.3014L1.70778 8.2597C1.83684 7.87255 1.90136 7.67895 1.98817 7.4968C2.09057 7.28195 2.21606 7.0789 2.36245 6.8912C2.48653 6.73215 2.63082 6.58785 2.91937 6.2993L7.2193 2Z"
                                                            fill="black"/>
                                                    </svg>
                                                </div>
                                            </IconChange>
                                        </ChangeRow>
                                    ) : (
                                        <Wrapp>
                                            <InputWrapper
                                                type="text"
                                                defaultValue={row?.contractDTO?.medicinesWithQuantities?.find(med => med.medicineId === selectedID)?.correction  || ""}
                                                onChange={(e) => setEditCorrection({ ...editCorrection, [row?.contractDTO?.id]: e.target.value })}
                                            />
                                            <IconChange>
                                                <div onClick={() => handleSave(row)}>
                                                    <i style={{"color": "#216BF4", fontSize: "12px"}}
                                                       className="fa-solid fa-floppy-disk"></i>
                                                </div>
                                            </IconChange>
                                        </Wrapp>
                                    )}
                                </Item>
                                <Item>

                                    0%

                                </Item>
                            </TableRow>
                        );
                    })

                    : "DATA NOT FOUND"
                    }
                    {/* </tbody> */}
                </TableStyled>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default UsloviyaModal;
