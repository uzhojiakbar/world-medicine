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
import {useQueryClient} from "@tanstack/react-query";


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

function Preparat() {
  const { data: dataDrugs, isLoading: loadingDrugs } = useGetDrugs();



  const [data, setData] = useState({
    thead: [
      "Препарат",
      "CIP",
      "Не более",
      "Рецептурник",
      {
        title: "СУ",
        child: ["Лимит", "Балл","Процент"],
      },
      {
        title: "СБ",
        child: ["Лимит", "Балл","Процент"],
      },
      {
        title: "ГЗ",
        child: ["Лимит", "Балл","Процент"],
      },
      {
        title: "КВ",
        child: ["Лимит", "Балл","Процент"],
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

  const [loading, setLoading] = useState(0);
  const [add, setAdd] = useState(true);

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
  const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

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
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
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

  const { translate } = useLanguage();

  console.log("data",data)
  console.log("data",data)


  const queryClient = useQueryClient();

  const handleRefresh = () => {
    setLoading(1);
    queryClient.invalidateQueries(["Drugs"]); // Ma'lumotlarni qayta yuklash

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
    setTimeout(() => {
      setLoading(0);
    }, 500);
  };

  return (
    <Container>
      <Filter />
      <Info />
      <TitleContainer>
        <Title>{translate("Условия_на_продукты")}</Title>
        <Box>
          <Text onClick={() => handleRefresh()}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.53033 2.46967C9.23744 2.17678 8.76256 2.17678 8.46967 2.46967C8.17678 2.76256 8.17678 3.23744 8.46967 3.53033L9.18934 4.25H9C4.71979 4.25 1.25 7.71979 1.25 12C1.25 16.2802 4.72011 19.75 9.00028 19.75H9.5C9.91421 19.75 10.25 19.4142 10.25 19C10.25 18.5858 9.91421 18.25 9.5 18.25H9.00028C5.54846 18.25 2.75 15.4517 2.75 12C2.75 8.54822 5.54822 5.75 9 5.75H11C11.3033 5.75 11.5768 5.56727 11.6929 5.28701C11.809 5.00676 11.7448 4.68417 11.5303 4.46967L9.53033 2.46967Z"
                  fill="black"
              />
              <path
                  opacity="0.5"
                  d="M14.5 4.25C14.0858 4.25 13.75 4.58579 13.75 5C13.75 5.41421 14.0858 5.75 14.5 5.75H15C18.4518 5.75 21.25 8.54822 21.25 12C21.25 15.4518 18.4518 18.25 15 18.25H13C12.6967 18.25 12.4232 18.4327 12.3071 18.713C12.191 18.9932 12.2552 19.3158 12.4697 19.5303L14.4697 21.5303C14.7626 21.8232 15.2375 21.8232 15.5304 21.5303C15.8232 21.2374 15.8232 20.7626 15.5304 20.4697L14.8107 19.75H15C19.2802 19.75 22.75 16.2802 22.75 12C22.75 7.71979 19.2802 4.25 15 4.25H14.5Z"
                  fill="black"
              />
            </svg>
            {translate("Обновить_базу")}
          </Text>

          <Button onClick={() => setAdd(1)} icon={<IconPlus/>}>
            {translate("Добавление_препората")}
          </Button>
          <Clear onClick={() => exportToExcel(data)}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  opacity="0.5"
                  d="M22 16.0006V15.0006C22 12.1721 21.9998 10.7584 21.1211 9.87966C20.2424 9.00098 18.8282 9.00098 15.9998 9.00098H7.99977C5.17135 9.00098 3.75713 9.00098 2.87845 9.87966C2 10.7582 2 12.1714 2 14.9984V15.0006V16.0006C2 18.829 2 20.2432 2.87868 21.1219C3.75736 22.0006 5.17157 22.0006 8 22.0006H16C18.8284 22.0006 20.2426 22.0006 21.1213 21.1219C22 20.2432 22 18.829 22 16.0006Z"
                  fill="#216BF4"
              />
              <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2V12.9726L9.56946 11.0119C9.29989 10.6974 8.82642 10.661 8.51192 10.9306C8.19743 11.2001 8.16101 11.6736 8.43057 11.9881L11.4305 15.4881C11.573 15.6543 11.781 15.75 12 15.75C12.2189 15.75 12.4269 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4305 11.0119L12.75 12.9726V2C12.75 1.58579 12.4142 1.25 12 1.25Z"
                  fill="#216BF4"
              />
            </svg>
          </Clear>
        </Box>
      </TitleContainer>
      <UsloviyaProductTable
        title={translate("Наименование_товара")}
        loading={loading || loadingDrugs}
        data={data}
      />
    </Container>
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


{/* <MainTable
        title={translate("Наименование_товара")}
        loading={loading}
        setLoading={setLoading}
        data={data}
      /> */}