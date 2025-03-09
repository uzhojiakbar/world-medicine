import React, {useState} from "react";
import {DateContainer, DisplayText, StyledDatePicker} from "./style";
import dayjs from "dayjs";
import CalendarIcon from "../../../../../assets/svg/CalendarIcon";

const DateRangePicker = ({
                             icon = <CalendarIcon/>,
                             bgColor,
                             onDateChange = () => {
                             },
                             onlyFuture = false,
                             title = "",
                             startDateValue,
                             endDateValue
                         }) => {
    const [startDate, setStartDate] = useState(startDateValue ?startDateValue  :  null);
    const [endDate, setEndDate] = useState(endDateValue ? endDateValue : null);
    const [openPicker, setOpenPicker] = useState(null); // "start" yoki "end" holatlari

    const disablePastDates = (current) => {
        return current && current < dayjs().startOf("day");
    };

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
                        {title || "1212121"}
                    </div>
                    <div className="flex">
                        <div>
                            <span> С </span>
                            <span onClick={() => setOpenPicker("start")}>
                {formattedStartDate}
              </span>
                            <span> по </span>
                            <span onClick={() => setOpenPicker("end")}>{formattedEndDate}</span>
                        </div>
                        <div onClick={() => setOpenPicker("start")}>{icon}</div>
                    </div>
                </DisplayText>
            ) : (
                ""
            )
            }

            {
                openPicker === "start" && (
                    <StyledDatePicker
                        open
                        value={startDateValue ? null : startDate}
                        onChange={handleStartDateChange}
                        onOpenChange={(open) => !open && setOpenPicker(null)}
                        format="YYYY-MM-DD"
                        placeholder="Дата начала"
                        disabledDate={onlyFuture && disablePastDates}
                    />
                )
            }

            {
                openPicker === "end" && (
                    <StyledDatePicker
                        open
                        value={endDateValue ? null : endDate}
                        onChange={handleEndDateChange}
                        onOpenChange={(open) => !open && setOpenPicker(null)}
                        format="YYYY-MM-DD"
                        placeholder="Дата окончания"
                        disabledDate={onlyFuture && disablePastDates}
                    />
                )
            }
        </DateContainer>
    );
};

export default DateRangePicker;
