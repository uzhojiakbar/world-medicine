import React, { useState } from "react";
import { Form, Input, Button } from "antd";
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
} from "./style.js";

const Login = () => {
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (values) => {
    const username = values.username;
    const password = values.password;

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
      transition={{ duration: 0.5 }}
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
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img
                src={LogoImg}
                alt="World Medicine Logo"
                width="120"
                height="40"
              />
            </motion.div>
          </LogoContainer>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          ></motion.div>
          <LanguageContainer>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Language imgIcon={Global} />
            </motion.div>
          </LanguageContainer>
        </ImageSection>

        {/* Right Section */}
        <FormSection>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Добро пожаловать в World Medicine
          </motion.p>

          <FormSectionBottom>
            <Title>Вход в аккаунт</Title>
            <Form
              name="login"
              onFinish={handleSubmit}
              layout="vertical"
              style={{ overflow: "hidden" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Form.Item
                  label="Логин, почта или номер телефона"
                  name="username"
                  rules={[{ required: true, message: "Введите логин!" }]}
                >
                  <Input placeholder="Введите логин" />
                </Form.Item>

                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[{ required: true, message: "Введите пароль!" }]}
                >
                  <Input.Password placeholder="Введите пароль" />
                </Form.Item>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Войти
                  </Button>
                </Form.Item>
                <Button type="link" block style={{ marginTop: "10px" }}>
                  Забыли пароль?
                </Button>
              </motion.div>
            </Form>
          </FormSectionBottom>
        </FormSection>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
