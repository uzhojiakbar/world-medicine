import React, { useState } from "react";
import { DatePicker } from "antd";
import { RangePickerCon } from "./style";

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const [dates, setDates] = useState([null, null]);

  const handleDateChange = (value) => {
    setDates(value);
  };

  return (
    <RangePickerCon
      value={dates}
      onChange={handleDateChange}
      format="DD.MM.YYYY"
      style={{ width: "100%" }}
    />
  );
};

export default DateRangePicker;
