import React from "react";
import { Container, FilterSection, FilterInput } from "./style.js";

const Filter = ({ id }) => {
  return (
    <Container>
      <h1 style={{ fontSize: "24px", color: "#1f2937", marginBottom: "20px" }}>
        {id == 0
          ? "Поиск по фильтрам"
          : id == 1
          ? "Поиск выписок по фильтрам"
          : "salom"}
      </h1>
      <FilterSection>
        <FilterInput type="text" placeholder="Название препарата" />
        <FilterInput type="text" placeholder="Цена препарата" />
        <FilterInput type="text" placeholder="Балл препарата" />
      </FilterSection>
    </Container>
  );
};

export default Filter;
