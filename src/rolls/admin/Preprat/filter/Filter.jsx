import React from "react";
import { Container, FilterSection, FilterInput } from "./style.js";
import { TitleSmall } from "../../../../root/style.js";
import Input from "../../../../components/Generic/Input/Input.jsx";

const Filter = () => {
  return (
    <Container>
      <TitleSmall>Поиск выписок по фильтрам</TitleSmall>
      <FilterSection>
        <Input type="text" placeholder="Название препарата" />
        <Input type="text" placeholder="Квота" />
        <Input type="text" placeholder="Спецбал" />
      </FilterSection>
    </Container>
  );
};

export default Filter;
