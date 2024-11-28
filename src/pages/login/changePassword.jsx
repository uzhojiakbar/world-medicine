import React, { useState, useEffect } from "react";
import {
  ButtonWrapper,
  Description,
  FormSection,
  FormSectionBottom,
  ImageSection,
  LoginContainer,
  LoginWrapper,
  LogoContainer,
  SMSInput,
  SMSInputWrapper,
  TopTitle,
} from "./style";
import Global from "../../assets/Global.svg";
import LogoImg from "../../assets/logo-Banner.svg";
import Language from "../../components/Language/Language.jsx";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Form, message } from "antd";
import Input2 from "../../components/Generic/Input/Input";
import ButtonWithout from "../../components/Generic/ButtonWithout/index.jsx";
import CricleButton from "../../components/Generic/Button/CircleButton.jsx";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const ChangePassword = ({ isSucces, setSucces }) => {
  const [loading, setLoading] = useState(false);
  const [smsCode, setSmsCode] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(120); // Vaqtni ikki minutdan boshlaymiz
  const [isCodeSent, setIsCodeSent] = useState(false); // SMS kodi yuborilganini tekshirish
  const [number, setNumber] = useState("+998978222427"); // SMS kodi yuborilganini tekshirish

  useEffect(() => {
    let timer;
    if (countdown > 0 && isCodeSent) {
      // Vaqt hisoblash
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCodeSent(false); // Vaqt tugagach SMS kod yuborilishini tiklaymiz
    }

    return () => clearInterval(timer);
  }, [countdown, isCodeSent]);

  const handleSmsChange = (index, value) => {
    const newSmsCode = [...smsCode];
    newSmsCode[index] = value;
    setSmsCode(newSmsCode);

    // Fokusni keyingi inputga o'tkazish
    if (value && index < smsCode.length - 1) {
      const nextInput = document.querySelector(
        `input[name='sms-${index + 1}']`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const { translate, setLanguage } = useLanguage(); // Tarjima funksiyasi

  const handleSubmit = () => {
    setSucces("1");
  };

  const handleBack = () => {
    setSucces("1");
  };

  const handleSendCode = () => {
    setIsCodeSent(true); // SMS kodi yuborilishini belgilash
    setCountdown(120); // Vaqtni 2 minutdan qayta boshlash
  };

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
        </ImageSection>
        <FormSection>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TopTitle>Завершите настройку </TopTitle>
          </motion.div>

          <Description width={"100%"}>
            Вы были зарегистрированы администратором. Пожалуйста, смените
            временный пароль на ваш собственный.
          </Description>
          <FormSectionBottom>
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
                  label={"Придумайте новый пароль"}
                  name="phoneNumber" // Form qiymati uchun `name`
                  rules={[
                    {
                      required: true,
                      message: translate("placeholder_username"),
                    },
                  ]}
                  labelCol={{ span: 24 }} // Labelni to'liq kenglikka o'rnatish
                  wrapperCol={{ span: 24 }} // Inputni to'liq kenglikka o'rnatish
                >
                  <Input2
                    disabled={isCodeSent}
                    placeholder={translate("placeholder_username")}
                  />
                </Form.Item>

                {/* SMS Kiritish */}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Form.Item
                  label={"Подтвердите пароль"}
                  name="re_password" // Form qiymati uchun `name`
                  rules={[
                    {
                      required: true,
                      message: translate("placeholder_username"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(translate("password_mismatch"))
                        );
                      },
                    }),
                  ]}
                  labelCol={{ span: 24 }} // Labelni to'liq kenglikka o'rnatish
                  wrapperCol={{ span: 24 }} // Inputni to'liq kenglikka o'rnatish
                >
                  <Input2
                    disabled={isCodeSent}
                    placeholder={translate("placeholder_username")}
                  />
                </Form.Item>

                {/* SMS Kiritish */}
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
                    onClick={handleBack}
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
                    htmlType="submit"
                    onClick={() => console.log("2")}
                    disabled={loading}
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
  );
};

export default ChangePassword;
