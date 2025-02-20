import React, {useEffect, useState} from "react";
import Filter from "./filter/Filter";
import MainTable from "./Table";
import { useLanguage } from "../../../context/LanguageContext";
import styled from "styled-components";
import { media } from "../../../utils/media";
import Server from "../../../utils/server/server.js";
import * as XLSX from "xlsx";


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

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    > div {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        font-size: ${({size}) => (size ? size : "36px")};
        font-weight: 800;

        font-family: "Vela Sans GX", sans-serif;

        > p {
            font-size: 20px;
            font-weight: 600;
            margin-top: 5px;
            color: #7C7C7E;
        }
    }

    justify-content: space-between; 

    ${media.mobileL} {
        font-size: 28px;
    }
`;


const exportToExcel = (data) => {
    // 1. Jadval ma'lumotlarini tayyorlash
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    // 2. Worksheetni workbookga qo'shish
    XLSX.utils.book_append_sheet(workbook, worksheet, "Архив договоров");

    // 3. Excel faylini yaratish
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // 4. Faylni saqlash
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Архив договоров.xlsx");
};

const Arxiv = () => {
  const { translate } = useLanguage();
  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Server.getDogovor();
                setData(data || []); // olingan ma'lumotni saqlaymiz
            } catch (err) {
                // setError("Error fetching posts.");
                return;
            }
        };

        fetchData();
    }, []);

  return (
    <Wrapper>
      <Filter id={0} />
      <Title>
        <div>
          {translate("Договоры")}
        <p>(200 Вр)</p>
        </div>
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

      </Title>
      <MainTable title="rahmadjon" data={[]} />
    </Wrapper>
  );
};

export default Arxiv;
