import React, {useState} from "react";
import {
    Container, Highlight, InfoWrapper, Item, SellWrap, Wrap, TitleSmall,
} from "./style";
import {Title} from "../../root/style";
import {useLanguage} from "../../context/LanguageContext";
import QuickAccess from "../../pages/admin/quickAccess/quickAccess";
import EyeIcon from "../../assets/svg/Eye";
import SystemIcon from "../../assets/svg/SystemIcon";
import {useNavigate} from "react-router-dom";
import AnalitikaManagerPage from "./analiktika";
import UsloviyaProductTable from "../../Asadbek/usloviyaProductTable.jsx";
import ProdajiTableGeneric from "../../Asadbek/ProdajiTableGeneric/ProdajiTableGeneric.jsx";
import {motion} from "framer-motion";
import {useGetManagerGoalWithManagerId} from "../../utils/server/server.js";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

const ManagerHome = () => {
    const {translate} = useLanguage();

    const nav = useNavigate();

    const data = [{
        id: 1, name: translate("Отчеты"), icon: <EyeIcon/>, onclick: () => {
            nav("/reports-client");
        },
    }, {
        id: 2, name: translate("Администрирование"), icon: <SystemIcon/>, onclick: () => {
            nav("/database");
            console.log("button clickd");
        },
    }, {
        id: 3, name: translate("Создать_договор"), icon: (<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.5"
                    d="M24 44C14.5719 44 9.85786 44 6.92894 41.071C4 38.1422 4 33.428 4 24C4 14.5719 4 9.85786 6.92894 6.92894C9.85786 4 14.5719 4 24 4C33.428 4 38.1422 4 41.071 6.92894C44 9.85786 44 14.5719 44 24C44 33.428 44 38.1422 41.071 41.071C38.1422 44 33.428 44 24 44Z"
                    fill="#216BF4"
                />
                <path
                    d="M24 16.5C24.8284 16.5 25.5 17.1716 25.5 18V22.5H30C30.8284 22.5 31.5 23.1716 31.5 24C31.5 24.8284 30.8284 25.5 30 25.5H25.5V30C25.5 30.8284 24.8284 31.5 24 31.5C23.1716 31.5 22.5 30.8284 22.5 30V25.5H18C17.1716 25.5 16.5 24.8284 16.5 24C16.5 23.1716 17.1716 22.5 18 22.5H22.5V18C22.5 17.1716 23.1716 16.5 24 16.5Z"
                    fill="#216BF4"
                />
            </svg>), onclick: () => {
            nav("doctor-create-contract");
        },
    }, {
        id: 4, name: translate("Цель_представителю"), icon: (<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.5"
                    d="M24 44C35.0457 44 44 40.866 44 37C44 33.134 35.0457 30 24 30C12.9543 30 4 33.134 4 37C4 40.866 12.9543 44 24 44Z"
                    fill="#216BF4"
                />
                <path
                    d="M24.0005 2.5C24.8289 2.5 25.5004 3.17158 25.5004 4V6.07294L35.5159 11.0806L35.6238 11.1346C37.0928 11.8689 38.3448 12.4949 39.216 13.103C40.0996 13.7196 41.0285 14.615 41.0285 16C41.0285 17.385 40.0996 18.2804 39.216 18.897C38.3448 19.5051 37.0928 20.131 35.6238 20.8654L25.5004 25.927V36C25.5004 36.8284 24.8289 37.5 24.0005 37.5C23.172 37.5 22.5005 36.8284 22.5005 36V25.0324C22.4998 25.0116 22.4998 24.9906 22.5005 24.9698V7.03018C22.4998 7.00932 22.4998 6.98842 22.5005 6.9675V4C22.5005 3.17158 23.172 2.5 24.0005 2.5Z"
                    fill="#216BF4"
                />
            </svg>), onclick: () => {
            nav("goal-med-rep");
            console.log("button clickd");
        },
    },];

    const [loading, setLoading] = useState(false);


    const {
        data: managerGoal, isLoading: ManagerGoalLoading
    } = useGetManagerGoalWithManagerId(jwtDecode(Cookies.get("access_token"))?.sub);


    const [tableData, settableData] = useState({
        thead: ["Препарат", "Прод.", "Квота", "%", "Таш.", "Сам.", "Бух.", "Анж.", "Фер.", "Нам.", "Каш.", "Сур.", "Джи.", "Сыр.", "Таш.  об.", "Хор.",],
        tbody: [{
            id: 1,
            Препарат: "Амлипин таблетки",
            "Прод.": "200",
            Квота: "200",
            "%": "200%",
            "Таш.": "20",
            "Сам.": "15",
            "Бух.": "25",
            "Анж.": "30",
            "Фер.": "10",
            "Нам.": "20",
            "Каш.": "5",
            "Сур.": "10",
            "Джи.": "5",
            "Сыр.": "15",
            "Таш. об.": "10",
            "Хор.": "5",
        }, {
            id: 2,
            Препарат: "Амлипин таблетки",
            "Прод.": "200",
            Квота: "200",
            "%": "200%",
            "Таш.": "20",
            "Сам.": "15",
            "Бух.": "25",
            "Анж.": "30",
            "Фер.": "10",
            "Нам.": "20",
            "Каш.": "5",
            "Сур.": "10",
            "Джи.": "5",
            "Сыр.": "15",
            "Таш. об.": "10",
            "Хор.": "5",
        }, {
            id: 3,
            Препарат: "Амлипин таблетки",
            "Прод.": "200",
            Квота: "200",
            "%": "200%",
            "Таш.": "20",
            "Сам.": "15",
            "Бух.": "25",
            "Анж.": "30",
            "Фер.": "10",
            "Нам.": "20",
            "Каш.": "5",
            "Сур.": "10",
            "Джи.": "5",
            "Сыр.": "15",
            "Таш. об.": "10",
            "Хор.": "5",
        },],
    });
    return (<Container>
            {ManagerGoalLoading ? (<div className="loaderParent">
                <div className="loader"></div>
            </div>) : ""}
            <motion.div
                initial={{opacity: 0, x: -30}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Title>{translate("Быстрый доступ")}</Title>
            </motion.div>

            <QuickAccess data={data} count={4}/>
            {managerGoal?.fieldGoalQuantities || managerGoal?.medicineGoalQuantities ? <SellWrap>
                <motion.div
                    initial={{opacity: 0, x: -30}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.5}}
                    style={{width: "100%"}}
                >
                    <Title>{translate("Цель")}</Title>
                </motion.div>

                <Wrap>
                    {managerGoal.fieldGoalQuantities ? <motion.div
                        initial={{opacity: 0, x: -30}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        style={{width: "100%", height: "100%"}}
                    >
                        <InfoWrapper>
                            <TitleSmall size={"18px"}> {translate("Охват врачей")}</TitleSmall>
                            {managerGoal?.fieldGoalQuantities?.map((v) => {
                                const percentage = (v?.contractFieldAmount?.amount / v?.quote) * 100;

                                return <Item className="itemInner">
                                    <Highlight foiz={`${percentage.toFixed(2)}%`}/>
                                    <TitleSmall size={"12px"}>{translate(v?.fieldName)}</TitleSmall>
                                    <TitleSmall
                                        size={"12px"}>{v?.contractFieldAmount?.amount} из {v?.quote}</TitleSmall>
                                </Item>
                            })}
                        </InfoWrapper>
                    </motion.div> : ""}
                    {managerGoal.medicineGoalQuantities ?  <motion.div
                        initial={{opacity: 0, x: 30}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        style={{width: "100%", height: "100%"}}
                    >
                        <InfoWrapper>
                            <TitleSmall size={"18px"}>
                                {" "}
                                {translate("Заключение договоров")}
                            </TitleSmall>
                            {managerGoal?.medicineGoalQuantities?.map((v) => {
                                const percentage = (v?.contractMedicineAmount?.amount / v?.quote) * 100;

                                return <Item className="itemInner">
                                    <Highlight foiz={`${percentage.toFixed(2)}%`}/>
                                    <TitleSmall
                                        size={"12px"}>{translate(v?.medicine?.name)}</TitleSmall>
                                    <TitleSmall
                                        size={"12px"}>{v?.contractMedicineAmount?.amount} из {v?.quote}</TitleSmall>
                                </Item>
                            })}
                        </InfoWrapper>
                    </motion.div> : "" }
                </Wrap>


            </SellWrap> : ""}
            <AnalitikaManagerPage/>
        </Container>);
};

export default ManagerHome;
