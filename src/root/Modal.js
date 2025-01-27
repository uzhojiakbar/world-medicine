import { Modal } from "antd";
import styled from "styled-components";
import ProfilePic1 from "../assets/img/profile/profile1.jpeg";

export const ModalContainer = styled(Modal)`
  width: ${({ w }) => (w ? `${w} !important ` : "70vw !important")};
  max-height: 90vh !important;
  overflow: auto;

  .ant-modal-close {
    display: none !important;
  }
`;

export const ModalNotificationCon = styled(Modal)`
  width: 400px;

  .ant-modal-close {
    display: none !important;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  > .closeIcon {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ModalBody = styled.div``;

export const ModalBodyHeader = styled.div`
  display: grid;
  gap: 20px 10px;
  grid-template-columns: repeat(2, 1fr);
`;

export const ModalBodySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  height: 103px;
`;

export const ModalSectionFull = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  height: 103px;
`;

export const ModalUserProfilePicture = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 60px;
  height: 60px;

  border-radius: 30px;
  background-color: lightgray;
  background-image: url(${({ pic }) => pic || ProfilePic1});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ModalInnerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > .fio {
    color: #000;
    font-family: "Vela Sans GX Regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
