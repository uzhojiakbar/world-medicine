import { Modal } from "antd";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
  width: 70vw !important;

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
