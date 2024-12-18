import React, { useState } from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import { StyledDatePicker } from "./style";
import CalendarIcon from "../../../assets/svg/CalendarIcon";

const GenericDatePicker = ({
  value,
  onChange,
  placeholder = "Выберите дату",
  format = "DD.MM.YYYY",
  icon = <CalendarIcon />,
  showicon = true,
  borderR,
}) => {
  const [tempValue, setTempValue] = useState(value); // Vaqtinchalik qiymatni saqlash uchun

  const handleDateChange = (date) => {
    if (date) {
      setTempValue(dayjs(date).format(format)); // Faqat vaqtinchalik o'zgarish
    } else {
      setTempValue(null); // Sana o'chirilgan
    }
  };

  const handleDateSelect = () => {
    // Faqat tanlanganda qiymatni onChange orqali uzatadi
    if (tempValue) {
      onChange(tempValue);
    }
  };

  return (
    <StyledDatePicker
      value={tempValue ? dayjs(tempValue, format) : null} // Vaqtinchalik qiymatni ko'rsatish
      onChange={handleDateChange}
      onOk={handleDateSelect} // Sana tanlanganda tasdiqlash
      format={format} // Ko'rsatish uchun format
      placeholder={placeholder}
      suffixIcon={showicon ? icon : ""} // Custom ikonka
      borderR={borderR}
    />
  );
};

export default GenericDatePicker;
