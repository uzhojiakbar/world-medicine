import styled from "styled-components";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export const RangePickerCon = styled(RangePicker)`
  background-color: var(--bg-color);

  border-radius: 10px;
  height: 40px;
  width: 100%;
  font-size: 16px;

  font-family: "Vela Sans GX";
`;
