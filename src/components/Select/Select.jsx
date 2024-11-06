import React from "react";
import { SelectContainer } from "./style";

const PrimarySelect = ({ def, options, onValueChange }) => {
  const handleValueChange = (value) => {
    onValueChange(value);
  };

  return (
    <>
      <SelectContainer
        defaultValue={def ? def : options[0].value}
        onChange={handleValueChange}
        options={
          options || [
            {
              value: "ERROR",
            },
            {
              value: "ERROR",
            },
          ]
        }
      />
    </>
  );
};

export default PrimarySelect;
