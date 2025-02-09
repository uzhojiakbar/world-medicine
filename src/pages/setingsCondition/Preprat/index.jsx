import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Generic/Button/Button";
import IconPlus from "../../../assets/svg/IconPlus";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { Title } from "../../../root/style";
import MainTable from "./Table";

import { saveAs } from "file-saver"; // file-saver kutubxonasini o'rnating
import * as XLSX from "xlsx";
import Server from "../../../utils/server/server";
import Filter from "./filter/Filter";
import UsloviyaProductTable from "./usloviyaProductTable.jsx";
import Info from "./Info/Info.jsx";

const exportToExcel = (data) => {
  // 1. Jadval ma'lumotlarini tayyorlash
  // const worksheet = XLSX.utils.json_to_sheet(data);
  // const workbook = XLSX.utils.book_new();

  // // 2. Worksheetni workbookga qo'shish
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Продажи");

  // // 3. Excel faylini yaratish
  // const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // // 4. Faylni saqlash
  // const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  // saveAs(blob, "Препараты.xlsx");

  // Yangi data ga most ravishda ozgarish

  const exportToExcel = (data) => {
    if (!data || !data.tbody || data.tbody.length === 0) {
      console.error("Jadvalda ma'lumot yo‘q!");
      return;
    }

    // 1. Ustun nomlarini tekis (flat) formatga o'tkazish
    const columns = ["Препарат", "CIP", "Не более", "Рецептурник"];
    const suKeys = [];

    data.thead.forEach((col) => {
      if (typeof col === "object") {
        col.child.forEach((child) => {
          suKeys.push(`${col.title} ${child}`);
          columns.push(`${col.title} ${child}`);
        });
      } else {
        columns.push(col);
      }
    });

    // 2. Ma'lumotlarni JSON formatga o'tkazish
    const formattedData = data.tbody.map((item) => {
      const row = {
        Препарат: item.name,
        CIP: item.cip,
        "Не более": item.nebolshe,
        Рецептурник: item.Рецептурник,
      };

      suKeys.forEach((key) => {
        const [suTitle, field] = key.split(" ");
        row[key] = item[suTitle]?.[field] || "";
      });

      return row;
    });

    // 3. Excelga o'tkazish
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Продажи");

    // 4. Faylni saqlash
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Препараты.xlsx");
  };

};

function Preparat() {
  const [data, setData] = useState({
    thead: ["Препарат", "CIP", "Не более", "Рецептурник",
      {
        title: "СУ",
        child: ["Лимит", "Балл"]
      },
      {
        title: "СУ",
        child: ["Лимит", "Балл"]
      },
      {
        title: "СУ",
        child: ["Лимит", "Балл"]
      },
      {
        title: "СУ",
        child: ["Лимит", "Балл"]
      },

    ],
    tbody: [
      {
        id: 1,
        name: " Амлипин таблетки 5/10 мг",
        cip: "12 000",
        nebolshe: "-?%",
        Рецептурник: "7",
        СУ: {
          Лимит: "11",
          Балл: "5"
        },
        СБ: {
          Лимит: "11",
          Балл: "5"
        },

        ГЗ: {
          Лимит: "11",
          Балл: "5"
        },
        КВ: {
          Лимит: "11",
          Балл: "5"
        },
      },

    ]
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const data = await Server.getPreparat();
        // setData(data || []);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Container1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 15px;
    }
  `;

  const Box = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;

    @media (max-width: 768px) {
      align-items: center;
      justify-content: center;

      flex-wrap: wrap;

      gap: 15px;
    }
  `;

  const Text = styled.p`
    background: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    cursor: pointer;
    align-items: center;

    @media (max-width: 480px) {
      padding: 8px 16px;
      font-size: 14px;
    }

    user-select: none;

    &:hover {
      opacity: 0.5;
    }
  `;

  const Clear = styled.div`
    background: white;
    padding: 20px;
    cursor: pointer;
    border-radius: 20px;

    color: #216bf4;

    user-select: none;

    @media (max-width: 480px) {
      padding: 8px;
      font-size: 14px;
    }

    &:hover {
      opacity: 0.8;
    }
  `;

  const nav = useNavigate();

  const { translate } = useLanguage();

  return (
    <>
      <Filter />
      <Info />
      <Container1>
        <Title>{translate("Условия на продукты")}</Title>

      </Container1>
      {/* <MainTable
        title={translate("Наименование_товара")}
        loading={loading}
        setLoading={setLoading}
        data={data}
      /> */}


      <UsloviyaProductTable
        title={translate("Наименование_товара")}
        loading={loading}
        setLoading={setLoading}
        data={data}
      />
    </>
  );
}

export default Preparat;
