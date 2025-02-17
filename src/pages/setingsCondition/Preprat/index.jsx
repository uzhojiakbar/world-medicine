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
import Server, { useGetDrugs } from "../../../utils/server/server";
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
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Препараты.xlsx");
  };
};

function Preparat() {
  const { data: dataDrugs, isLoading: loadingDrugs } = useGetDrugs();

  console.log(dataDrugs);

  const [data, setData] = useState({
    thead: [
      "Препарат",
      "CIP",
      "Не более",
      "Рецептурник",
      {
        title: "СУ",
        child: ["Лимит", "Балл"],
      },
      {
        title: "СБ",
        child: ["Лимит", "Балл"],
      },
      {
        title: "ГЗ",
        child: ["Лимит", "Балл"],
      },
      {
        title: "КВ",
        child: ["Лимит", "Балл"],
      },
    ],
    tbody: [
      // {
      //   id: 1,
      //   name: " Амлипин таблетки 5/10 мг",
      //   cip: "12 000",
      //   nebolshe: "-?%",
      //   Рецептурник: "7",
      //   СУ: {
      //     Лимит: "11",
      //     Балл: "5",
      //   },
      //   СБ: {
      //     Лимит: "11",
      //     Балл: "5",
      //   },
      //   ГЗ: {
      //     Лимит: "11",
      //     Балл: "5",
      //   },
      //   КВ: {
      //     Лимит: "11",
      //     Балл: "5",
      //   },
      // },
      // {
      //   "id": 1,
      //   "name": "Ношпа",
      //   "imageUrl": "string",
      //   "cip": 1,
      //   "quantity": 2,
      //   "prescription": 3,
      //   "volume": "4444",
      //   "type": "ITEM",
      //   "suPercentage": 5,
      //   "suLimit": 6,
      //   "suBall": 8,
      //   "sbPercentage": 10,
      //   "sbLimit": 12,
      //   "sbBall": 13,
      //   "gzPercentage": 124,
      //   "gzLimit": 15,
      //   "gzBall": 16,
      //   "kbPercentage": 17,
      //   "kbLimit": 18,
      //   "kbBall": 22
      // },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingDrugs) {
      const formattedTbody = dataDrugs.map((drug) => ({
        id: drug?.id,
        name: drug?.name,
        cip: drug?.cip,
        nebolshe: "-?%",
        Рецептурник: drug?.prescription,
        СУ: {
          Процент: drug?.suPercentage,
          Лимит: drug?.suLimit,
          Балл: drug?.suBall,
        },
        СБ: {
          Процент: drug?.sbPercentage,
          Лимит: drug?.sbLimit,
          Балл: drug?.sbBall,
        },
        ГЗ: {
          Процент: drug?.gzPercentage,
          Лимит: drug?.gzLimit,
          Балл: drug?.gzBall,
        },
        КВ: {
          Процент: drug?.kbPercentage,
          Лимит: drug?.kbLimit,
          Балл: drug?.kbBall,
        },
      }));

      setData((prevData) => ({
        ...prevData,
        tbody: formattedTbody,
      }));

      console.log("formatted", formattedTbody);
      console.log("data", data);
    }
  }, [dataDrugs]);

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

  const { translate } = useLanguage();

  console.log("data",data)
  console.log("data",data)
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
        loading={loadingDrugs}
        data={data}
      />
    </>
  );
}

export default Preparat;

// {
//   "createdAt": "2025-02-10",
//   "startDate": "2025-02-10",
//   "endDate": "2025-02-28",
//   "medAgentId": "375d9960-2a6a-4b34-a05a-4924763ab55b",
//   "districtId": 15,
//   "managerId": "1d9eb290-6780-47ad-8854-aa7659bb55b7",
//   "managerGoalId": 19,
//   "medicineWithQuantityDTOS": [
//     {
//       "medicineId": 17,
//       "medicineName": "Ношпа",
//       "quote": "50"
//     }
//   ],
//   "fieldWithQuantityDTOS": [
//     {
//       "id": 22,
//       "fieldName": "NEUROLOGIST",
//       "quote": "50"
//     }
//   ]
// }
