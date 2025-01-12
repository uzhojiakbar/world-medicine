import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledFormControl = styled(FormControl)(({ borderRadius }) => ({
  width: "100%",
  height: "60px",
  ".MuiOutlinedInput-root": {
    borderRadius: borderRadius || "10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F7F8FC", // Background color
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
    fontSize: "14px",
    color: "#000",
  },
}));

const PrimarySelect = ({ def, borderRadius, options, onValueChange }) => {
  const handleValueChange = (event) => {
    const value = event.target.value;
    if (onValueChange) onValueChange(value);
  };

  return (
    <StyledFormControl borderRadius={borderRadius}>
      <InputLabel>{def}</InputLabel>
      <Select
        onChange={handleValueChange}
        displayEmpty
        input={<OutlinedInput />}
      >
        <MenuItem value="" disabled>
          {def}
        </MenuItem>
        {options?.length > 0 ? (
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
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
