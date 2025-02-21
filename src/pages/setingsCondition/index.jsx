import React from "react";
import {AnaliktikaCon} from "../analiktika/admin/style";
import {Title} from "../../root/style";
import Pagination from "./nav/Pagination";
import {Outlet, Route, Routes} from "react-router-dom";
import {useLanguage} from "../../context/LanguageContext";
import {motion} from "framer-motion";

const SettingsCondition = () => {
    const {translate} = useLanguage();
    return (<motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >

            <AnaliktikaCon>
                <motion.h1
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >

                    <Title>{translate("Управление_базой_данных")}</Title>
                </motion.h1>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {
                            opacity: 1,
                            transition: {staggerChildren: 0.2},
                        },
                    }}
                >
                    <motion.div
                        variants={{hidden: {opacity: 0, y: 10}, visible: {opacity: 1, y: 0}}}
                    >

                        <Pagination/>
                    </motion.div>
                    <motion.div
                        variants={{hidden: {opacity: 0, y: 10}, visible: {opacity: 1, y: 0}}}
                    >

                        <Outlet/>
                    </motion.div>
                </motion.div>

            </AnaliktikaCon>
        </motion.div>

    );
};

export default SettingsCondition;
