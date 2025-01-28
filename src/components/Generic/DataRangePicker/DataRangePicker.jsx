import React, { useState } from "react";
import { DateContainer, DisplayText, StyledDatePicker } from "./style";
import dayjs from "dayjs";
import CalendarIcon from "../../../assets/svg/CalendarIcon";
import { useLanguage } from "../../../context/LanguageContext";

// icon = <CalendarIcon />,
// suffixIcon={icon} // Custom ikonka

const DateRangePicker = ({ icon = <CalendarIcon />, bgColor }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openPicker, setOpenPicker] = useState(null); // "start" yoki "end" holatlarini boshqarish

  const { translate } = useLanguage();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setOpenPicker(null); // Boshlanish sanasi tanlangandan keyin kalendar yopiladi
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setOpenPicker(null); // Tugash sanasi tanlangandan so'ng kalendar yopiladi
  };

  // Default ko'rinish uchun qisqa formatlangan sanalar yoki ochroq matn
  const formattedStartDate = startDate ? (
    dayjs(startDate).format("DD.MM.YY")
  ) : openPicker === "start" ? (
    "" // Start date ochilganda matn bo'sh bo'ladi
  ) : (
    <span className="placeholder">{translate("Дата_начала")}</span>
  );

  const formattedEndDate = endDate ? (
    dayjs(endDate).format("DD.MM.YY")
  ) : openPicker === "end" ? (
    "" // End date ochilganda matn bo'sh bo'ladi
  ) : (
    <span className="placeholder">{translate("Дата_окончания")}</span>
  );

  return (
    <DateContainer bgColor={bgColor}>
      {/* Default holatda ko'rinish: "С {startDate} по {endDate}" */}

      {!openPicker ? (
        <DisplayText bgColor={bgColor}>
          <div>
            <span> {translate("С")} </span>
            <span onClick={() => setOpenPicker("start")}>
              {formattedStartDate}
            </span>
            <span> {translate("по")} </span>
            <span onClick={() => setOpenPicker("end")}>{formattedEndDate}</span>
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
          bgColor={bgColor}
        />
      )}

      {/* End Date Picker */}
      {openPicker === "end" && (
        <StyledDatePicker
          open
          value={endDate}
          onChange={handleEndDateChange}
          onOpenChange={(open) => !open && setOpenPicker(null)}
          format="DD.MM.YYYY"
          placeholder={translate("Дата_окончания")}
        />
      )}
    </DateContainer>
  );
};

export default DateRangePicker;
