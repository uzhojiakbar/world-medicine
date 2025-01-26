import React, { useState } from "react";
import {
  ButtonWrapper,
  Child,
  Con,
  Container,
  EditIconCon,
  IconWrap,
  Info,
  InfoContainer,
  InfoTitle,
  InfoWrapper,
  Item,
  ItemContainer,
  Line,
  Wrap,
  Wrapper,
} from "./style";
import { Title } from "../../root/style";
import { useLanguage } from "../../context/LanguageContext";
import Man from "../../assets/svg/Man";
import DateRangePicker from "../../components/Generic/DataRangePicker/DataRangePicker";
import DatePicker from "../DatePicker";
import PrimarySelect from "../../components/Generic/Select/Select";
import Button from "../../components/Generic/Button/Button";
import IconPlus from "../../assets/svg/IconPlus";

const CreateDogovor = () => {
  const { translate } = useLanguage();

  const [activeTab, setActiveTab] = useState("Рецепт");
  const [value, setValue] = useState(0);
  const titles = [
    translate("Рецепт"),
    translate("СУ"),
    translate("СБ"),
    translate("ГЗ"),
    translate("Кабинет вакцинации"),
  ];

  const preparats = [
    // { value: "Алтикам" },
    { value: "Артокол мазь" },
    { value: "Артокол уколы" },
    { value: "Ампилин" },
  ];

  const preparat = [
    { name: "Алтикам", number: "10" },
    { name: "Ампилин", number: "0" },
    { name: "Артокол мазь", number: "23" },
    { name: "Артокол уколы", number: "200" },
  ];

  return (
    <Container>
      <Wrapper>
        <Title>{translate("Создание договора")}</Title>

        <ButtonWrapper>
          {titles.map((tab) => (
            <Item
              key={tab}
              active={activeTab === tab ? "true" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Item>
          ))}
        </ButtonWrapper>

        <InfoWrapper>
          <InfoContainer>
            <Wrap>
              <Title size="24px">{translate("Кому")}</Title>
              <Con>
                <IconWrap>
                  <Man />
                </IconWrap>
                <InfoTitle>{translate("Ф.И.О. представителя")}</InfoTitle>
              </Con>
            </Wrap>
            <Wrap>
              <Title size="24px">{translate("Период выполнения")}</Title>
              <DatePicker />
            </Wrap>
            <Wrap>
              <Title size="24px">{translate("Выбрать препарат")}</Title>
              <PrimarySelect
                def={translate("Выбрать препарат")}
                options={preparats}
              />
            </Wrap>

            <Wrap>
              <Title size="24px">{translate("Цель")}</Title>
              <Info>
                <span>{translate("Шаг")}</span>
                <span>1.740.00</span>
              </Info>
            </Wrap>
          </InfoContainer>

          <InfoContainer>
            <Wrap>
              <Title size="24px">{translate("Выбрать препарат")}</Title>
              <PrimarySelect
                def={translate("Выбрать препарат")}
                options={preparats}
              />
            </Wrap>
            <Line />
            <Wrap>
              {preparat.map((v) => {
                return (
                  <ItemContainer>
                    <Child>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2 4.25797C2 3.935 2.23025 3.67318 2.51429 3.67318L4.29045 3.67287C4.64335 3.66269 4.95468 3.40754 5.07476 3.03007C5.07792 3.02014 5.08155 3.0079 5.09457 2.96348L5.1711 2.70236C5.21793 2.54226 5.25873 2.40277 5.31583 2.2781C5.54139 1.78556 5.95872 1.44353 6.44098 1.35597C6.56305 1.3338 6.69233 1.33389 6.84073 1.334H9.1594C9.3078 1.33389 9.43707 1.3338 9.55913 1.35597C10.0414 1.44353 10.4587 1.78556 10.6843 2.2781C10.7414 2.40277 10.7822 2.54226 10.829 2.70236L10.9055 2.96348C10.9185 3.0079 10.9222 3.02014 10.9253 3.03007C11.0455 3.40754 11.4185 3.66301 11.7714 3.67318H13.4857C13.7697 3.67318 14 3.935 14 4.25797C14 4.58094 13.7697 4.84276 13.4857 4.84276H2.51429C2.23025 4.84276 2 4.58094 2 4.25797Z"
                          fill="#FB3748"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.28354 7.655C6.55831 7.62606 6.80332 7.83713 6.83078 8.12633L7.16412 11.6351C7.19158 11.9243 6.99112 12.1823 6.71638 12.2112C6.4416 12.2401 6.19658 12.0291 6.1691 11.7399L5.83577 8.23106C5.80829 7.94186 6.00876 7.68393 6.28354 7.655Z"
                          fill="#FB3748"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.71637 7.655C9.9911 7.68393 10.1916 7.94186 10.1641 8.23106L9.83077 11.7399C9.8033 12.0291 9.5583 12.2401 9.2835 12.2112C9.00877 12.1823 8.8083 11.9243 8.83577 11.6351L9.1691 8.12633C9.19657 7.83713 9.44157 7.62606 9.71637 7.655Z"
                          fill="#FB3748"
                        />
                        <path
                          opacity="0.5"
                          d="M7.73032 14.6677H8.26952C10.1247 14.6677 11.0523 14.6677 11.6553 14.0771C12.2585 13.4865 12.3201 12.5177 12.4435 10.58L12.6213 7.78811C12.6883 6.73678 12.7218 6.21114 12.4192 5.87803C12.1167 5.54492 11.6057 5.54492 10.5839 5.54492H5.41595C4.3941 5.54492 3.88317 5.54492 3.58062 5.87803C3.27806 6.21114 3.31155 6.73678 3.37851 7.78811L3.55631 10.58C3.67972 12.5177 3.74142 13.4865 4.34451 14.0771C4.94761 14.6677 5.87518 14.6677 7.73032 14.6677Z"
                          fill="#FB3748"
                        />
                      </svg>
                      <span>{v.name}</span>
                    </Child>
                    <Child>
                      <span>{v.number}</span>
                      <EditIconCon onClick={() => {}}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.5"
                            d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                            fill={v.number >= 1 ? "grey" : "red"}
                          />
                          <path
                            d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                            fill={v.number >= 1 ? "grey" : "red"}
                          />
                        </svg>
                      </EditIconCon>
                    </Child>
                  </ItemContainer>
                );
              })}
            </Wrap>
          </InfoContainer>
        </InfoWrapper>
        <Button icon={<IconPlus />}>{translate("Создать договор")}</Button>
      </Wrapper>
    </Container>
  );
};

export default CreateDogovor;
