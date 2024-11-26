import styled from "styled-components";
import { motion } from "framer-motion";

import LoginImg from "../../assets/LoginImg.svg";
import LoginBg from "../../assets/loginBg.png";

// Styled Components
const LoginContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  min-width: 320px;
  background: url(${LoginBg}) center center / cover no-repeat;
  margin: 0 auto;
  padding: 20px;
`;

const LoginWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 1200px;
  max-width: 1200px;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  @media (max-width: 1024px) {
    width: 90%;
    min-height: 600px;

    flex-direction: column; /* Tablet va mobil uchun ustma-ust joylashadi */
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 12px;
    min-height: 800px;
  }

  @media (max-width: 600px) {
    min-height: 800px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: url(${LoginImg}) center center / cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;

  border-radius: 40px;

  @media (max-width: 1024px) {
    backdrop-filter: blur(20px);
    border-radius: 0;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;

  border-radius: 40px;
  justify-content: space-between;
  padding: 30px;

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

const TopTitle = styled.div`
  font-family: "Vela Sans GX";
  font-weight: 400;
  font-size: 36px;
  line-height: 55px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  .select {
    display: none;
  }

  @media (max-width: 1024px) {
    .select {
      display: inline-block;
    }
  }

  @media (max-width: 768px) {
    font-size: 26px;
    line-height: 55px;
  }

  @media (max-width: 425px) {
    font-size: 24px;
  }
`;

const FormSectionBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;

  font-family: "Vela Sans GX Regular";
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 24px; /* Tablet uchun shrift kichraytiriladi */
  }

  @media (max-width: 768px) {
    font-size: 20px; /* Mobil uchun eng kichik shrift */
    margin-bottom: 20px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;

  img {
    width: 180px;
    height: auto;
  }

  @media (max-width: 1024px) {
    top: 10px;
    left: 10px;

    img {
      width: 150px; /* Tablet uchun kichikroq logo */
    }
  }

  @media (max-width: 768px) {
    img {
      width: 120px; /* Mobil uchun kichik logo */
    }
  }
`;

const LanguageContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  height: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
    height: 130px;
  }
`;

export {
  LoginContainer,
  LoginWrapper,
  ImageSection,
  FormSection,
  Title,
  LogoContainer,
  LanguageContainer,
  FormSectionBottom,
  TopTitle,
  ButtonWrapper,
};
