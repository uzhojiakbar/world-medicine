import { useState } from "react";

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

const Profile = () => {
  const [inputType, setInputType] = useState(true);
  const { data: info, isLoading } = useGetProfileInfo();
  const [onChange, setOnChange] = useState(false)
  const [value, setValue] = useState("")
  const logout = useLogout();
  const nav = useNavigate();
  const [isOpen, setOpen] = useState(false)
  const handleLogout = () => {
    logout(() => {
      console.log("User logged out successfully");
      nav("/");
    });
  };

  const userRole = info?.role || Cookie.get("role");

  const { translate } = useLanguage();

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

  const UserData = {
    userName: "koptleulovarslan111",
    email: "koptleulovarss@gmail.com",
    phoneNumber: "998993223222",
    password: "1",
  };

  return (
    <Wrapper>
      {isLoading ? (
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
            {info?.firstName || data.status} <br />{" "}
            {info?.lastName || data.status}
          </UserName>
        </UserDate>
        <UserSetting>
          <ExitIcon onClick={handleLogout}>
            <Exit />
          </ExitIcon>
          <MainAdminButton>
            <MainAdmin />{" "}
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
            <MiniTitleSmall>{onChange ? translate("Текущий пароль") : data.password}</MiniTitleSmall>
            <InputWrapper pad={"none"} >
              {onChange ?

                <Input type={inputType ? "password" : "text"} value={value.length < 0 ? "" : value} onChange={(e) =>
                  setValue(e.target.value)
                } placeholder={translate("Текущий пароль")} /> : <Input
                  value={UserData.password}
                  type="password"
                  disabled
                />
              }
              <ForSee onClick={() => setInputType(!inputType)} />
            </InputWrapper>
          </Section>

          <Section btn="true" >
            <MiniTitleSmall>{data.restartPassword}</MiniTitleSmall>
            {
              onChange ?

                <ResetPassword pad={"none"} bgcolor={value.length > 0 ? "#216BF4" : "#4a6eb0"} onClick={() => {

                  if (value.length > 0 && value == UserData.password) {


                    setOnChange(!onChange)
                    setValue("")
                    setOpen(true)
                  } else message.error("Parol hato!")
                }}>{"Установить текущий пароль"}</ResetPassword>
                : <ResetPassword pad={"none"} onClick={() => setOnChange(true)} >{data.createPassword}</ResetPassword>
            }


          </Section>

        </Text>
      </FormWrapper>
    </Wrapper >
  );
};

export default Profile;


