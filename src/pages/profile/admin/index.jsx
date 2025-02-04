import axios from "axios";
import { useState, useEffect } from "react";
import {
  ExitIcon,
  FormWrapper,
  Header,
  Input,
  InputWrapper,
  Item,
  MainAdminButton,
  Name,
  ProfileImg,
  ResetPassword,
  Section,
  Text,
  UserDate,
  UserName,
  UserSetting,
  Wrapper,
} from "./style.js";
import img from "../../../assets/img/profile/profile1.jpeg";
import Exit from "../../../assets/svg/exit.jsx";
import MainAdmin from "../../../assets/svg/mainAdmin.jsx";
import { MiniTitleSmall } from "../../../root/style";
import ForSee from "../../../assets/svg/see.jsx";
import { formatPhoneNumber } from "../../../utils/PhoneFormatter.js";
import useLogout from "../../../hooks/useLogOut.jsx";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { useGetProfileInfo } from "../../../utils/server/server.js";
import Cookie from "js-cookie";
import ModalResetPass from "./ModalResetPass.jsx";
import { message } from "antd";
import Instance from "../../../utils/Instance.js";

const Profile = () => {
  const [inputType, setInputType] = useState(true);
  const { data: info, isLoading } = useGetProfileInfo();
  const [onChange, setOnChange] = useState(false);
  const [value, setValue] = useState("");
  const logout = useLogout();
  const nav = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout(() => {
      console.log("User logged out successfully");
      nav("/");
    });
  };

  const { translate } = useLanguage();
  const userRole = info?.role || Cookie.get("role"); // Bu yerda info obyekti ichidan role olinadi

  const data = {
    CHIEF: translate("Главный_администратор"),
    status: translate("неизвестный"),
    ADMIN: translate("администратор"),
    MANAGER: translate("Менеджер"),
    privateData: translate("Личная_информация"),
    login: translate("Логин"),
    email: translate("Почта"),
    phone: translate("Телефон"),
    password: translate("password"),
    restartPassword: translate("Сбросить_пароль"),
    createPassword: translate("Установить_новый_пароль"),
  };

  // Parolni tekshirish va modal ochish
  const checkPassword = async () => {
    setLoading(true);
    try {
      const response = await Instance.get(
        `v1/user/password-compare?userId=${info?.userId}&password=${value}`
      );
      if (response.data === true) {
        localStorage.setItem("currentPassword", value);
        setOpen(true);
        setLoading(false);
        message.success(translate("пароль_правильный"));
      } else {
        message.error(translate("Пароль_неверный"));
        setLoading(false);
      }
    } catch (error) {
      console.error(translate("Проверка_пароля_не_удалась"), error);
      message.error(translate("Проверка_пароля_не_удалась"));
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {isLoading || loading ? (
        <div className="loaderParent">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
      <Header>
        <UserDate>
          <ProfileImg src={img} alt="no img" />
          <UserName>
            {info?.firstName || data.status} <br />
            {info?.lastName || data.status}
          </UserName>
        </UserDate>
        <UserSetting>
          <ExitIcon onClick={handleLogout}>
            <Exit />
          </ExitIcon>
          <MainAdminButton>
            <MainAdmin />
            <Item> {userRole ? data?.[userRole] : data?.status}</Item>
          </MainAdminButton>
        </UserSetting>
      </Header>
      <ModalResetPass isOpen={isOpen} setOpen={setOpen} />
      <FormWrapper>
        <MiniTitleSmall>{data.privateData}</MiniTitleSmall>
        <Section>
          <InputWrapper>
            <Name>{data.login}</Name>
            <Text>{info?.number || data.status}</Text>
          </InputWrapper>
          <InputWrapper>
            <Name>{data.email}</Name>
            <Text>{info?.email || data.status}</Text>
          </InputWrapper>
          <InputWrapper>
            <Name>{data.phone}</Name>
            <Text>{formatPhoneNumber(info?.number)}</Text>
          </InputWrapper>
        </Section>
        <Text mt={"true"}>
          <Section>
            <MiniTitleSmall>
              {onChange ? translate("Текущий пароль") : data.password}
            </MiniTitleSmall>
            <InputWrapper pad={"none"}>
              {onChange ? (
                <Input
                  type={inputType ? "password" : "text"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={translate("Текущий пароль")}
                />
              ) : (
                <Input value={value} type="password" disabled />
              )}
              <ForSee onClick={() => setInputType(!inputType)} />
            </InputWrapper>
          </Section>

          <Section btn="true">
            <MiniTitleSmall>{data.restartPassword}</MiniTitleSmall>
            {onChange ? (
              <ResetPassword
                pad={"none"}
                bgcolor={value.length > 0 ? "#216BF4" : "#4a6eb0"}
                onClick={() => {
                  checkPassword();
                }}
              >
                {"Установить текущий пароль"}
              </ResetPassword>
            ) : (
              <ResetPassword pad={"none"} onClick={() => setOnChange(true)}>
                {data.createPassword}
              </ResetPassword>
            )}
          </Section>
        </Text>
      </FormWrapper>
    </Wrapper>
  );
};

export default Profile;
