import { DatePicker } from "antd";
import styled from "styled-components";

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  font-family: "Vela Sans GX", sans-serif !important;
  font-weight: 600 !important;

  background-color: var(--bg-color);

  border: none !important;
  outline: none !important;

  .ant-picker-input > input {
    font-weight: 600; /* Input text weight */
    font-size: 16px; /* Input text size */
    color: #1a1a1a !important; /* Input text color */

    font-family: "Vela Sans GX regular", sans-serif !important;

    &::placeholder {
      font-family: "Vela Sans GX ", sans-serif !important;

      color: #1a1a1a !important;
    }
  }
`;
