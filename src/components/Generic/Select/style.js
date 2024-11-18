import { Select } from "antd";
import styled from "styled-components";

export const SelectContainer = styled(Select)`
  border-radius: 10px;
  display: inline-block;
  height: 60px;
  width: 100%;
  font-family: "Vela Sans GX", sans-serif !important;
  font-weight: 600 !important;

  .ant-select-selector {
    font-family: "Vela Sans GX", sans-serif !important; /* Asosiy tanlangan qiymat */
    font-weight: 800 !important;
    border: none !important;
    text-transform: capitalize;
    color: var(--black) !important; /* Text rangi */
    background-color: var(--bg-color) !important; /* Tanlanmagan fon rangi */
    height: 100%;
    display: flex;
    align-items: center; /* Vertikal markazlash */
  }

  .ant-select-arrow {
    font-size: 12px !important;
    color: var(--text-black) !important;
  }

  /* Dropdown uchun uslub */
  .ant-select-dropdown {
    font-family: "Vela Sans GX", sans-serif !important; /* Dropdown text */
    font-weight: 600 !important;
  }

  /* Dropdowndagi elementlar */
  .ant-select-item {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
  }

  /* Tanlangan dropdown elementi */
  .ant-select-item-option-selected {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 800 !important; /* Tanlangan element */
    background-color: var(--bg-color-selected) !important; /* Tanlangan fon */
  }

  /* Hover effekti */
  .ant-select-item-option-active {
    font-family: "Vela Sans GX", sans-serif !important;
    font-weight: 600 !important;
    background-color: var(--bg-hover) !important; /* Hover fon rangi */
  }
`;
