import React from "react";
import {
  CardWrapper,
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

const ManagerHome = () => {
  const { translate } = useLanguage();

  return (
    <Container>
      <Title>{translate("Быстрый доступ")}</Title>
      <Wrap>
        <CardWrapper>
          <TitleSmall size={"20px"}>{translate("Просмотр отчетов")}</TitleSmall>
          <div>
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M4 24C4 27.2788 4.84992 28.383 6.54978 30.5914C9.94392 35.0008 15.6362 40 24 40C32.3638 40 38.056 35.0008 41.4502 30.5914C43.15 28.383 44 27.2788 44 24C44 20.7212 43.15 19.6171 41.4502 17.4087C38.056 12.9991 32.3638 8 24 8C15.6362 8 9.94392 12.9991 6.54978 17.4087C4.84992 19.6171 4 20.7212 4 24Z"
                fill="#216BF4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.5 24C16.5 19.8579 19.8579 16.5 24 16.5C28.1422 16.5 31.5 19.8579 31.5 24C31.5 28.1422 28.1422 31.5 24 31.5C19.8579 31.5 16.5 28.1422 16.5 24ZM19.5 24C19.5 21.5148 21.5148 19.5 24 19.5C26.4852 19.5 28.5 21.5148 28.5 24C28.5 26.4852 26.4852 28.5 24 28.5C21.5148 28.5 19.5 26.4852 19.5 24Z"
                fill="#216BF4"
              />
            </svg>
          </div>
        </CardWrapper>
        <CardWrapper>
          <TitleSmall size={"20px"}>
            {translate("Управление системой")}
          </TitleSmall>
          <div>
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 40.4809C2 39.6413 2.6872 38.9609 3.53488 38.9609H44.4652C45.3128 38.9609 46 39.6413 46 40.4809C46 41.3203 45.3128 42.0009 44.4652 42.0009H3.53488C2.6872 42.0009 2 41.3203 2 40.4809Z"
                fill="#216BF4"
              />
              <path
                opacity="0.5"
                d="M7.38025 7.7808C5.58203 9.56158 5.58203 12.4277 5.58203 18.16V28.2934C5.58203 32.1148 5.58203 34.0256 6.78083 35.2128C7.97965 36.4 9.90913 36.4 13.7681 36.4H34.2332C38.0922 36.4 40.0216 36.4 41.2204 35.2128C42.4192 34.0256 42.4192 32.1148 42.4192 28.2934V18.16C42.4192 12.4277 42.4192 9.56158 40.621 7.7808C38.8228 6 35.9286 6 30.1402 6H17.8611C12.0727 6 9.17847 6 7.38025 7.7808Z"
                fill="#216BF4"
              />
              <path
                d="M17.8611 28.8008C17.0134 28.8008 16.3262 29.4814 16.3262 30.3208C16.3262 31.1602 17.0134 31.8408 17.8611 31.8408H30.1402C30.9878 31.8408 31.675 31.1602 31.675 30.3208C31.675 29.4814 30.9878 28.8008 30.1402 28.8008H17.8611Z"
                fill="#216BF4"
              />
            </svg>
          </div>
        </CardWrapper>
        <CardWrapper>
          <TitleSmall size={"20px"}>{translate("Создать договор")}</TitleSmall>
          <div>
            <svg
              width="44"
              height="44"
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
          </div>
        </CardWrapper>
        <CardWrapper>
          <TitleSmall size={"20px"}>{translate("Просмотр отчетов")}</TitleSmall>
          <div>
            <svg
              width="44"
              height="44"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M4 24C4 27.2788 4.84992 28.383 6.54978 30.5914C9.94392 35.0008 15.6362 40 24 40C32.3638 40 38.056 35.0008 41.4502 30.5914C43.15 28.383 44 27.2788 44 24C44 20.7212 43.15 19.6171 41.4502 17.4087C38.056 12.9991 32.3638 8 24 8C15.6362 8 9.94392 12.9991 6.54978 17.4087C4.84992 19.6171 4 20.7212 4 24Z"
                fill="#216BF4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.5 24C16.5 19.8579 19.8579 16.5 24 16.5C28.1422 16.5 31.5 19.8579 31.5 24C31.5 28.1422 28.1422 31.5 24 31.5C19.8579 31.5 16.5 28.1422 16.5 24ZM19.5 24C19.5 21.5148 21.5148 19.5 24 19.5C26.4852 19.5 28.5 21.5148 28.5 24C28.5 26.4852 26.4852 28.5 24 28.5C21.5148 28.5 19.5 26.4852 19.5 24Z"
                fill="#216BF4"
              />
            </svg>
          </div>
        </CardWrapper>
      </Wrap>
      <SellWrap>
        <Title>{translate("Быстрый доступ")}</Title>
        <Wrap>
          <InfoWrapper>
            <TitleSmall size={"18px"}> {translate("Охват врачей")}</TitleSmall>
            <Item>
              <Highlight foiz={"20%"} />

              <TitleSmall size={"12px"}>{translate("Гинеколог")}</TitleSmall>
              <TitleSmall size={"12px"}>12 из 20</TitleSmall>
            </Item>
            <Item>
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
            <Item>
              <Highlight foiz={"40%"} />

              <TitleSmall size={"12px"}>{translate("Алтикам")}</TitleSmall>
              <TitleSmall size={"12px"}>12 из 20</TitleSmall>
            </Item>
            <Item>
              <Highlight foiz={"20%"} />
              <TitleSmall size={"12px"}>{translate("Амлипин")}</TitleSmall>
              <TitleSmall size={"12px"}>45 из 100</TitleSmall>
            </Item>
          </InfoWrapper>
        </Wrap>
      </SellWrap>
    </Container>
  );
};

export default ManagerHome;
