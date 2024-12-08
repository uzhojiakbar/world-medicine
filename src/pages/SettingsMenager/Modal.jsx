import React from "react";
import { ModalBody, ModalContainer, ModalHeader } from "../../root/Modal";
import { Title } from "../../root/style";
import { Managers } from "../../mock/managers";
import { message } from "antd";

const ModalManager = ({ id = 122, setId = () => {} }) => {
  let userId = Managers.filter((v) => {
    return v.id === id ? v : false;
  });

  userId = userId[0];
  console.log("YANGI ID", userId);

  return (
    <ModalContainer
      title={
        <ModalHeader>
          <Title>Управление менеджером</Title>
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
                stroke-width="2"
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
      <ModalBody></ModalBody>
    </ModalContainer>
  );
};

export default ModalManager;
