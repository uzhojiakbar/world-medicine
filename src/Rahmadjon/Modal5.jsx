import React, { useState } from "react";
import {
  Container,
  Header,
  Grid,
  Subtext,
  Field,
  Fotercontainer,
  FooterButtons,
  IMG,
  ImgContainer,
  HR,
  PageContainer,
  GridContainer,
  Card,
  SubTitle,
  RemoveSection,
  KvotaContainer,
  KvotaCard,
} from "./Style";
import styled from "styled-components";
import { Modal } from "antd";
import ModalLogin from "./modalLogin";
import GoalSection from "./GoalSection";
import { modal1Data } from "./modalData";
import { modal3data } from "./modalData";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 24px;
    width: 900px;
  }
`;

const Modal5 = ({ isOpen, onClose }) => {
  const kvotadata = [
    {
      id: 1,
      title: "Квота",
      name: "500 000",
    },
    {
      id: 2,
      title: "Продажи",
      name: "400 000",
    },
    {
      id: 3,
      title: "%",
      name: "70%",
    },
  ];

  return (
    <Modal
      title="Modal 1"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      <StyledModal
        title={null}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={800}
      >
        <Container>
          <Header>Запрос на договор</Header>

          <Grid>
            <Field>
              <p>Врач</p>
              <ImgContainer>
                <IMG
                  src="data:image/png;base64,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"
                  alt=""
                />
                <Subtext>{modal1Data.doctorName}</Subtext>
              </ImgContainer>
            </Field>
            <Field>
              <p>Место работы</p>
              <Subtext>
                {modal1Data.workplace} <i className="fa-solid fa-pen"></i>
              </Subtext>
            </Field>
            <Field>
              <p>Дата регистрации</p>
              <Subtext>{modal1Data.registrationDate}</Subtext>
            </Field>
            <Field>
              <p>Контакты врача</p>
              <Subtext>
                {modal1Data.contact} <i className="fa-solid fa-pen"></i>
              </Subtext>
            </Field>
          </Grid>

          <HR />

          <ModalLogin />

          <KvotaContainer>
            {kvotadata.map((item) => (
              <KvotaCard key={item.id}>
                <p>{item.title}</p>
                <h2>{item.name}</h2>
              </KvotaCard>
            ))}
          </KvotaContainer>

          <PageContainer>
            <SubTitle>Выполнение KPI</SubTitle>

            <GridContainer>
              {modal3data.map((item, index) => (
                <Card key={index}>
                  <p>{item.title}</p>
                  <h2>{item.value}</h2>
                </Card>
              ))}
            </GridContainer>
          </PageContainer>
          <HR />

          <GoalSection />

          <HR />
          <Fotercontainer>
            <h2> Удаление мед. представилетя</h2>
            <RemoveSection>
              <button>Удалить мед. представилетя</button>
            </RemoveSection>
          </Fotercontainer>
        </Container>
      </StyledModal>
    </Modal>
  );
};

export default Modal5;
