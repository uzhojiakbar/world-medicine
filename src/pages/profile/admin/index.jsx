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

const Profile = () => {
  const [inputType, setInputType] = useState(true);

  const logout = useLogout();
  const nav = useNavigate();

  const handleLogout = () => {
    logout(() => {
      console.log("User logged out successfully");
      nav("/");
    });
  };

  const data = {
    status: "Главный администратор",
    privateData: "Личная информация",
    login: "Логин",
    email: "Почта",
    phone: "Телефон",
    password: "Пароль",
    restartPassword: "Сбросить пароль",
    createPassword: "Установить новый пароль",
  };

  const UserData = {
    userName: "koptleulovarslan111",
    email: "koptleulovarss@gmail.com",
    phoneNumber: "998993223222",
    password: "qwerty123",
  };

  return (
    <Wrapper>
      <Header>
        <UserDate>
          <ProfileImg src={img} alt="no img" />
          <UserName>
            Коптлеулов <br /> Арслан
          </UserName>
        </UserDate>
        <UserSetting>
          <ExitIcon onClick={handleLogout}>
            <Exit />
          </ExitIcon>
          <MainAdminButton>
            <MainAdmin /> <Item>{data.status}</Item>
          </MainAdminButton>
        </UserSetting>
      </Header>

      <FormWrapper>
        <MiniTitleSmall>{data.privateData}</MiniTitleSmall>
        <Section>
          <InputWrapper>
            <Name>{data.login}</Name>
            <Text>{UserData.userName}</Text>
          </InputWrapper>
          <InputWrapper>
            <Name>{data.email}</Name>
            <Text>{UserData.email}</Text>
          </InputWrapper>
          <InputWrapper>
            <Name>{data.phone}</Name>
            <Text>{formatPhoneNumber(UserData.phoneNumber)}</Text>
          </InputWrapper>
        </Section>
        <Text mt={"true"}>
          <Section>
            <MiniTitleSmall>{data.password}</MiniTitleSmall>
            <InputWrapper pad={"none"}>
              {/* <Name>{data.phone}</Name> */}

              <Input
                defaultValue={UserData.password}
                type={inputType ? "password" : "text"}
              />
              <ForSee onClick={() => setInputType(!inputType)} />
            </InputWrapper>
          </Section>
          <Section>
            <MiniTitleSmall>{data.restartPassword}</MiniTitleSmall>
            <ResetPassword pad={"none"}>{data.createPassword}</ResetPassword>
          </Section>
        </Text>
      </FormWrapper>
    </Wrapper>
  );
};

export default Profile;
