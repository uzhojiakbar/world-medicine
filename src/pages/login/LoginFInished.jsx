import React, { useState } from "react";
import { Form } from "antd";
import { useSignIn } from "../../hooks/useLogin.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Global from "../../assets/Global.svg";
import LogoImg from "../../assets/logo-Banner.svg";
import Language from "../../components/Language/Language.jsx"; // Language dropdown komponenti
import {
  LoginContainer,
  LoginWrapper,
  ImageSection,
  FormSection,
  LogoContainer,
  LanguageContainer,
  FormSectionBottom,
  TopTitle,
  ButtonWrapper,
  Description,
} from "./style.js";

import CricleButton from "../../components/Generic/Button/CircleButton.jsx";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext"; // Tarjima uchun kontekst

const LoginFInished = ({ isSucces = true, setSucces = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const Go = () => {
    document.location.reload();
    nav("/");
  };

  //   console.log(e);

  //   if (formRef.current) {
  //     const values = formRef.current.getFieldsValue(); // Form qiymatlarini olish
  //     const username = values.username;
  //     const password = values.parol;

  //     console.log("Username:", username);
  //     console.log("Password:", password);
  //     console.log("Password:", values);

  //     setLoading(true);

  //     const onSuccess = (user) => {
  //       setTimeout(() => {
  //         setCookie("role", user?.role);
  //         setCookie("token", user?.token);
  //         setCookie("name", user?.name);
  //         setLoading(false);
  //         nav("/");
  //       }, 1000);
  //     };

  //     const onError = () => {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     };

  //     signIn(username, password, onSuccess, onError);
  //   }
  // };

  const handleSubmit = (values) => {
    setSucces("2");
    // let username = values.username; // Formdagi `username`
    // const password = values.password; // Formdagi `password`

    // // `isNumber`ni aniqlash
    // let isNumber = false;

    // // Agar username raqam bo'lsa va "+" bilan boshlangan bo'lsa
    // if (/^\+?\d+$/.test(username)) {
    //   // "+" ni olib tashlaymiz, agar mavjud bo'lsa
    //   username = username.startsWith("+") ? username.slice(1) : username;
    //   isNumber = true;
    // }

    // setLoading(true);

    // const onSuccess = (user) => {
    //   console.log(user);

    //   Cookies.set("role", user?.role);
    //   Cookies.set("token", user?.token);
    //   Cookies.set("name", user?.name);
    //   setLoading(false);
    //   nav("/");
    // };

    // const onError = () => {
    //   setLoading(false);
    // };

    // // `signIn`ga `isNumber`ni ham qo'shamiz
    // if (isNumber) {
    //   signIn(username, password, isNumber, onSuccess, onError); // Foydalanuvchini login qilish
    // } else {
    //   signIn(username, password, isNumber, onSuccess, onError); // Foydalanuvchini login qilish
    // }
  };

  const { translate, setLanguage } = useLanguage(); // Tarjima funksiyasi
  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {loading ? (
        <div className="loaderWindow">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
      <LoginWrapper
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Left Section */}
        <ImageSection>
          <LogoContainer>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <img
                src={LogoImg}
                alt="World Medicine Logo"
                width="120"
                height="40"
              />
            </motion.div>
          </LogoContainer>

          <LanguageContainer>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TopTitle>{translate("login_success")} </TopTitle>
            <Description>{translate("login_success_desc")}</Description>
          </motion.div>

          <FormSectionBottom>
            <Form
              name="login"
              onFinish={handleSubmit} // Tasdiqlanganda handleSubmit chaqiriladi
              layout="vertical"
            >
              <ButtonWrapper grid={"yeah"}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <CricleButton
                    textAlign={"left".toString()}
                    icon={<ArrowRightOutlined />}
                    onClick={Go}
                    iconRight="true"
                    disabled={loading}
                  >
                    {translate("login_success_button")}
                  </CricleButton>
                </motion.div>
              </ButtonWrapper>
            </Form>
          </FormSectionBottom>
        </FormSection>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default LoginFInished;
