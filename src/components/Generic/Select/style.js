import { Select } from "antd";
import styled from "styled-components";

export const SelectContainer = styled(Select)`
  border-radius: 10px;
  width: 100%;
  height: 60px;
  font-family: "Vela Sans GX", sans-serif !important;
  font-weight: 600 !important;

  /* Tanlangan qiymat matni */
  .ant-select-selection-item {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
    color: #1a1a1a !important; /* Tanlangan qiymat uchun matn rangi */
  }

  /* Arrow uchun */
  .ant-select-arrow {
    font-size: 14px !important;
    color: var(--text-black, #000) !important;
  }
`;
