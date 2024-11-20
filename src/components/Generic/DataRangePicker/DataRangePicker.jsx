import React, { useState } from "react";
import { DateContainer, DisplayText, StyledDatePicker } from "./style";
import dayjs from "dayjs";
import CalendarIcon from "../../../assets/svg/CalendarIcon";

// icon = <CalendarIcon />,
// suffixIcon={icon} // Custom ikonka

const DateRangePicker = ({ icon = <CalendarIcon /> }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openPicker, setOpenPicker] = useState(null); // "start" yoki "end" holatlarini boshqarish

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
    <span className="placeholder">Дата начала</span>
  );

  const formattedEndDate = endDate ? (
    dayjs(endDate).format("DD.MM.YY")
  ) : openPicker === "end" ? (
    "" // End date ochilganda matn bo'sh bo'ladi
  ) : (
    <span className="placeholder">Дата окончания</span>
  );

  return (
    <DateContainer>
      {/* Default holatda ko'rinish: "С {startDate} по {endDate}" */}

      {!openPicker ? (
        <DisplayText>
          <div>
            <span> С </span>
            <span onClick={() => setOpenPicker("start")}>
              {formattedStartDate}
            </span>
            <span> по </span>
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
          placeholder="Дата начала"
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
          placeholder="Дата окончания"
        />
      )}
    </DateContainer>
  );
};

export default DateRangePicker;
