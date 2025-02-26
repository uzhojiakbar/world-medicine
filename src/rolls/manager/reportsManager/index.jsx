import React, {useState} from "react";
import {
    ButtonWrapper, InfoContainer, InfoPage, InputWrapper, Item, TableWrapper, Title, TitleWrapper, Wrapper,
} from "./style";

import GenericTable from "./GenericTableUsloviyaSetting";
import {useLanguage} from "../../../context/LanguageContext";
import {Button, Input} from "antd";
import {useGetDrugsWithReports} from "../../../utils/server/server.js";

const EditableInfo = ({label, value, onSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
    };

    return (<InputWrapper onDoubleClick={() => setIsEditing(true)}>
        <p>{label}</p>
        {isEditing ? (<div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{width: "100px"}}
            />
            <Button type="primary" onClick={handleSave}>
                ✔
            </Button>
        </div>) : (<p>{value}</p>)}
    </InputWrapper>);
};


const ReportsManager = () => {
    const {translate} = useLanguage();

    const [activeTab, setActiveTab] = useState("Рецепт");
    const {data: drugsData, isLoading: IsLoadingDrugsData} = useGetDrugsWithReports();

    console.log("drugsData", drugsData);


    const information = {
        title: translate("Формирование отчета по работе клиентов"),
        download: translate("Загрузить базу продаж"),
        titles: [translate("Рецепт"), translate("СУ"), translate("СБ"), translate("ГЗ"), translate("Кабинет вакцинации")],

        info: {
            titles: [translate("Дозволено"), translate("Продажа в упаковках"), translate("Продано в сумах"), translate("Заявлено"),],
            values: ["132.000.00", "48.000", "1.200.000.000", "0"],
            percent: "11%",
        },
    };
    const tableData = [
        {
            id: 1,
            data: [
                {
                    name: "Ампициллин таб. 5/10мг №30", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "900", status: ""
                },
                {
                    name: "1700", status: "red"
                },
            ],
            statusParent: ""
        },
        {
            id: 2,
            data: [
                {
                    name: "Ампициллин таб. 5/10мг №30", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "1000", status: ""
                },
            ],
            statusParent: "warning"
        },
        {
            id: 3,
            data: [
                {
                    name: "Ампициллин таб. 5/10мг №30", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "1000", status: ""
                },

            ],
            statusParent: "red"
        },
        {
            id: 3,
            data: [
                {
                    name: "Ампициллин таб. 5/10мг №30", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "1000", status: ""
                },
                {
                    name: "1000", status: ""
                },

            ],
            statusParent: "done"
        },
    ];

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
        setData((prev) => ({...prev, [key]: newValue}));
    }


    return (<Wrapper>
        <TitleWrapper>
            <Title size={"48px"}>{information.title}</Title>

        </TitleWrapper>
        <ButtonWrapper>
            {information.titles.map((tab) => (<Item
                key={tab}
                active={activeTab === tab ? "true" : ""}
                onClick={() => setActiveTab(tab)}
            >
                {tab}
            </Item>))}
        </ButtonWrapper>

        <InfoPage>
            <InfoContainer>
                <EditableInfo label={translate("Продажа")} value={data.prodaja}
                              onSave={(val) => handleSave("prodaja", val)}/>
                <EditableInfo label={translate("Квота")} value={data.kvota}
                              onSave={(val) => handleSave("kvota", val)}/>
                <EditableInfo label={`% ${translate("выполнения")}`} value={data.vypolnenie}
                              onSave={(val) => handleSave("vypolnenie", val)}/>
                <EditableInfo label={translate("Продано в сумах")} value={data.sumProdano}
                              onSave={(val) => handleSave("sumProdano", val)}/>
                <EditableInfo label={translate("Дозволено")} value={data.dozvoleno}
                              onSave={(val) => handleSave("dozvoleno", val)}/>
            </InfoContainer>

            <InfoContainer>
                <EditableInfo label={translate("Фильтры")} value={""} onSave={() => {
                }}/>
                <EditableInfo label={translate("Район")} value={data.rayon}
                              onSave={(val) => handleSave("rayon", val)}/>
                <EditableInfo label={translate("Препарат")} value={data.preparat}
                              onSave={(val) => handleSave("preparat", val)}/>
            </InfoContainer>

        </InfoPage>
        <TableWrapper>
            {
                IsLoadingDrugsData ?
                    <div className="loaderParent">
                        <div className="loader"></div>
                    </div>
                    :
                    ""
            }
            <GenericTable
                thead={["Препараты", "Выписано", "Дозволено", "Продано"]}
                tableData={drugsData}
            />
        </TableWrapper>
    </Wrapper>);
};

export default ReportsManager;