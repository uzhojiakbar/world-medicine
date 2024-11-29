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
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext"; // Tarjima uchun kontekst
import LoginFInished from "./LoginFInished.jsx";

import Cookies from "js-cookie";

const Login = () => {
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const [isSucces, setSucces] = useState("1");
  const nav = useNavigate();

  const Back = () => {
    if (isSucces == "1") {
      nav("/");
    } else if (isSucces == "2") {
      setSucces("1");
    }
  };

  const { translate, setLanguage } = useLanguage(); // Tarjima funksiyasi

  // const handleSubmit = (e = {}) => {
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
    console.log(values);

    const username = values.username; // Formdagi `username`
    const password = values.password; // Formdagi `password`
    const isNumber = true;

    console.log(username);
    console.log(password);
    console.log(isNumber);

    setLoading(true);

    const onSuccess = (user) => {
      console.log(user);

      Cookies.set("access_token", user?.access_token);
      Cookies.set("refresh_token", user?.refresh_token);
      setLoading(false);
      setSucces("2");
    };

    const onError = () => {
      setLoading(false);
    };

    // // `signIn`ga `isNumber`ni ham qo'shamiz
    signIn(username, password, isNumber, onSuccess, onError);
  };

  // Formda onFinish ni quyidagicha chaqiring
  <Form
    name="login"
    onFinish={handleSubmit} // `handleSubmit`ni chaqiring
    layout="vertical"
  >
    {/* Form elementlari */}
  </Form>;

  return isSucces == "1" ? (
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TopTitle>{translate("welcome")} </TopTitle>
          </motion.div>

          <FormSectionBottom>
            <Title>{translate("login")}</Title>
            <Form
              name="login"
              onFinish={handleSubmit} // Tasdiqlanganda handleSubmit chaqiriladi
              layout="vertical"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
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
                  <Input placeholder={translate("placeholder_username")} />
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

                <a style={{ color: "#00000080" }} href="/forget-password">
                  {translate("forgot_password")}
                </a>
              </motion.div>

              <ButtonWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <CricleButton
                    icon={<ArrowLeftOutlined />}
                    outline={true.toString()}
                    disabled={loading}
                    onClick={Back}
                  >
                    {translate("back")}
                  </CricleButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <CricleButton
                    icon={<ArrowRightOutlined />}
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
    <LoginFInished isSucces={isSucces} setSucces={setSucces} />
  );
};

export default Login;

// isSucces == "2" ? (
//   <CompleteSetup setSucess={setSucces} Back={Back} Complete={Complete} />
// ) :
