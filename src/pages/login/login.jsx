import React, { useState } from "react";
import { Form } from "antd";
import { useSignIn } from "../../hooks/useLogin.jsx";
import { setCookie } from "../../hooks/useCookie.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Global from "../../assets/Global.svg";
import LogoImg from "../../assets/logo-Banner.svg";
import Language from "./Language/Language.jsx"; // Language dropdown komponenti
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
} from "./style.js";

import Input from "../../components/Generic/Input/Input.jsx";
import Button from "../../components/Generic/Button/Button";
import CricleButton from "../../components/Generic/Button/CircleButton.jsx";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext"; // Tarjima uchun kontekst

const Login = () => {
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const { translate, setLanguage } = useLanguage(); // Tarjima funksiyasi

  const handleSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    console.log(username);
    console.log(password);

    setLoading(true);

    const onSuccess = (user) => {
      setTimeout(() => {
        setCookie("role", user?.role);
        setCookie("token", user?.token);
        setCookie("name", user?.name);
        setLoading(false);
        nav("/");
      }, 1000);
    };

    const onError = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    signIn(username, password, onSuccess, onError);
  };

  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
              <Language noText="true" imgIcon={Global} onChange={setLanguage} />
            </motion.div>
          </LanguageContainer>
        </ImageSection>

        {/* Right Section */}
        <FormSection>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TopTitle>{translate("welcome")} </TopTitle>
          </motion.p>

          <FormSectionBottom>
            <Title>{translate("login")}</Title>
            <Form name="login" onFinish={handleSubmit} layout="vertical">
              {/* Inputlar uchun motion */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Form.Item
                  label={translate("username")}
                  name="username"
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
                  name="password"
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
                  <a style={{ color: "#00000080" }} href="?forget-password">
                    {translate("forgot_password")}
                  </a>
                </Form.Item>
              </motion.div>
            </Form>

            <ButtonWrapper>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <CricleButton
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {}}
                  outline={true}
                  disabled={loading}
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
                  rmSectionBotck={() => {}}
                  disabled={loading}
                >
                  {translate("login_button")}
                </CricleButton>
              </motion.div>
            </ButtonWrapper>
          </FormSectionBottom>
        </FormSection>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
