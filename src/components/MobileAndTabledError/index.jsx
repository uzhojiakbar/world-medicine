import React from "react";
import {Desc, DisabledPageContainer, LanguageContainer, Footer, Title} from "./style";
import {message} from "antd";
import CircleButton from "../Generic/Button/CircleButton.jsx";
import {motion} from "framer-motion";
import Language from "../Language/Language.jsx";
import Global from "../../assets/Global.svg";
import {useLanguage} from "../../context/LanguageContext.jsx";

const MobileAndTabletError = () => {
    const {translate, setLanguage} = useLanguage();
    const link = "https://falcon.enterinfinit.uz/";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            message.success(translate("link-copied"));
        } catch (err) {
            console.error("Nusxalashda xatolik: ", err);
        }
    };

    return (
        <DisabledPageContainer>
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Title>{translate("mobile-and-tablet-error-title")}</Title>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                <Desc>{translate("mobile-and-tablet-error")}</Desc>
            </motion.div>

            <Footer
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, delay: 0.4}}
            >
                <CircleButton
                    className="copy-link"
                    icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                            stroke="white" strokeWidth="1.5"/>
                        <path
                            d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                            stroke="white" strokeWidth="1.5"/>
                    </svg>
                    }
                    onClick={handleCopy}>
                    {translate("copy-link")}
                </CircleButton>

                <LanguageContainer
                >
                    <Language
                        className={"language-button"}
                        notext={true.toString()}
                        imgIcon={Global}
                        onChange={setLanguage}
                    />
                </LanguageContainer>
            </Footer>
        </DisabledPageContainer>
    );
};

export default MobileAndTabletError;
