import React from "react";
import {QAccessButton, QuickAccessPContainer} from "./style";
import EyeIcon from "../../../assets/svg/Eye";
import SystemIcon from "../../../assets/svg/SystemIcon";
import BDIcon from "../../../assets/svg/BDIcon";
import {useLanguage} from "../../../context/LanguageContext";
import {motion} from "framer-motion";

const QuickAccess = ({data = [], count = 3}) => {
    const {translate} = useLanguage();

    return (
        <QuickAccessPContainer count={count}>
            {data.map((v,i) => {
                return (
                    <motion.div
                        initial={{ opacity: 0, x: i >= 2 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{duration: 0.5}}
                    >
                        <QAccessButton onClick={v.onclick} key={v.id}>
                            <div className="name">{v.name}</div>
                            <div className="icon">{v.icon}</div>
                        </QAccessButton>
                    </motion.div>
                );
            })}
        </QuickAccessPContainer>
    );
};

export default QuickAccess;
