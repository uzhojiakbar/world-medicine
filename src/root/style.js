import styled from "styled-components";
import { media } from "../utils/media";

export const MainContainer = styled.div`
  max-width: 1920px;
  min-width: 320px;
  width: 100vw;
  margin: 0 auto;
  min-height: 100vh;

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
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: 800;

  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.mobileL} {
    font-size: 28px;
  }
`;

export const TitleSmall = styled.div`
  font-size: 24px;
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

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  padding: 10px 40px;
`;
