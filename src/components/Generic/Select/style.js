import { Select } from "antd";
import styled from "styled-components";

export const SelectContainer = styled(Select)`
  width: 100%;
  height: 60px;
  overflow-y: auto; /* Skroll qilish uchun */

  font-family: "Vela Sans GX", sans-serif !important;
  font-weight: 600 !important;

  .ant-select-selector {
    border-radius: ${({ borderRadius }) =>
      borderRadius ? `${borderRadius} !important` : "10px !important"};
    height: 100%; /* Select balandligini to'liq o'zlashtiradi */
  }

  .ant-select-selection-item {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
    color: #1a1a1a !important; /* Tanlangan qiymat uchun matn rangi */
  }

  .ant-select-arrow {
    font-size: 14px !important;
    color: var(--text-black, #000) !important;
  }
`;
