import React from "react";
import ModalContainerAdmin, { Wrapper, } from "./ModalStyle";
import { Title } from "../../../root/style";
import { useLanguage } from "../../../context/LanguageContext";

const Modal = ({ id = 0, setId = () => { } }) => {
  const { translate } = useLanguage();


  return <ModalContainerAdmin open={id}
    onOk={() => setId(false)}
    onCancel={() => setId(false)}
    footer={[]}
    centered>
    <Wrapper>
      <Title>{translate("Договор №119")}</Title>
    </Wrapper>
  </ModalContainerAdmin>;
};

export default Modal;
