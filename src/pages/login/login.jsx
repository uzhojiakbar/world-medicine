import React, {useEffect, useState} from "react";
import {Form, message} from "antd";
import {useSignIn} from "../../hooks/useLogin.jsx";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

import Global from "../../assets/Global.svg";
import LogoImg from "../../assets/logo-Banner.svg";
import Language from "../../components/Language/Language.jsx"; // Language dropdown komponenti
import {
    LoginContainer,
    LoginWrapper,
    ImageSection,
    FormSection,
    Title,
    LogoContainer,
    LanguageContainer,
    FormSectionBottom,
    TopTitle,
    ButtonWrapper,
    Description,
} from "./style.js";

import Input from "../../components/Generic/Input/Input.jsx";
import CricleButton from "../../components/Generic/Button/CircleButton.jsx";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {useLanguage} from "../../context/LanguageContext"; // Tarjima uchun kontekst
import LoginFInished from "./LoginFInished.jsx";

import Cookies from "js-cookie";
import DisabledPage from "../../components/DisabledPage/index.jsx";

const Login = () => {
    const signIn = useSignIn();
    const [loading, setLoading] = useState(false);
    const [isSucces, setSucces] = useState("1");
    const nav = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const Back = () => {
        if (isSucces == "1") {
            nav("/");
        } else if (isSucces == "2") {
            setSucces("1");
        }
    };

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const {translate, setLanguage} = useLanguage(); // Tarjima funksiyasi

    const handleSubmit = (values) => {
        console.log(values);

        const username = `998${values.username}`; // Formdagi `username`
        const password = values.password; // Formdagi `password`
        const isNumber = true;

        console.log(username);
        console.log(password);
        console.log(isNumber);

        setLoading(true);

        const onSuccess = (user) => {
            // console.log(user);

            // Cookies.set("access_token", user?.access_token);
            // Cookies.set("refresh_token", user?.refresh_token);
            // setLoading(false);
            // setSucces("2");
            console.log(user);

            Cookies.set("access_token", user?.access_token);
            Cookies.set("refresh_token", user?.refresh_token);

            setLoading(false);
            setSucces("2");
        };

        const onError = (error) => {
            setLoading(false);

            if (error?.response) {
                // API dan kelgan xato (response mavjud)
                console.log("Server Response Error:", error.response);

                const {status, data} = error.response;

                if (status === 404) {
                    console.error("❌ Xatolik: User Not Found");
                    message.error(translate("login_error_user_not_found"));
                } else if (status === 401) {
                    message.error(translate("login_password_incorrect"));
                } else {
                    message.error(translate("login_error_something"));
                }
            } else if (error?.request) {
                message.error(translate("login_error_something"));
            } else {
                message.error(translate("login_error_something"));
            }
        };


        // // `signIn`ga `isNumber`ni ham qo'shamiz
        signIn(username, password, isNumber, onSuccess, onError);
    };

    return isSucces == "1" ? (
        <LoginContainer
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            {loading ? (
                <div className="loaderWindow">
                    <div className="loader"></div>
                </div>
            ) : (
                ""
            )}

            <LoginWrapper
                initial={{scale: 0.8}}
                animate={{scale: 1}}
                transition={{type: "spring", stiffness: 100, damping: 20}}
            >
                {/* Left Section */}
                <ImageSection>
                    <LogoContainer>
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.3, duration: 0.3}}
                        >
                            <img
                                src={LogoImg}
                                alt=" Logo"
                                width="120"
                                height="40"
                            />
                        </motion.div>
                    </LogoContainer>

                    <LanguageContainer>
                        <motion.div
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.3, duration: 0.3}}
                        >
                            <Language
                                notext={true.toString()}
                                imgIcon={Global}
                                onChange={setLanguage}
                            />
                        </motion.div>
                    </LanguageContainer>
                </ImageSection>

                {/* Right Section */}
                <FormSection>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                    >
                        <TopTitle>{translate("welcome")} </TopTitle>
                    </motion.div>

                    <FormSectionBottom>
                        <Title>{translate("login")}</Title>
                        <Form
                            name="login"
                            onFinish={handleSubmit} // Tasdiqlanganda handleSubmit chaqiriladi
                            layout="vertical"
                            requiredMark={false} // Barcha required fieldlarda yulduzcha chiqmasin

                        >
                            <motion.div
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3, duration: 0.3}}
                            >
                                <Form.Item
                                    label={translate("username")}
                                    name="username" // Form qiymati uchun `name`
                                    rules={[
                                        {
                                            required: true,
                                            message: translate("placeholder_username"),
                                        },
                                    ]}
                                >
                                    <div
                                        className={"number-login"}
                                    >
                                        <Input className={"countryCode"} disabled value={"+998"}
                                               placeholder={translate("+998")}/>
                                        <Input type={"number"} placeholder={translate("placeholder_username")}/>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label={translate("password")}
                                    name="password" // Form qiymati uchun `name`
                                    rules={[
                                        {
                                            required: true,
                                            message: translate("placeholder_password"),
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        placeholder={translate("placeholder_password")}
                                    />
                                </Form.Item>

                                <a style={{color: "#00000080"}} href="/forget-password">
                                    {translate("forgot_password")}
                                </a>
                            </motion.div>

                            <ButtonWrapper
                                grid={"yeah"}
                            >
                                <motion.div
                                    initial={{opacity: 0, y: 50}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.6, duration: 0.3}}
                                >
                                    <CricleButton
                                        icon={<ArrowRightOutlined/>}
                                        iconRight="true"
                                        disabled={loading}
                                        htmlType={"submit"}
                                    >
                                        {translate("login_button")}
                                    </CricleButton>
                                </motion.div>
                            </ButtonWrapper>
                        </Form>
                    </FormSectionBottom>
                </FormSection>
            </LoginWrapper>
        </LoginContainer>
    ) : (
        <LoginFInished isSucces={isSucces} setSucces={setSucces}/>
    );
};

export default Login;

// isSucces == "2" ? (
//   <CompleteSetup setSucess={setSucces} Back={Back} Complete={Complete} />
// ) :
