import {Button, Modal} from "antd";
import styled from "styled-components";
import ProfilePic1 from "../assets/img/profile/profile2.svg";
import { m } from "framer-motion";

export const ModalContainer = styled(Modal)`
    width: ${({ w }) => (w ? `${w} !important ` : "70vw !important")};
    max-height:${({maxheight})=>maxheight?maxheight:"95vh"} !important;
    height: ${({height})=>height?height:"fit-content"} !important;
    max-width: 1200px !important;
    overflow: auto;
    border-radius: ${({BorderRadius})=>BorderRadius?BorderRadius:"30px"};

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
    gap: ${({gap}) => gap?gap:"20px 10px"};
    
    margin-top: ${({ m }) => m ? m : "10px"};
    margin-bottom: ${({ mb }) => mb ? mb : "0"};
    grid-template-columns: repeat(${({ gridC }) => gridC ? gridC : 2}, 1fr);

    .cugzInputs{
        display: grid;    
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    @media (max-width: 1440px) {
        grid-template-columns: repeat(${({ gridC }) => gridC ? gridC : 1}, 1fr);        
    }
`;

export const ModalBodySection = styled.div`
    display: flex;
    flex-direction: ${({fd})=>fd?fd:"column"};
    justify-content: center;
    gap: 10px;
    height: ${({height}) => (height ? `${height}` : "103px")};

    .flexForSelectAndInput {
        display: grid;
        gap: 5px;

        grid-template-columns: 5fr 2fr;
    }
`;

export const ModalButtons = styled.div`
    
    cursor: pointer;
    display: flex;
    gap: ${({gap})=>gap?gap:"10px"};
    align-items: center;
    justify-content: center;
    
    width: fit-content;
    margin: 0 auto;
    // height: ${({height}) => (height ? `${height}` : "103px")};
`

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
    gap: ${({ gap }) => gap ? gap : "10px"};
    

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
    gap: 10px;


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
    margin-top: ${({ mt }) => mt ? mt : "0 auto"};
    margin: ${({ mt }) => mt ? mt : "0 auto"};
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


export const ContainerInner = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    border-radius: ${({ brdr }) => (brdr ? brdr : "57px")};
    background-color: #f7f8fc;

    position: relative;

    padding-right: ${({ rightIcon }) => (rightIcon ? "50px" : "0")};
    > .rightIcon {
        padding: 10px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
    }

    > .input {
        padding: 20px;
        width: 100%;
        height: 100%;
    }
`


export const SelectedMNNstyleContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 10px;
`

export const SelectedMNNstyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #216BF433;
    height: fit-content;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    
    .text{
        font-family: "Vela Sans GX ExtraBold";
        font-weight: 900;
        text-transform: capitalize;
    }
    
    transition: .2s;
    
    &:hover {
        color: white;
        background-color: #FB3748;
        .closeIcon path{
            fill: white;
        }
    }
`