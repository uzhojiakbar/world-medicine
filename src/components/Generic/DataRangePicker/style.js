// style.js
import styled from "styled-components";
import { DatePicker } from "antd";

export const DateContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const DisplayText = styled.div`
  font-size: 16px;
  font-family: "Vela Sans GX", sans-serif;
  color: #1e1e1e;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  gap: 5px;

  /* Placeholder uchun ochroq rang */
  .placeholder {
    color: #a0a0a0; /* Ochroq rang */
  }
`;

export const InputStyle = styled.div`
  font-size: 16px;
  font-family: "Vela Sans GX", sans-serif;
  color: #1e1e1e;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  gap: 5px;

  /* Placeholder uchun ochroq rang */
  .placeholder {
    color: #a0a0a0; /* Ochroq rang */
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  font-size: 16px;
  font-family: "Vela Sans GX", sans-serif;
  color: #1e1e1e;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 0 10px;

  height: 40px;
  width: 100%;

  /* Placeholder uchun ochroq rang */
  .placeholder {
    color: #a0a0a0; /* Ochroq rang */
  }
`;

export const PickerWrapper = styled.div``;
