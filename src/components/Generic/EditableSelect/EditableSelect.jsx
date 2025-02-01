import React, { useState, useRef } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  ListSubheader,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLanguage } from "../../../context/LanguageContext";
import { message } from "antd";

const StyledFormControl = styled(FormControl)(({ borderRadius, bgColor }) => ({
  width: "100%",
  borderRadius: borderRadius || "30px",
  backgroundColor: bgColor || "#F7F8FC",
  ".MuiOutlinedInput-root": {
    borderRadius: "30px",
    padding: "5px",
    backgroundColor: "#F7F8FC",
  },
  ".MuiSelect-select": {
    fontWeight: 600,
    padding: "12px 16px",
    fontSize: "16px",
  },
}));

const StyledSearchInput = styled(OutlinedInput)({
  height: "35px",
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
  options = [],
  initialValue = {},
  onValueChange,
  bgColor,
  disabled,
}) => {
  const [value, setValue] = useState(initialValue);
  const searchTermRef = useRef(""); // Qidiruv termi uchun ref
  const { translate } = useLanguage();

  const handleSearchChange = (event) => {
    searchTermRef.current = event.target.value; // Faqat refni yangilaymiz
  };

  const handleValueChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    setValue(selectedOption);
    if (onValueChange) onValueChange(selectedOption); // To‘liq ma’lumotni qaytaradi
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option?.label?.toLowerCase().includes(searchTermRef.current.toLowerCase())
  );

  return (
    <StyledFormControl borderRadius={borderRadius} bgColor={bgColor}>
      <Select
        value={value?.value || ""}
        onChange={handleValueChange}
        onClick={() =>
          disabled ? message.error(translate("Сначала_выберите_регион")) : ""
        }
        displayEmpty
        input={<OutlinedInput />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 220,
              width: 250,
              borderRadius: "20px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
        renderValue={(selected) => (selected ? value.label || def : def)}
        disabled={disabled}
      >
        {/* Search Field Inside Dropdown */}
        <ListSubheader>
          <StyledSearchInput
            placeholder="Поиск..."
            defaultValue={searchTermRef.current}
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
          <MenuItem disabled>{translate("notInformation")}</MenuItem>
        )}
      </Select>
    </StyledFormControl>
  );
};

export default EditableSelectWithSearch;
