import styled from "styled-components";
import { media } from "../utils/media";

export const MainContainer = styled.div`
  max-width: 1920px;
  min-width: 320px;
  width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 100px;
  padding-top: 160px;

  /* Ant Design Select component uchun umumiy uslublar */
  .ant-select {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
  }

  .ant-select-selector {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 800 !important;
    border: none !important;
    text-transform: capitalize;
    color: var(--black) !important; /* Text rangi */
    background-color: var(--bg-color) !important; /* Tanlanmagan fon rangi */
    display: flex;
    align-items: center; /* Vertikal markazlash */
    height: 100%; /* Selectning to‘liq balandligi */
  }

  .ant-select-arrow {
    font-size: 12px !important;
    color: var(--text-black) !important;
  }

  .ant-select-dropdown {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
  }

  .ant-select-item {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
  }

  .ant-select-item-option-selected {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 800 !important;
    background-color: var(--bg-color-selected) !important; /* Tanlangan fon */
  }

  .ant-select-item-option-active {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
    background-color: var(--bg-hover) !important; /* Hover fon rangi */
  }

  @media (max-width: 1024px) {
    padding: 0 50px;
    padding-top: 160px;
  }
  @media (max-width: 500px) {
    padding-left: 20px;
    padding-top: 160px;
  }
`;

export const Title = styled.div`
  font-size: ${({ size }) => (size ? size : "36px")};

  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  span{
    font-family: "Vela Sans GX", sans-serif;
  }

  ${media.mobileL} {
    font-size: 28px;
  }
`;

export const TitleSpan = styled.span`
  font-size: ${({ size }) => (size ? size : "36px")};
  font-weight: 800;

  font-family: "Vela Sans GX", sans-serif;

  ${media.mobileL} {
    font-size: 28px;
  }
`;
export const InformationTitleSpan = styled.span`
  font-size: ${({ size }) => (size ? size : "18px")};

  font-weight: 800;
  color: #7c7c7e;

  font-family: "Vela Sans GX", sans-serif;
  font-size: 16px;
  padding-bottom: 4px;

  ${media.mobileL} {
  }
`;

export const TitleSmall = styled.div`
  font-size: ${({ size }) => (size ? size : "24px")};
  font-weight: 700;
  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;

  > .rightBtn {
    cursor: pointer;
    padding: 0 5px;
    color: #0025a2;
  }
`;

export const MainWrapperGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "20px")};
`;

export const MiniTitleSmall = styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({mgn})=>mgn?mgn:"0"};
  

  > .rightBtn {
    cursor: pointer;
    padding: 0 5px;
    color: #0025a2;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  padding: 10px 40px;
`;

export const WhiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: #ffffff;
  border-radius: 30px;

  min-height: 500px;
  height: fit-content;
  width: 100%;

  padding: 20px;
`;
