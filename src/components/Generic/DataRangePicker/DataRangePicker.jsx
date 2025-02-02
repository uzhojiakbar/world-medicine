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
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setStartDate(date);
    onDateChange({
      startDate: formattedDate,
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    });
    setOpenPicker(null);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setEndDate(date);
    onDateChange({
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: formattedDate,
    });
    setOpenPicker(null);
  };

  const formattedStartDate = startDate
    ? dayjs(startDate).format("YYYY-MM-DD")
    : "Дата начала";

  const formattedEndDate = endDate
    ? dayjs(endDate).format("YYYY-MM-DD")
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
          format="YYYY-MM-DD"
          placeholder="Дата начала"
        />
      )}

      {openPicker === "end" && (
        <StyledDatePicker
          open
          value={endDate}
          onChange={handleEndDateChange}
          onOpenChange={(open) => !open && setOpenPicker(null)}
          format="YYYY-MM-DD"
          placeholder="Дата окончания"
        />
      )}
    </DateContainer>
  );
};

export default DateRangePicker;
