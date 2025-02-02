import {
    ModalBody,
    ModalContainer,
} from "../../../root/Modal";
import { useLanguage } from "../../../context/LanguageContext";
import styled from "styled-components";
import { Input, Input2, InputWrapper, ResetPassword } from "./style";
import { useRef, useState } from "react";
import { message } from "antd";
import ForSee from "../../../assets/svg/see";

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* margin-top: 20px; */

    padding: 17px 20px;
    border-radius: 10px;
    background: #F7F8FC;
    > .dfn {
        color: #000;
        font-size: 16px;
        font-weight: 400;
    }
    > .inputWrapp {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
        @media (max-width: 768px){
            flex-direction: column;
        }
    }
`

const Title = styled.p`
    font-size: 36px;
    font-weight: 400;
`


//generic modal error and successful

const ModalSuccessful = ({ isOpen, setOpen = () => { } }) => {
    const { translate } = useLanguage();
    const [pass, setPass] = useState({ newPass: "", curPass: "", newPassType: false, curPassType: false })
    const [check, setCheck] = useState(false)
    const [inputType, setInputType] = useState(true);


    const rePassHandle = () => {
        if (pass?.newPass === pass?.curPass && pass?.newPass?.length > 5) {
            setCheck(true)
            setOpen(false)
            setPass({ newPass: "", curPass: "", newPassType: false, curPassType: false })
        }
        else message.error(translate("parollar bir xil bolsin va minimal 6 xonadan iborat bolishi kerak"))

    }



    return (
        <ModalContainer
            w={"50vw"}
            open={isOpen}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={[]}
            centered
        >
            <InfoContainer>
                <div>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5" d="M44 24C44 12.9543 35.0456 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0456 12.9543 44 24 44C35.0456 44 44 35.0456 44 24Z" fill="#FB3748" />
                        <path d="M24 12.5C24.8284 12.5 25.5 13.1716 25.5 14V26C25.5 26.8284 24.8284 27.5 24 27.5C23.1716 27.5 22.5 26.8284 22.5 26V14C22.5 13.1716 23.1716 12.5 24 12.5Z" fill="#FB3748" />
                        <path d="M24 34C25.1046 34 26 33.1046 26 32C26 30.8954 25.1046 30 24 30C22.8954 30 22 30.8954 22 32C22 33.1046 22.8954 34 24 34Z" fill="#FB3748" />
                    </svg>

                </div>
                <Title>{translate("Вы уверены что хотите сбросить пароль")}?</Title>
                <div size={"16px"} className="dfn">
                    {translate("После вы получите временный пароль, который нужно будет сменить после входа в аккаунт")}.
                </div>

                <div className="inputWrapp">
                    <InputWrapper pad={"none"} bgcolor="white">
                        <Input type={pass?.newPassType ? "password" : "text"} value={pass?.newPass?.length < 0 ? "" : pass?.newPass} onChange={(e) => setPass({ ...pass, newPass: e.target.value })} placeholder={translate("Текущий пароль")} />

                        <ForSee onClick={() => setPass({ ...pass, newPassType: !pass?.newPassType })} />
                    </InputWrapper>
                    <InputWrapper pad={"none"} bgcolor="white">
                        <Input type={pass?.curPassType ? "password" : "text"} value={pass?.curPass?.length < 0 ? "" : pass.curPass} onChange={(e) => setPass({ ...pass, curPass: e.target.value })} placeholder={translate("Текущий пароль")} />

                        <ForSee onClick={() => setInputType(setPass({ ...pass, curPassType: !pass?.curPassType }))} />
                    </InputWrapper>
                </div>
            </InfoContainer>
            <ModalBody>
                {/* <div> */}
                <ResetPassword color="black" bgcolor="#F7F8FC" onClick={() => {
                    setCheck(true)
                    setOpen(false)
                    setPass({ newPass: "", curPass: "", newPassType: false, curPassType: false })
                }}>
                    {translate("Отменить")}
                </ResetPassword>
                <ResetPassword onClick={() => rePassHandle()} bgcolor={
                    pass?.curPass <= 0 || pass?.curPass != pass?.newPass ? "#f77682" : "#fb3748"
                } >
                    {translate("Сбросить и получить новый пароль")}
                </ResetPassword>
                {/* </div> */}

            </ModalBody>
        </ModalContainer>
    );
};

export default ModalSuccessful;
