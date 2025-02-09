import React from "react";
import { Container, FilterSection, FilterInput } from "./style.js";
import { TitleSmall } from "../../../../root/style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";
import DateRangePicker from "../../../../components/Generic/DataRangePicker/DataRangePicker.jsx";

const Filter = () => {
  return (
    <Container>
      <FilterSection>
        <Input type="text" placeholder="Название препарата" />
        <DateRangePicker />
      </FilterSection>
    </Container>
  );
};

export default Filter;
