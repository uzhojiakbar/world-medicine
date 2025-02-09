import { Modal } from "antd";
import styled from "styled-components";

export const ModalContainerAdmin = styled(Modal)`
  width: ${({ w }) => (w ? `${w} !important ` : "70vw !important")};
  max-height: 90vh !important;
  overflow: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .ant-modal-close {
    display: none !important;
  }
`;

const Wrapper = styled.div``;

export default ModalContainerAdmin;
export { Wrapper };
