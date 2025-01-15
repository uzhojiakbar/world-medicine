import React, { useState } from "react";
import {
  ModalBody,
  ModalBodyHeader,
  ModalContainer,
  ModalHeader,
  ModalInnerSection,
} from "../../../../root/Modal";
import { MiniTitleSmall, Title, TitleSmall } from "../../../../root/style";

import { useLanguage } from "../../../../context/LanguageContext";

import styled from "styled-components";
import PrimarySelect from "../../../../components/Generic/Select/Select";
import { Viloyatlar } from "../../../../mock/data";
import Input2 from "../../../../components/Generic/Input/Input2";
import MiniTable from "./TableMini";
import { ButtonWrapper, Item } from "./style";
const dataRet = {};

const ModalSelectWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ModalDefinition = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f7f8fc;
  width: 100%;
  padding: 17px 20px;
  border-radius: 10px;
  > .closeIcon {
    height: 24px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  > .penIcon {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  transition: all 0.2s;
  &:hover {
    background-color: ${({ btn }) => btn && "#e2e2e4"};
    cursor: ${({ btn }) => btn && "pointer"};
  }
`;

const ModalDefinitionWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  justify-content: center;
`;

const ModalItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Wrap = styled.div`
  display: flex;
  gap: 10px;
`;

const Text = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 38px;
  font-weight: 700;
`;

const SubText = styled.div`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
`;

const ModalDogovor = ({ id = 454, setId = () => {} }) => {
  const [formData, setFormData] = useState({
    Район: "",
    ЛПУ: "",
    fullName: "",
    Специальность: "",
    Выписано: "",
  });
  const [activeTab, setActiveTab] = useState("Рецепт");

  const { translate } = useLanguage();
  const [preparat, setPreparat] = useState([
    translate("Алтикам"),
    translate("Ампилин"),
    translate("Артокол мазь"),
    translate("Артокол уколы"),
  ]);

  const titles = [
    translate("Рецепт"),
    translate("СУ"),
    translate("СБ"),
    translate("ГЗ"),
    translate("КВ"),
  ];

  return (
    <ModalContainer
      w={"50vw"}
      title={
        <ModalHeader>
          <Title>{translate("Поиск выписок по фильтрам")}</Title>
          <div onClick={() => setId(false)} className="closeIcon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                stroke="#808080"
                strokeWidth="2"
              />
              <path
                d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                fill="#808080"
              />
            </svg>
          </div>
        </ModalHeader>
      }
      open={id}
      onOk={() => setId(false)}
      onCancel={() => setId(false)}
      footer={[]}
      centered
    >
      <ModalDefinitionWrapper>
        <ModalBody>
          <ButtonWrapper>
            {titles.map((tab, i) => (
              <Item
                key={i}
                active={activeTab === tab ? "true" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Item>
            ))}
          </ButtonWrapper>
          <ModalDefinitionWrapper>
            <TitleSmall>{translate("Выбранные препараты")}</TitleSmall>
            <Wrap>
              {preparat.map((v, index) => {
                return (
                  <ModalDefinition>
                    <MiniTitleSmall>{v}</MiniTitleSmall>
                    <div
                      className="closeIcon"
                      onClick={() => {
                        setPreparat((prevPreparat) =>
                          prevPreparat.filter((v, i) => i !== index)
                        );
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M43 24C43 34.4933 34.4933 43 24 43C13.5066 43 5 34.4933 5 24C5 13.5066 13.5066 5 24 5C34.4933 5 43 13.5066 43 24Z"
                          stroke="#808080"
                          strokeWidth="2"
                        />
                        <path
                          d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0606 17.9393L24 21.8788L27.9394 17.9394C28.5252 17.3536 29.4748 17.3536 30.0606 17.9394C30.6464 18.5252 30.6464 19.4749 30.0606 20.0608L26.1214 24L30.0606 27.9392C30.6464 28.525 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.525 30.6464 27.9392 30.0606L24 26.1214L20.0608 30.0606C19.4749 30.6464 18.5252 30.6464 17.9394 30.0606C17.3536 29.4748 17.3536 28.5252 17.9394 27.9394L21.8788 24L17.9393 20.0606C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                          fill="#808080"
                        />
                      </svg>
                    </div>
                  </ModalDefinition>
                );
              })}
            </Wrap>
          </ModalDefinitionWrapper>
          <ModalDefinitionWrapper>
            <TitleSmall>{translate("Условия")}</TitleSmall>
            <ModalBodyHeader>
              <ModalDefinition>
                <ModalItem>
                  <MiniTitleSmall>
                    {"< = 60% "} {translate("квота")}
                  </MiniTitleSmall>
                  <Text>11%</Text>
                </ModalItem>
                <div className="penIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                      fill="#216BF4"
                    />
                    <path
                      d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                      fill="#216BF4"
                    />
                  </svg>
                </div>
              </ModalDefinition>

              <ModalDefinition>
                <ModalItem>
                  <MiniTitleSmall>
                    {"< = 60% "} {translate("квота")}
                  </MiniTitleSmall>
                  <Text>11%</Text>
                </ModalItem>
                <div className="penIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                      fill="#216BF4"
                    />
                    <path
                      d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                      fill="#216BF4"
                    />
                  </svg>
                </div>
              </ModalDefinition>

              <ModalDefinition>
                <ModalItem>
                  <MiniTitleSmall>
                    {"< = 60% "} {translate("квота")}
                  </MiniTitleSmall>
                  <Text>11%</Text>
                </ModalItem>
                <div className="penIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                      fill="#216BF4"
                    />
                    <path
                      d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                      fill="#216BF4"
                    />
                  </svg>
                </div>
              </ModalDefinition>

              <ModalDefinition>
                <ModalItem>
                  <MiniTitleSmall>
                    {"< = 60% "} {translate("квота")}
                  </MiniTitleSmall>
                  <Text>11%</Text>
                </ModalItem>
                <div className="penIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                      fill="#216BF4"
                    />
                    <path
                      d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                      fill="#216BF4"
                    />
                  </svg>
                </div>
              </ModalDefinition>

              <ModalDefinition>
                <ModalItem>
                  <MiniTitleSmall>
                    {"< = 60% "} {translate("квота")}
                  </MiniTitleSmall>
                  <Text>11%</Text>
                </ModalItem>
                <div className="penIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                      fill="#216BF4"
                    />
                    <path
                      d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                      fill="#216BF4"
                    />
                  </svg>
                </div>
              </ModalDefinition>

              <ModalDefinition>
                <ModalItem>
                  <MiniTitleSmall>
                    {"< = 60% "} {translate("квота")}
                  </MiniTitleSmall>
                  <Text>11%</Text>
                </ModalItem>
                <div className="penIcon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M20.8487 8.71306C22.3844 7.17735 22.3844 4.68748 20.8487 3.15178C19.313 1.61607 16.8231 1.61607 15.2874 3.15178L14.4004 4.03882C14.4125 4.0755 14.4251 4.11268 14.4382 4.15035C14.7633 5.0875 15.3768 6.31601 16.5308 7.47002C17.6848 8.62403 18.9133 9.23749 19.8505 9.56262C19.888 9.57563 19.925 9.58817 19.9615 9.60026L20.8487 8.71306Z"
                      fill="#216BF4"
                    />
                    <path
                      d="M14.4386 4L14.4004 4.03819C14.4125 4.07487 14.4251 4.11206 14.4382 4.14973C14.7633 5.08687 15.3768 6.31538 16.5308 7.4694C17.6848 8.62341 18.9133 9.23686 19.8505 9.56199C19.8876 9.57489 19.9243 9.58733 19.9606 9.59933L11.4001 18.1598C10.823 18.7369 10.5343 19.0255 10.2162 19.2737C9.84082 19.5665 9.43469 19.8175 9.00498 20.0223C8.6407 20.1959 8.25351 20.3249 7.47918 20.583L3.39584 21.9442C3.01478 22.0712 2.59466 21.972 2.31063 21.688C2.0266 21.4039 1.92743 20.9838 2.05445 20.6028L3.41556 16.5194C3.67368 15.7451 3.80273 15.3579 3.97634 14.9936C4.18114 14.5639 4.43213 14.1578 4.7249 13.7824C4.97307 13.4643 5.26165 13.1757 5.83874 12.5986L14.4386 4Z"
                      fill="#216BF4"
                    />
                  </svg>
                </div>
              </ModalDefinition>
            </ModalBodyHeader>
          </ModalDefinitionWrapper>
        </ModalBody>

        <ModalDefinitionWrapper>
          <ModalDefinition btn={"ture"}>
            <SubText>{translate("Сохранить изменения в шаблоне")}</SubText>
          </ModalDefinition>
        </ModalDefinitionWrapper>
      </ModalDefinitionWrapper>
    </ModalContainer>
  );
};

export default ModalDogovor;
