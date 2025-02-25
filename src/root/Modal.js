import { Modal } from "antd";
import styled from "styled-components";
import ProfilePic1 from "../assets/img/profile/profile2.svg";
import {m} from "framer-motion";

export const ModalContainer = styled(Modal)`
    width: ${({w}) => (w ? `${w} !important ` : "70vw !important")};
    max-height: 90vh !important;
    max-width: 1200px !important;
    overflow: auto;
    background: white;

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

export const ModalBody = styled.div`
  display: flex;
  gap: 10px;
`;

export const ModalBodyHeader = styled.div`
    display: grid;
    gap: 20px 10px;
    
    margin-top: ${({m})=>m?m:"10px"};
    margin-bottom: ${({mb})=>mb?mb:"0"};
    grid-template-columns: repeat(${({gridC})=>gridC?gridC:2}, 1fr);
    
    @media (max-width: 1440px) {
        grid-template-columns: repeat(${({gridC})=>gridC?gridC:1}, 1fr);        
    }
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
    justify-content: space-between;
    gap: ${({gap}) => gap ? gap : "10px"};
    

    > .fio {
        color: #000;
        font-family: "Vela Sans GX Regular";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`;


export const DeleteBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;


    width: fit-content;
    height: 55px;
    background-color: ${({ bgcolor }) =>
            typeof bgcolor == "string" ? bgcolor : "#fb3748"};
    padding: 0 20px;
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
    color: ${({ color }) => (color ? color : "white")};
    border-radius: 50px;
    margin-top: ${({mt})=>mt?mt:"0 auto"};
    margin: ${({mt})=>mt?mt:"0 auto"};
    cursor: pointer;
    transition: filter 0.3s ease;
    font-family: "Vela Sans GX SemiBold";
    user-select: none;

    &:hover {
        filter: brightness(85%);
    }

    @media (max-width: 768px) {
        height: 45px;
        font-size: 12px;
    }
`;