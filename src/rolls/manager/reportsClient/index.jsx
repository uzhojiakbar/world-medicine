import React, {useState} from "react";
import {
    ButtonWrapper, InfoContainer, InfoPage, InputWrapper, Item, TableWrapper, Title, TitleWrapper, Wrapper,
} from "./style";

import { Input, Button } from "antd";
import GenericTable from "./GenericTableUsloviyaSetting";
import {useLanguage} from "../../../context/LanguageContext";
import styled from "styled-components";

const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    padding: 20px;
    min-width: 160px;
    width: 160px;
    border-radius: 20px;
    background-color: white;

    font-family: "Vela Sans GX";
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => (props.checked ? "30px" : "24px")};
    height: ${(props) => (props.checked ? "30px" : "24px")};
    border-radius: 5px;
    background-color: ${(props) => (props.checked ? "transparent" : "transparent")};
    border: 2px solid ${(props) => (props.checked ? "transparent" : "gray")};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
`;

const CheckboxInput = styled.input`
    display: none;
`;

const CheckMark = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${(props) => (props.checked ? "white" : "transparent")};
`;

const Clear = styled.div`
    background: white;
    padding: 20px;
    cursor: pointer;
    border-radius: 20px;

    color: #216bf4;

    user-select: none;

    @media (max-width: 480px) {
        padding: 8px;
        font-size: 14px;
    }

    &:hover {
        opacity: 0.8;
    }
`;


const CustomCheckbox = ({label, checked, onChange}) => {
    return (<Label htmlFor="select">
            {checked ? "Отменить" : "Выбрать"}
            <CheckboxWrapper checked={checked} onClick={onChange}>
                <CheckboxInput id="select" type="checkbox" checked={checked} readOnly/>
                <CheckMark checked={checked}>
                    {checked ? (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.5"
                                d="M21 12C21 16.9705 16.9705 21 12 21C7.02944 21 3 16.9705 3 12C3 7.02943 7.02943 3 12 3C16.9705 3 21 7.02944 21 12Z"
                                stroke="black"
                                strokeWidth="2"
                            />
                            <path
                                d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0304L13.0607 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z"
                                fill="black"
                            />
                        </svg>) : null}
                </CheckMark>
            </CheckboxWrapper>
        </Label>);
};

const EditableInfo = ({ label, value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
    };

    return (
        <InputWrapper onDoubleClick={() => setIsEditing(true)}>
            <p>{label}</p>
            {isEditing ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        style={{ width: "100px" }}
                    />
                    <Button type="primary" onClick={handleSave}>
                        ✔
                    </Button>
                </div>
            ) : (
                <p>{value}</p>
            )}
        </InputWrapper>
    );
};

const ReportsClient = () => {
    const {translate} = useLanguage();

    const [isChecked1, setIsChecked1] = useState(false);

    const information = {
        title: translate("Отчеты"),
        download: translate("Загрузить базу продаж"),
        titles: [translate("Рецепт"), translate("СУ"), translate("СБ"), translate("ГЗ"), translate("Кабинет вакцинации")],

        info: {
            titles: [translate("Дозволено"), translate("Продажа в упаковках"), translate("Продано в сумах"), translate("Заявлено"),],
            values: ["132.000.00", "48.000", "1.200.000.000", "0"],
            percent: "11%",
        },
    };
    const tableData = [{
        id: 1, data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"], highlight: true, colors: {
            iconcolor: "#FB3748", textcolor: "black",
        },
    }, {
        id: 1, data: ["Ампициллин таб. 5/10мг №30", "1000", "900", "1700"], highlight: true, colors: {
            bgcolorr: "#FFDB43", textcolor: "black", iconcolor: "#216BF4",
        },
    }, {
        id: 1, data: ["Артрокол р-р д/ин амп.10мг/2мл №5", "XX", "XX", "XX"], highlight: true, colors: {
            bgcolorr: "#FB3748", iconbgcolor: "#e1858d", iconcolor: "white", textcolor: "white",
        },
    },];

    const Flex = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;

        gap: 10px;
    `

    const [data, setData] = useState({
        prodaja: "48 000",
        kvota: "56 000",
        vypolnenie: "20%",
        sumProdano: "132 000 00",
        dozvoleno: "-?",
        rayon: "30%",
        preparat: "20%",
    });

    const handleSave = (key, newValue) => {
        setData((prev) => ({ ...prev, [key]: newValue }));
    };


    return (<Wrapper>
            <TitleWrapper>
                <Title size={"36px"}>{information.title}</Title>

                <Flex>
                    <CustomCheckbox
                        checked={isChecked1}
                        onChange={() => setIsChecked1(!isChecked1)}
                    />

                    <Clear onClick={() => exportToExcel(data)}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.5"
                                d="M22 16.0006V15.0006C22 12.1721 21.9998 10.7584 21.1211 9.87966C20.2424 9.00098 18.8282 9.00098 15.9998 9.00098H7.99977C5.17135 9.00098 3.75713 9.00098 2.87845 9.87966C2 10.7582 2 12.1714 2 14.9984V15.0006V16.0006C2 18.829 2 20.2432 2.87868 21.1219C3.75736 22.0006 5.17157 22.0006 8 22.0006H16C18.8284 22.0006 20.2426 22.0006 21.1213 21.1219C22 20.2432 22 18.829 22 16.0006Z"
                                fill="#216BF4"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2V12.9726L9.56946 11.0119C9.29989 10.6974 8.82642 10.661 8.51192 10.9306C8.19743 11.2001 8.16101 11.6736 8.43057 11.9881L11.4305 15.4881C11.573 15.6543 11.781 15.75 12 15.75C12.2189 15.75 12.4269 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4305 11.0119L12.75 12.9726V2C12.75 1.58579 12.4142 1.25 12 1.25Z"
                                fill="#216BF4"
                            />
                        </svg>
                    </Clear>

                    <Clear onClick={() => exportToExcel(data)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.1209 2.87868C16.2422 2 14.828 2 11.9996 2C9.17112 2 7.7569 2 6.87822 2.87868C6.38586 3.37105 6.16939 4.03157 6.07422 5.01484C6.63346 4.99996 7.25161 4.99998 7.92921 5H16.0704C16.7478 4.99998 17.3658 4.99996 17.9249 5.01483C17.8297 4.03156 17.6133 3.37105 17.1209 2.87868Z"
                                fill="#216BF4"/>
                            <path
                                d="M18 15.5C18 18.3284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17158 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.3284 6 15.5H18Z"
                                fill="#216BF4"/>
                            <path opacity="0.5"
                                  d="M16 6H8C5.17157 6 3.75736 6 2.87868 6.87868C2 7.75736 2 9.17157 2 12C2 14.8284 2 16.2426 2.87868 17.1213C3.37323 17.6159 4.03743 17.8321 5.02795 17.9266C4.99998 17.2038 4.99999 16.3522 5 15.5C4.72386 15.5 4.5 15.2761 4.5 15C4.5 14.7239 4.72386 14.5 5 14.5H19C19.2761 14.5 19.5 14.7239 19.5 15C19.5 15.2761 19.2761 15.5003 19 15.5003C19 16.3525 19 17.2039 18.9721 17.9266C19.9626 17.8321 20.6268 17.6159 21.1213 17.1213C22 16.2426 22 14.8284 22 12C22 9.17157 22 7.75736 21.1213 6.87868C20.2426 6 18.8284 6 16 6Z"
                                  fill="#216BF4"/>
                            <path
                                d="M9 10.75C9.41421 10.75 9.75 10.4142 9.75 10C9.75 9.58579 9.41421 9.25 9 9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9Z"
                                fill="#216BF4"/>
                            <path
                                d="M18 10C18 10.5523 17.5523 11 17 11C16.4477 11 16 10.5523 16 10C16 9.44772 16.4477 9 17 9C17.5523 9 18 9.44772 18 10Z"
                                fill="#216BF4"/>
                        </svg>

                    </Clear>

                </Flex>

            </TitleWrapper>

        <InfoPage>
            <InfoContainer>
                <EditableInfo label={translate("Продажа")} value={data.prodaja} onSave={(val) => handleSave("prodaja", val)} />
                <EditableInfo label={translate("Квота")} value={data.kvota} onSave={(val) => handleSave("kvota", val)} />
                <EditableInfo label={`% ${translate("выполнения")}`} value={data.vypolnenie} onSave={(val) => handleSave("vypolnenie", val)} />
                <EditableInfo label={translate("Продано в сумах")} value={data.sumProdano} onSave={(val) => handleSave("sumProdano", val)} />
                <EditableInfo label={translate("Дозволено")} value={data.dozvoleno} onSave={(val) => handleSave("dozvoleno", val)} />
            </InfoContainer>

            <InfoContainer>
                <EditableInfo label={translate("Фильтры")} value={""} onSave={() => {}} />
                <EditableInfo label={translate("Район")} value={data.rayon} onSave={(val) => handleSave("rayon", val)} />
                <EditableInfo label={translate("Препарат")} value={data.preparat} onSave={(val) => handleSave("preparat", val)} />
            </InfoContainer>
        </InfoPage>
            <TableWrapper>
                <GenericTable
                    thead={["Препараты", "Выписано", "Дозволено", "Продано"]}
                    data={tableData}
                />
            </TableWrapper>
        </Wrapper>);
};

export default ReportsClient;