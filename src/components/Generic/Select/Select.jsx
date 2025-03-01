import React, {useState} from "react";
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {styled} from "@mui/system";
import ArrowDownSelect from "../../../assets/svg/ArrowDownSelect.jsx";
import ArrowUpSelect from "../../../assets/svg/ArrowUpSelect.jsx";

const StyledFormControl = styled(FormControl)(({borderRadius, bgColor}) => ({
    width: "100%",
    height: "60px",

    ".MuiOutlinedInput-root": {
        borderRadius: borderRadius || "10px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: bgColor || "#F7F8FC", // Background color
        "& fieldset": {
            borderColor: "transparent", // Border color
        },
        "&:hover fieldset": {
            borderColor: "transparent", // Border color on hover
        },
        "&.Mui-focused fieldset": {
            borderColor: "transparent", // Border color when focused
        },
    },
    ".MuiSelect-select": {
        fontFamily: '"Vela Sans GX", sans-serif',
        fontWeight: 600,
        padding: "10px 14px", // Padding inside the select
    },
    ".MuiSelect-icon": {
        fontSize: "22px",
        color: "#000",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
}));

const CustomArrowIcon = ({open}) => {
    return open ? (
        <ArrowUpSelect/>
    ) : (
        <ArrowDownSelect/>
    );
};

const PrimarySelect = ({
                           def,
                           borderRadius,
                           options,
                           onValueChange,
                           className,
                           bgColor,
                           disabled,
                           onClick = () => {
                           },
                           onlyOption = 0,
                           selectedOptionId = undefined,
                           selectedType = "value",
                           ref
                       }) => {

    const [open, setOpen] = useState(false);
    const handleValueChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find((option) =>
            (selectedType === "value" ?
                option.value : selectedType === "id"
                    ?
                    option.id : option.districtId)

                    === selectedValue);


        if (onlyOption) {
            // If onlyOption is set, pass the full option object
            if (onValueChange && selectedOption) onValueChange(selectedOption);
        } else {
            // Otherwise, just pass the value
            if (onValueChange && selectedValue) onValueChange(selectedValue);
        }
    };


    return (
        <StyledFormControl
            className={className}
            borderRadius={borderRadius} bgColor={bgColor}>
            {
                def ? <InputLabel>{def}</InputLabel> : ""
            }
            <Select
                ref={ref}
                defaultValue={selectedOptionId || undefined}
                onChange={handleValueChange}
                displayEmpty
                input={<OutlinedInput/>}
                disabled={disabled}
                onClick={onClick}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                IconComponent={() => <CustomArrowIcon open={open}/>}
            >
                <MenuItem value="" disabled>
                    {def}
                </MenuItem>
                {options?.length > 0 ? (
                    options.map((option) => (
                        <MenuItem key={option.value}
                                  value={
                                      selectedType === "value" ?
                                          option.value : selectedType === "id"
                                              ?
                                              option.id : option.districtId
                                  }>
                            {option.value}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem value="">Пусто</MenuItem>
                )}
            </Select>
        </StyledFormControl>
    );
};

export default PrimarySelect;
