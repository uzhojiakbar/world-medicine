import React from "react";
import { SelectContainer } from "./style";

const PrimarySelect = ({ def, options, onValueChange }) => {
  const handleValueChange = (value) => {
    if (onValueChange) onValueChange(value); // Callbackni chaqirish
  };

  return (
    <SelectContainer
      placeholder={def || "Выберите"} // Placeholder yoki default qiymat
      defaultValue={def || (options?.length > 0 ? options[0].value : undefined)}
      onChange={handleValueChange}
      options={options || []} // Agar options bo'lmasa, bo'sh massiv
    />
  );
};

export default PrimarySelect;
