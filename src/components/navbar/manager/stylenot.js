import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  background: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
  width: 350px;
  z-index: 10000000;
  font-family: Arial, sans-serif;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    margin: 0;
    font-size: 22px;
    font-weight: 800;
    font-family: "Vela Sans GX", sans-serif;
  }

  .closeIcon {
    cursor: pointer;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #aaa;
`;

export const ModalContent = styled.div`
  padding-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
`;

export const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NotificationItem = styled.li`
  background-color: #f7f8fc;
  padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  user-select: text;

  span {
    color: #000;
    font-size: 12px;
  }
`;
