import React from "react";
import {
  Container,
  Highlight,
  InfoWrapper,
  Item,
  SellWrap,
  Wrap,
  TitleSmall,
} from "./style";
import { Title } from "../../root/style";
import { useLanguage } from "../../context/LanguageContext";
import QuickAccess from "../admin/quickAccess/quickAccess";
import EyeIcon from "../../assets/svg/Eye";
import SystemIcon from "../../assets/svg/SystemIcon";
import { useNavigate } from "react-router-dom";
import AnalitikaManagerPage from "./analiktika";

const ManagerHome = () => {
  const { translate } = useLanguage();

  const nav = useNavigate();

  const data = [
    {
      id: 1,
      name: translate("Отчеты"),
      icon: <EyeIcon />,
      onclick: () => {
        nav("/reports-client");
      },
    },
    {
      id: 2,
      name: translate("Администрирование"),
      icon: <SystemIcon />,
      onclick: () => {
        nav("/database");
        console.log("button clickd");
      },
    },
    {
      id: 3,
      name: translate("Создать_договор"),
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M24 44C14.5719 44 9.85786 44 6.92894 41.071C4 38.1422 4 33.428 4 24C4 14.5719 4 9.85786 6.92894 6.92894C9.85786 4 14.5719 4 24 4C33.428 4 38.1422 4 41.071 6.92894C44 9.85786 44 14.5719 44 24C44 33.428 44 38.1422 41.071 41.071C38.1422 44 33.428 44 24 44Z"
            fill="#216BF4"
          />
          <path
            d="M24 16.5C24.8284 16.5 25.5 17.1716 25.5 18V22.5H30C30.8284 22.5 31.5 23.1716 31.5 24C31.5 24.8284 30.8284 25.5 30 25.5H25.5V30C25.5 30.8284 24.8284 31.5 24 31.5C23.1716 31.5 22.5 30.8284 22.5 30V25.5H18C17.1716 25.5 16.5 24.8284 16.5 24C16.5 23.1716 17.1716 22.5 18 22.5H22.5V18C22.5 17.1716 23.1716 16.5 24 16.5Z"
            fill="#216BF4"
          />
        </svg>
      ),
      onclick: () => {
        nav("create-contract");
      },
    },
    {
      id: 4,
      name: translate("Цель_представителю"),
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M24 44C35.0457 44 44 40.866 44 37C44 33.134 35.0457 30 24 30C12.9543 30 4 33.134 4 37C4 40.866 12.9543 44 24 44Z"
            fill="#216BF4"
          />
          <path
            d="M24.0005 2.5C24.8289 2.5 25.5004 3.17158 25.5004 4V6.07294L35.5159 11.0806L35.6238 11.1346C37.0928 11.8689 38.3448 12.4949 39.216 13.103C40.0996 13.7196 41.0285 14.615 41.0285 16C41.0285 17.385 40.0996 18.2804 39.216 18.897C38.3448 19.5051 37.0928 20.131 35.6238 20.8654L25.5004 25.927V36C25.5004 36.8284 24.8289 37.5 24.0005 37.5C23.172 37.5 22.5005 36.8284 22.5005 36V25.0324C22.4998 25.0116 22.4998 24.9906 22.5005 24.9698V7.03018C22.4998 7.00932 22.4998 6.98842 22.5005 6.9675V4C22.5005 3.17158 23.172 2.5 24.0005 2.5Z"
            fill="#216BF4"
          />
        </svg>
      ),
      onclick: () => {
        nav("purpose-med-agent");
        console.log("button clickd");
      },
    },
  ];

  return (
    <Container>
      <Title>{translate("Быстрый доступ")}</Title>
      <QuickAccess data={data} count={4} />

      <SellWrap>
        <Title>{translate("Цель")}</Title>
        <Wrap>
          <InfoWrapper>
            <TitleSmall size={"18px"}> {translate("Охват врачей")}</TitleSmall>
            <Item className="itemInner">
              <Highlight foiz={"20%"} />

              <TitleSmall size={"12px"}>{translate("Гинеколог")}</TitleSmall>
              <TitleSmall size={"12px"}>12 из 20</TitleSmall>
            </Item>
            <Item className="itemInner">
              <Highlight foiz={"60%"} />

              <TitleSmall size={"12px"}>{translate("Гинеколог")}</TitleSmall>
              <TitleSmall size={"12px"}>12 из 20</TitleSmall>
            </Item>
          </InfoWrapper>
          <InfoWrapper>
            <TitleSmall size={"18px"}>
              {" "}
              {translate("Заключение договоров")}
            </TitleSmall>
            <Item className="itemInner">
              <Highlight foiz={"40%"} />

              <TitleSmall size={"12px"}>{translate("Алтикам")}</TitleSmall>
              <TitleSmall size={"12px"}>12 из 20</TitleSmall>
            </Item>
            <Item className="itemInner">
              <Highlight foiz={"20%"} />
              <TitleSmall size={"12px"}>{translate("Амлипин")}</TitleSmall>
              <TitleSmall size={"12px"}>45 из 100</TitleSmall>
            </Item>
          </InfoWrapper>
        </Wrap>
      </SellWrap>
      <AnalitikaManagerPage />
    </Container>
  );
};

export default ManagerHome;
