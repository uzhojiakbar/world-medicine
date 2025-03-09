import React, {useState, useEffect, useCallback} from "react";
import {Container, FilterSection, Figcaption, Details} from "./style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";
import DateRangePicker from "./DataRangePicker/DataRangePicker.jsx";
import {useLanguage} from "../../../../context/LanguageContext.jsx";
import {Button} from "antd";
import {useGetConditions, useUpdateCondition, useUpdateSale} from "../../../../utils/server/server.js";
import Input2 from "../../../../components/Generic/Input/Input2.jsx";

const LOCAL_STORAGE_KEY_INVEST = "investitsiyaData";
const LOCAL_STORAGE_KEY_USLOVIYA = "usloviyaData";

const EditableInfo = ({label, value, onSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    useEffect(() => {
        setEditValue(value);
    }, [value]);

    const handleSave = () => {
        onSave(editValue);
        setIsEditing(false);
    };

    return (
        <Figcaption onDoubleClick={() => setIsEditing(true)}>
            <div>
                {label}
            </div>
            {isEditing ? (
                <div style={{display: "flex", height: "40px", alignItems: "center", gap: "10px"}}>
                    <Input
                        value={editValue}
                        onChange={(value) => setEditValue(value)}
                        height={"40px"}
                        autoFocus
                        bgColor={"white"}
                    />
                    <Button type={"primary"} onClick={handleSave}>✔</Button>
                </div>
            ) : (
                <div style={{cursor: "pointer", height: "40px"}}>{value}%</div>
            )}
        </Figcaption>
    );
};

const Info = ({loading, setLoading}) => {
    const {translate} = useLanguage();

    const [dataInvestitsiya, setDataInvestitsiya] = useState([]);
    const [dataUsloviya, setDataUsloviya] = useState([]);

    const {data: condition, isLoading: laodingCondtion} = useGetConditions();
    const [date, setDate] = useState({
        endDate:
            "2025-03-21",
        startDate:
            "2025-03-14"
    });
    console.log(date)

    useEffect(() => {
        const savedInvestitsiya = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_INVEST));
        const savedUsloviya = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USLOVIYA));

        if (savedInvestitsiya) setDataInvestitsiya(savedInvestitsiya);
        else {
            setDataInvestitsiya([
                {id: 1, minPercentage: 0, maxPercentage: 60, percentageVal: 10},
                {id: 2, minPercentage: 60, maxPercentage: 69.9, percentageVal: 10.5},
                {id: 3, minPercentage: 70, maxPercentage: 79.9, percentageVal: 11},
                {id: 4, minPercentage: 80, maxPercentage: 89.9, percentageVal: 11.5},
                {id: 5, minPercentage: 90, maxPercentage: null, percentageVal: 12},
            ]);
        }

        if (savedUsloviya) setDataUsloviya(savedUsloviya);
        else {
            setDataUsloviya([
                {id: 1, title: "СУ", value: 30},
                {id: 2, title: "СБ", value: 20},
                {id: 3, title: "ГЗ", value: 40},
                {id: 4, title: "КВ", value: 30},
            ]);
        }
    }, []);

    const updateInvestitsiya = (id, newValue) => {
        setDataInvestitsiya((prev) =>
            prev.map((item) =>
                item.id === id ? {...item, percentageVal: parseFloat(newValue) || 0} : item
            )
        );
        saveToLocal();
    };

    const updateUsloviya = (id, newValue) => {
        setDataUsloviya((prev) =>
            prev.map((item) =>
                item.id === id ? {...item, value: parseFloat(newValue) || 0} : item
            )
        );
        saveToLocal();
    };

    const saveToLocal = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY_INVEST, JSON.stringify(dataInvestitsiya));
        localStorage.setItem(LOCAL_STORAGE_KEY_USLOVIYA, JSON.stringify(dataUsloviya));
    };


    const [editRowCondioton, setEditRowCondioton] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        setEditRowCondioton({
            ...editRowCondioton, [name]: +value,
        })
    };
    const handleChangeVals = (e, i, type = "err") => {
        const {name, value} = e.target;
        console.log(name, value);

        setEditRowCondioton(prevState => ({
            ...prevState,
            percentageVals: [...prevState.percentageVals, {
                minPercentage: 0,
                maxPercentage: 0,
                percentageVal: 0
            }].map((item, index) =>
                index === i ? {...item, [name]: +value} : item
            )
        }));
    };

    const mutation = useUpdateCondition();


    const handleSave = async () => {
        setLoading(1)
        await mutation.mutate(
            {
                requestData: {
                    ...editRowCondioton,
                    percentageVals: editRowCondioton?.percentageVals.filter(
                        item => !(item.minPercentage === 0 && item.maxPercentage === 0 && item.percentageVal === 0)
                    )
                },
                onSuccess: () => {
                    setLoading(0);
                    setEditRowCondioton({})
                },
                onError: () => {
                    setLoading(0);
                }
            }
        )
    }

    const handleDateChange = useCallback((dates) => {
        setDate(dates)

        setLoading(1)
        mutation.mutate(
            {
                requestData: {
                    ...condition,
                    startDate: dates?.startDate,
                    endDate: dates?.endDate,
                },
                onSuccess: () => {
                    setLoading(0);
                    document.location.reload();
                    setEditRowCondioton({})
                },
                onError: () => {
                    setLoading(0);
                }
            }
        )
    }, []);


    console.log("editRowCondioton", editRowCondioton)
    return (
        <Container>
            <FilterSection>
                <Details>
                    <Figcaption>
                        <div>{translate("Доступный % инвестиций")}</div>
                    </Figcaption>
                    {
                        editRowCondioton?.id ?
                            <Details padding={"0"}>
                                <div className={"conditionItem"}>
                                    <div>{0} -
                                        {" "}
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="minPercentage"
                                            deffvalue={editRowCondioton?.minPercentage}
                                            onChange={handleChange}
                                            placeholder={editRowCondioton?.minPercentage}
                                        />
                                    </div>
                                    <div>
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="minPercentageVal"
                                            deffvalue={editRowCondioton?.minPercentageVal}
                                            onChange={handleChange}
                                            placeholder={editRowCondioton?.minPercentageVal}
                                        />
                                        {" "}
                                        %
                                    </div>
                                </div>
                                {condition?.percentageVals?.map((v, i) => (
                                    <div className={"conditionItem"}>
                                        {/*handleChangeVals*/}
                                        <div>
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="minPercentage"
                                                deffvalue2={v?.minPercentage}
                                                onChange={(e) => handleChangeVals(e, i)}
                                                placeholder={v?.minPercentage}
                                            />
                                            {" "} - {" "}
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="maxPercentage"
                                                deffvalue2={v?.maxPercentage}
                                                onChange={(e) => handleChangeVals(e, i)}
                                                placeholder={v?.maxPercentage}
                                            />
                                        </div>
                                        <div>
                                            {" "}
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="percentageVal"
                                                deffvalue2={v?.percentageVal}
                                                onChange={(e) => handleChangeVals(e, i)}
                                                placeholder={v?.percentageVal}
                                            />
                                            %
                                        </div>
                                    </div>
                                ))}
                                <div className={"conditionItem"}>
                                    {/*handleChangeVals*/}
                                    <div>
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="minPercentage"
                                            onChange={(e) => handleChangeVals(e, condition?.percentageVals?.length, "new")}
                                            placeholder={0}
                                        />
                                        {" "} - {" "}
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="maxPercentage"
                                            onChange={(e) => handleChangeVals(e, condition?.percentageVals?.length, "new")}
                                            placeholder={0}
                                        />
                                    </div>
                                    <div>
                                        {" "}
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="percentageVal"
                                            onChange={(e) => handleChangeVals(e, condition?.percentageVals?.length, "new")}
                                            placeholder={0}
                                        />
                                        %
                                    </div>
                                </div>

                                <div className={"conditionItem"}>
                                    <div>
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="maxPercentage"
                                            deffvalue={editRowCondioton?.maxPercentage}
                                            onChange={handleChange}
                                            placeholder={editRowCondioton?.maxPercentage}
                                        />
                                        {" "}
                                        - {100}</div>
                                    <div>
                                        <Input2
                                            bgColor={"white"}
                                            height={"40px"}
                                            mini={1}
                                            type="text"
                                            name="maxPercentageVal"
                                            deffvalue={editRowCondioton?.maxPercentageVal}
                                            onChange={handleChange}
                                            placeholder={editRowCondioton?.maxPercentageVal}
                                        />
                                        {" "}
                                        %
                                    </div>
                                </div>
                                <Button onClick={handleSave}>{translate("save")}</Button>
                            </Details>
                            :
                            <Details onDoubleClick={() => setEditRowCondioton(condition)} padding={"0"}>
                                <div className={"conditionItem"}>
                                    <div>{0} - {condition?.minPercentage ? condition?.minPercentage : '>'}</div>
                                    <div>{condition?.minPercentageVal}%</div>
                                </div>
                                {condition?.percentageVals?.map((v, i) => (
                                    <div className={"conditionItem"}>
                                        <div>{v.minPercentage} - {v?.maxPercentage ? v?.maxPercentage : '>'}</div>
                                        <div>{v?.percentageVal}%</div>
                                    </div>
                                ))}
                                <div className={"conditionItem"}>
                                    <div>{condition?.maxPercentage} - {100}</div>
                                    <div>{condition?.maxPercentageVal}%</div>
                                </div>
                            </Details>

                    }
                </Details>

                <Details>
                    <div className={"conditionItem"}>
                        {
                            editRowCondioton?.id ? <Details>
                                    <Figcaption>
                                        <div>{translate("Условия")}</div>
                                    </Figcaption>
                                    <div className={"conditionItem"}>
                                        <div>%СУ</div>
                                        <div>
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="su"
                                                onChange={handleChange}
                                                placeholder={condition?.su}
                                            />
                                        </div>
                                    </div>
                                    <div className={"conditionItem"}>
                                        <div>%СБ</div>
                                        <div>
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="sb"
                                                onChange={handleChange}
                                                placeholder={condition?.sb}
                                            />
                                        </div>
                                    </div>
                                    <div className={"conditionItem"}>
                                        <div>%ГЗ</div>
                                        <div>
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="gz"
                                                onChange={handleChange}
                                                placeholder={condition?.gz}
                                            />
                                        </div>
                                    </div>
                                    <div className={"conditionItem"}>
                                        <div>%КВ</div>
                                        <div>
                                            <Input2
                                                bgColor={"white"}
                                                height={"40px"}
                                                mini={1}
                                                type="text"
                                                name="kb"
                                                onChange={handleChange}
                                                placeholder={condition?.kb}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleSave}>{translate("save")}</Button>
                                </Details> :
                                <Details onDoubleClick={() => setEditRowCondioton(condition)}>
                                    <Figcaption>
                                        <div>{translate("Условия")}</div>
                                    </Figcaption>

                                    <div className={"conditionItem"}>
                                        <div>%СУ</div>
                                        <div>{condition?.su}</div>
                                    </div>
                                    <div className={"conditionItem"}>
                                        <div>%СБ</div>
                                        <div>{condition?.sb}</div>
                                    </div>
                                    <div className={"conditionItem"}>
                                        <div>%ГЗ</div>
                                        <div>{condition?.gz}</div>
                                    </div>
                                    <div className={"conditionItem"}>
                                        <div>%КВ</div>
                                        <div>{condition?.kb}</div>
                                    </div>
                                </Details>
                        }

                        {/*<div>*/}
                        {/*    <Input2*/}
                        {/*        bgColor={"white"}*/}
                        {/*        height={"40px"}*/}
                        {/*        mini={1}*/}
                        {/*        type="text"*/}
                        {/*        name="maxPercentageVal"*/}
                        {/*        deffvalue={editRowCondioton?.maxPercentageVal}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        placeholder={editRowCondioton?.maxPercentageVal}*/}
                        {/*    />*/}
                        {/*    {" "}*/}
                        {/*    %*/}
                        {/*</div>*/}
                    </div>
                </Details>
            </FilterSection>

            <DateRangePicker
                startDateValue={condition?.startDate}
                endDateValue={condition?.endDate}
                onDateChange={handleDateChange} title={translate("Срок сдачи отчета")}/>
        </Container>
    );
};

export default Info;
