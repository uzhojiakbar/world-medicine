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

const exportToExcel = (data) => {
  // 1. Jadval ma'lumotlarini tayyorlash
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // 2. Worksheetni workbookga qo'shish
  XLSX.utils.book_append_sheet(workbook, worksheet, "Продажи");

  // 3. Excel faylini yaratish
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // 4. Faylni saqlash
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "Места работы.xlsx");
};

function AdminMestaRabota() {
  const [data, setData] = useState([
    {
      id: 1,
      title: `Медицинский центр "Medion"`,
      subTitle: "Ташкент, Юнусабадский район"
    },
    {
      id: 2,
      title: `1 Городская общественная больница`,
      subTitle: "Ташкент, Юнусабадский район"
    },
    {
      id: 3,
      title: `2 Семейная поликлиника`,
      subTitle: "Ташкент, Юнусабадский район"
    },
    {
      id: 4,
      title: `Медецинский центр MClinic`,
      subTitle: "Ташкент, Юнусабадский район"
    },

  ]);
  const [loading, setLoading] = useState(false);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     setTimeout(async () => {
  //       const data = await Server.getMestaRabotaya();
  //       setData(data || []);
  //       setLoading(false);
  //     }, 300);
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // fetchData();
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
      <Container1>
        <Title>{translate("Места_работы")}</Title>
        <Box>
          <Text >
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

          <Button onClick={() => exportToExcel(data)} icon={<IconPlus />}>
            {translate("Добавить место работы")}
          </Button>
        </Box>
      </Container1>
      <MainTable loading={loading} setLoading={setLoading} data={data} />
    </>
  );
}

export default AdminMestaRabota;
