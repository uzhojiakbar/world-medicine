import React, { useState } from "react";
import { DateContainer, DisplayText, StyledDatePicker } from "./style";
import dayjs from "dayjs";
import CalendarIcon from "../../../assets/svg/CalendarIcon";

const DateRangePicker = ({
  icon = <CalendarIcon />,
  bgColor,
  onDateChange = () => {},
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openPicker, setOpenPicker] = useState(null); // "start" yoki "end" holatlari

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateChange({ startDate: date, endDate }); // Ikkita sanani qaytarish
    setOpenPicker(null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange({ startDate, endDate: date }); // Ikkita sanani qaytarish
    setOpenPicker(null);
  };

  const formattedStartDate = startDate
    ? dayjs(startDate).format("YYYY-DD-MM")
    : "Дата начала";

  const formattedEndDate = endDate
    ? dayjs(endDate).format("YYYY-DD-MM")
    : "Дата окончания";

  return (
    <DateContainer bgColor={bgColor}>
      {!openPicker ? (
        <DisplayText bgColor={bgColor}>
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

      {openPicker === "start" && (
        <StyledDatePicker
          open
          value={startDate}
          onChange={handleStartDateChange}
          onOpenChange={(open) => !open && setOpenPicker(null)}
          format="YYYY-DD-MM"
          placeholder="Дата начала"
        />
      )}

      {openPicker === "end" && (
        <StyledDatePicker
          open
          value={endDate}
          onChange={handleEndDateChange}
          onOpenChange={(open) => !open && setOpenPicker(null)}
          format="YYYY-DD-MM."
          placeholder="Дата окончания"
        />
      )}
    </DateContainer>
  );
};

export default DateRangePicker;
