import React from "react";
import { Modal } from "antd";

const Modal2 = ({ isOpen, onClose }) => {
  return (
    <Modal title="Modal 2" open={isOpen} onOk={onClose} onCancel={onClose} footer={null}>
      <p>Bu Modal 2 tarkibi.</p>
      <p>Bu yerga kerakli ma'lumotni yozing.</p>
    </Modal>
  );
};

export default Modal2;
