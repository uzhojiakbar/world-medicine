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
import Server, { useDeleteWorkplace, useGetWorkplacesDb } from "../../../utils/server/server";
import { useQueryClient } from "@tanstack/react-query";
import RefReshIcon from "../../../assets/svg/RefreshIcon.jsx";

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
  const [loading, setLoading] = useState(false);

  const { data: workplaces, isLoading: isloadingWorkplaces } =
    useGetWorkplacesDb();
  const queryClient = useQueryClient();


  console.log("WORKPLACES: ", workplaces);

  const handleRefresh = () => {
    setLoading(1);
    queryClient.invalidateQueries(["getWorkplacec"]); // Ma'lumotlarni qayta yuklash
    setTimeout(() => {
      setLoading(0);
    }, 100);
  };

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

  const { translate } = useLanguage();

  return (
    <>
      <Container1>
        <Title>{translate("Места_работы")}</Title>
        <Box>
          <Text onClick={handleRefresh} >
            <RefReshIcon />
            {translate("Обновить_базу")}
          </Text>

          <Button onClick={() => exportToExcel(workplaces)} icon={<IconPlus />}>
            {translate("Добавить_место_работы")}
          </Button>
        </Box>
      </Container1>
      <MainTable loading={loading} setLoading={setLoading} data={workplaces} />
    </>
  );
}

export default AdminMestaRabota;
