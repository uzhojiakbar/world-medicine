import React, { useState, useEffect } from "react";
import {
  ButtonWrapper,
  Description,
  DisabledPage,
  FormSection,
  FormSection2,
  FormSectionBottom,
  ImageSection,
  LanguageContainer,
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
import ChangePassword from "./changePassword.jsx";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [isSucces, setSucces] = useState("1");
  const [loading, setLoading] = useState(false);
  const [smsCode, setSmsCode] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(120); // Vaqtni ikki minutdan boshlaymiz
  const [isCodeSent, setIsCodeSent] = useState(false); // SMS kodi yuborilganini tekshirish

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

  console.log(isCodeSent);

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
  const nav = useNavigate();

  const { translate, setLanguage } = useLanguage(); // Tarjima funksiyasi

  const handleSubmit = () => {
    if (smsCode.every((code) => code !== "")) {
      setSucces("2");
      setIsCodeSent(false);
      setCountdown(120);
    } else {
      message.error("SMS code ni kiriting!");
    }
  };

  const handleSendCode = () => {
    setIsCodeSent(true); // SMS kodi yuborilishini belgilash
    setCountdown(120); // Vaqtni 2 minutdan qayta boshlash
  };

  const handelBack = () => {
    nav("/");
  };

  return isSucces === "1" ? (
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
        <FormSection>
          <DisabledPage>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TopTitle>{translate("adminga")} </TopTitle>
            </motion.div>

            <ButtonWrapper grid="yeah">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <CricleButton
                  icon={<ArrowLeftOutlined />}
                  outline={true.toString()}
                  disabled={loading}
                  onClick={handelBack}
                >
                  {translate("back")}
                </CricleButton>
              </motion.div>
            </ButtonWrapper>
          </DisabledPage>
          <FormSection2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TopTitle>{translate("reset_account")} </TopTitle>
            </motion.div>

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
                    label={translate("username")}
                    name="username" // Form qiymati uchun `name`
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
                      type="number"
                      disabled={isCodeSent}
                      placeholder={translate("placeholder_username")}
                    />
                  </Form.Item>

                  {/* SMS Kiritish */}
                  <Form.Item label="СМС код">
                    <SMSInputWrapper>
                      {smsCode.map((digit, index) => (
                        <SMSInput
                          key={index}
                          name={`sms-${index}`}
                          maxLength={1}
                          value={digit}
                          placeholder="-"
                          required
                          disabled={!isCodeSent} // Bu yerda 0 ni `false` ga o'zgartirdim
                          inputMode="numeric" // Mobil qurilmalarda raqamli klaviaturani faollashtiramiz
                          onChange={(e) =>
                            handleSmsChange(index, e.target.value)
                          }
                        />
                      ))}
                    </SMSInputWrapper>
                  </Form.Item>

                  <Description type={"long"}>
                    Вам должен прийти 4-х значный смс код подтверждения
                  </Description>
                </motion.div>

                {/* SMS Kod yuborish tugmasi */}
                {!isCodeSent && (
                  <ButtonWithout onClick={handleSendCode}>
                    Отправить код
                  </ButtonWithout>
                )}

                {/* Vaqtni hisoblash va Orqaga yurish */}
                {isCodeSent && countdown > 0 && (
                  <ButtonWithout
                    onClick={() =>
                      message.error(
                        `${Math.floor(countdown / 60)}:${
                          countdown % 60
                        } daqiqa kuting`
                      )
                    }
                  >
                    {Math.floor(countdown / 60)} : {countdown % 60}
                  </ButtonWithout>
                )}

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
                      onClick={handelBack}
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
                      htmlType="submit" // Enter tugmasi bosilganda formni yuboradi
                      icon={<ArrowRightOutlined />}
                      iconRight="true"
                      disabled={loading}
                    >
                      {translate("login_button")}
                    </CricleButton>
                  </motion.div>
                </ButtonWrapper>
              </Form>
            </FormSectionBottom>
          </FormSection2>
        </FormSection>
      </LoginWrapper>
    </LoginContainer>
  ) : isSucces === "2" ? (
    <ChangePassword setSucces={setSucces} />
  ) : (
    ""
  );
};

export default ForgetPassword;
