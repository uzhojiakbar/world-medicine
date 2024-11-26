import styled from "styled-components";
import { motion } from "framer-motion";

import LoginImg from "../../assets/LoginImg.svg";

// Styled Components
const LoginContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  min-width: 320px;
  background: linear-gradient(135deg, #e3f2fd, #f0f4c3);
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LoginWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 1200px;
  max-width: 1200px;
  height: 600px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;

  @media (max-width: 1024px) {
    width: 90%;
    height: auto;
    flex-direction: column; /* Tablet va mobil uchun ustma-ust joylashadi */
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 12px;
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

  @media (max-width: 1024px) {
    height: 250px; /* Tablet uchun balandlik */
  }

  @media (max-width: 768px) {
    height: 0; /* Mobil uchun balandlik */
    display: none;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    padding: 40px; /* Tablet uchun padding */
  }

  @media (max-width: 768px) {
    padding: 20px; /* Mobil uchun kichikroq padding */
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

  font-family: "Vela Sans GX";
  font-weight: 500;

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

  @media (max-width: 1024px) {
    top: 10px;
    right: 10px;
  }

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
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
};
