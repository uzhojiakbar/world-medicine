import styled from "styled-components";
import {LoginContainer, TopTitle} from "../../pages/login/style";
import {motion} from "framer-motion";

export const DisabledPageContainer = styled(LoginContainer)`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center !important;
    gap: 24px !important;

    @media (max-width: 1024px) {
        padding: 40px; /* Tablet uchun padding */
        justify-content: flex-end;
        gap: 40px;
        border-radius: 0;
    }

    @media (max-width: 768px) {
        padding: 20px 20px;
        padding-top: 40px;

        width: 100%;
        height: 100%;
        justify-content: space-evenly;
    }
`;

export const DisabledPageContainerOuter = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);

  position: fixed;
  top: 0;
  left: 0;

  min-width: 100vw !important;

  min-height: 100vh !important;
  height: 100vh !important;

  z-index: 999999999999;

  border-radius: 40px;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;


export const Title = styled.div`
    font-family: "Vela Sans GX";
    font-size: 35px;
    line-height: 55px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    
`

export const Desc = styled.div`
    font-family: "Vela Sans GX Regular";
    font-size: 24px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    
`

export const TopTitleDisabled = styled(TopTitle)`
  color: red;
`;

export const Footer = styled(motion.div)`
    display: flex;
    gap: 20px;
    width: 100%;
    align-content: center;
    
    position: relative;
    
    height: 60px;
    
    .copy-link{
        width: 70% !important;
    }
`

export  const LanguageContainer = styled.div`
    background: white;
    padding: 13px;
    border-radius: 50%;
    z-index: 1;
    
    width:  60px;
    height: 60px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    .language-button{
        width:  30px;
        height: 30px;
    }
`;