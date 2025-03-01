import React, {useEffect, useState} from "react";
import {
    ButtonWrapper, InfoContainer, InfoPage, InputWrapper, Item, TableWrapper, Title, TitleWrapper, Wrapper,
} from "./style";

import GenericTable from "./GenericTableUsloviyaSetting";
import {useLanguage} from "../../../context/LanguageContext";
import {Button, Input} from "antd";
import {useGetDrugsWithReports} from "../../../utils/server/server.js";
import {formatSum} from "../../../utils/PhoneFormatter.js";

const EditableInfo = ({label, value, onSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
    };

    return (<InputWrapper >
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

    const [ProdajaSum, setProdajaSum] = useState({
        prodaja: 0,
        totalDozvoleno: 0,
    });
    useEffect(() => {
        const totalProdaja = drugsData?.reduce((sum, row) => {
            const value = Number(row.data[3]?.name);
            return sum + (!isNaN(value) ? value : 0);
        }, 0);

        const totalDozvoleno = drugsData?.reduce((sum, row) => {
            const value = Number(row.data[2]?.name);
            return sum + (!isNaN(value) ? value : 0);
        }, 0);
        const ProdanaSumax = drugsData?.reduce((sum, row) => {
            const value = Number((row.data[0]?.CIP || 0)*row.data[3].name || 0);
            return sum + (!isNaN(value) ? value : 0);
        }, 0);

        setProdajaSum({
            ...ProdajaSum,
            prodaja: totalProdaja,
            totalDozvoleno,
            ProdanaSumax: ProdanaSumax,
            percentage: totalDozvoleno > 0 ? (totalProdaja / totalDozvoleno) * 100 : 0
        });

    }, [drugsData]);

    return (<Wrapper>
        <TitleWrapper>
            <Title size={"40px"}>{information.title}</Title>

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
                <EditableInfo label={translate("Продажа")} value={formatSum(ProdajaSum?.prodaja)}/>
                <EditableInfo label={translate("Квота")} value={formatSum(ProdajaSum?.totalDozvoleno)}
                              onSave={(val) => handleSave("kvota", val)}/>
                <EditableInfo label={`% ${translate("выполнения")}`} value={`${ProdajaSum?.percentage?.toFixed(ProdajaSum.percentage>10?0:1)}%`}
                              onSave={(val) => handleSave("vypolnenie", val)}/>
                <EditableInfo label={translate("Продано в сумах")} value={formatSum(ProdajaSum?.ProdanaSumax)}
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