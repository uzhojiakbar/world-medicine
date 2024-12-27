import React from "react";
import { Container, FilterSection, FilterInput } from "./style.js";
import { Title, TitleSmall } from "../../../root/style.js";
import Input from "../../../components/Generic/Input/Input.jsx";

const Filter = ({ id }) => {
  return (
    <Container>
      <TitleSmall>Поиск по фильтрам</TitleSmall>

      <FilterSection>
        <Input type="text" placeholder="Название препарата" />
        <Input type="text" placeholder="Цена препарата" />
        <Input type="text" placeholder="Балл препарата" />
      </FilterSection>
    </Container>
  );
};

export default Filter;
