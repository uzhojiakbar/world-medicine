import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  ListSubheader,
} from "@mui/material";
import { borderColor, styled } from "@mui/system";
import { useLanguage } from "../../../context/LanguageContext";

const StyledFormControl = styled(FormControl)(({ borderRadius, bgColor }) => ({
  width: "100%",
  borderRadius: borderRadius || "30px", // Yumaloq burchaklar
  backgroundColor: bgColor || "#F7F8FC",
  borderColor: "red",
  ".MuiOutlinedInput-root": {
    borderRadius: "30px", // Yumaloq burchaklar
    padding: "5px",
    backgroundColor: "#F7F8FC",
  },
  ".MuiSelect-select": {
    fontWeight: 600,
    padding: "12px 16px",
    borderColor: "transparent",
    fontSize: "16px",
  },
}));

const StyledSearchInput = styled(OutlinedInput)({
  height: "35px", // Kichikroq balandlik
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  fontSize: "14px",
  marginBottom: "8px",
  border: "1px solid #dcdcdc",
  padding: "4px 10px",
  "&:hover": {
    borderColor: "#b3b3b3",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const EditableSelectWithSearch = ({
  def,
  borderRadius,
  options,
  initialValue = "",
  onValueChange,
  bgColor,
}) => {
  const [value, setValue] = useState(initialValue);
  const [searchTerm, setSearchTerm] = useState("");
  const { translate } = useLanguage();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleValueChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    if (onValueChange) onValueChange(selectedValue);
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledFormControl borderRadius={borderRadius} bgColor={bgColor}>
      <Select
        value={value}
        onChange={handleValueChange}
        displayEmpty
        input={<OutlinedInput />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 220,
              width: 250,
              borderRadius: "20px", // Dropdown uchun yumaloq burchaklar
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
        renderValue={(selected) => (selected ? selected : def)}
      >
        {/* Search Field Inside Dropdown */}
        <ListSubheader>
          <StyledSearchInput
            placeholder="Поиск..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
        </ListSubheader>

        {/* Options */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label || option.value}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled> {translate("notInformation")}</MenuItem>
        )}
      </Select>
    </StyledFormControl>
  );
};

export default EditableSelectWithSearch;
