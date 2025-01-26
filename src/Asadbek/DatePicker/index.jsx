import React, { useState } from "react";
import { DateContainer, DisplayText, StyledDatePicker } from "./style";
import dayjs from "dayjs";
// import CalendarIcon from "../assets/svg/CalendarIcon";
// import { useLanguage } from "../context/LanguageContext";
import CalendarIcon from "../../assets/svg/CalendarIcon";
import { useLanguage } from "../../context/LanguageContext";

// icon = <CalendarIcon />,
// suffixIcon={icon} // Custom ikonka

const DatePicker = ({ icon = <CalendarIcon /> }) => {
  const [startDate, setStartDate] = useState(null);
  const [openPicker, setOpenPicker] = useState(null); // "start" yoki "end" holatlarini boshqarish

  const { translate } = useLanguage();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setOpenPicker(null); // Boshlanish sanasi tanlangandan keyin kalendar yopiladi
  };

  // Default ko'rinish uchun qisqa formatlangan sanalar yoki ochroq matn
  const formattedStartDate = startDate ? (
    dayjs(startDate).format("DD.MM.YYYY")
  ) : openPicker === "start" ? (
    "" // Start date ochilganda matn bo'sh bo'ladi
  ) : (
    <span className="placeholder">{translate("Дата_начала")}</span>
  );

  return (
    <DateContainer>
      {/* Default holatda ko'rinish: "{startDate} (не обязательно) " */}
      {!openPicker ? (
        <DisplayText>
          <div onClick={() => setOpenPicker("start")}>
            <span>{formattedStartDate}</span>
            <span> {translate("(не обязательно)")} </span>
          </div>
          <div onClick={() => setOpenPicker("start")}>{icon}</div>
        </DisplayText>
      ) : (
        ""
      )}
      {/* Start Date Picker */}
      {openPicker === "start" && (
        <StyledDatePicker
          open
          value={startDate}
          onChange={handleStartDateChange}
          onOpenChange={(open) => !open && setOpenPicker(null)}
          format="DD.MM.YYYY"
          placeholder={translate("Дата_начала")}
        />
      )}
    </DateContainer>
  );
};

export default DatePicker;
