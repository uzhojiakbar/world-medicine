import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import { StyledDatePicker } from "./style";
import CalendarIcon from "../../../assets/svg/CalendarIcon";
import { useLanguage } from "../../../context/LanguageContext";

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
  const { translate } = useLanguage();

  useEffect(() => {
    setTempValue(value); // Tashqaridan kelgan qiymat o'zgarsa, yangilash
  }, [value]);

  const handleDateChange = (date) => {
    setTempValue(date ? dayjs(date).format(format) : null); // Faqat vaqtinchalik o'zgarish
    onChange && onChange(date ? dayjs(date).format(format) : null); // Foydalanuvchi hodisasini chaqirish
  };

  if (placeholder === "Выберите дату") {
    placeholder = translate ? translate("Выберите_дату") : placeholder;
  }

  const disabledDate = (current) => {
    // Bugungi kun va undan oldingi kunlar uchun false, kelajakdagi kunlar uchun true
    return current && current > dayjs().endOf("day");
  };

  return (
    <StyledDatePicker
      value={tempValue ? dayjs(tempValue, format) : null} // Vaqtinchalik qiymatni ko'rsatish
      onChange={handleDateChange}
      format={format} // Ko'rsatish uchun format
      placeholder={placeholder}
      suffixIcon={showicon ? icon : null} // Custom ikonka yoki hech narsa
      borderR={borderR}
      disabledDate={disabledDate} // disabledDate funksiyasini qo'shish
    />
  );
};

export default GenericDatePicker;
