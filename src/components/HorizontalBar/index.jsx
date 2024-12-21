import { color } from "chart.js/helpers";
import React from "react";
import styled from "styled-components";
import { MiniTitleSmall, Title } from "../../root/style";

// O'rash konteyneri
const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px; /* Qatorlar orasidagi masofa */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px;
  background-color: #f7f8fc;
  border-radius: 7px;
`;

// Har bir chiziq uchun konteyner
const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 13px; /* Chiziq va yozuv orasidagi masofa */
  width: 100%;
  @media (max-width: 468px) {
    gap: 5px;
    flex-direction: column;
  }
`;

// Rangli chiziq (progress bar)
const Bar = styled.div`
  display: flex; /* Rangli segmentlar uchun */
  height: 25px; /* Chiziqning balandligi */
  width: 100%; /* Umumiy kenglik */
  border-radius: 2px; /* Yumuq burchaklar */
  overflow: hidden; /* Radiusdan tashqariga chiqishni yashirish */
`;

// Rang segmentlari
const Segment = styled.div`
  height: 100%;
  width: ${(props) => props.width + "%"}; /* Segment kengligi */
  background-color: ${(props) => props.color}; /* Rang */
`;

// Yozuv qismi
const Label = styled.div`
  font-size: 18px; /* Yozuvning kattaligi */
  font-weight: bold; /* Qalinroq yozuv */
  color: #333; /* Matn rangi */
  /* width: 180px; */
  width: 300px;
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  gap: 16px;
  padding-top: 20px;

  @media (max-width: 468px) {
    gap: 5px;
    flex-direction: column;
  }
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  color: #555;
`;

const Color = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
`;

const HorizontalChart = ({ title = "", datatest = [] }) => {
  // Statistik ma'lumotlar (bir chiziqda bir nechta segment)
  const data = [
    {
      label: "Ташкент",
      segments: [
        { value: 20, color: "#6366F1" },
        { value: 30, color: "#A7BFF7" },
        { value: 20, color: "#F55A5A" },
      ],
    },
    {
      label: "Ташкентская область",
      segments: [
        { value: 40, color: "#6366F1" },
        { value: 10, color: "#A7BFF7" },
        { value: 10, color: "#F55A5A" },
      ],
    },
    {
      label: "Самарканд",
      segments: [
        { value: 20, color: "#6366F1" },
        { value: 10, color: "#A7BFF7" },
        { value: 10, color: "#F55A5A" },
      ],
    },
    {
      label: "Хива",
      segments: [
        { value: 20, color: "#6366F1" },
        { value: 10, color: "#A7BFF7" },
        { value: 10, color: "#F55A5A" },
      ],
    },
    {
      label: "Андижан",
      segments: [
        { value: 20, color: "#6366F1" },
        { value: 10, color: "#A7BFF7" },
        { value: 10, color: "#F55A5A" },
      ],
    },
  ];

  const footerData = ["Аналгин", "Терафлю", "Ибупрофен"];

  const footerDataItem = data[0].segments.map((v, i) => {
    return { title: footerData[i], color: v.color };
  });

  return (
    <Container>
      <Title size={"24px"}>{title}</Title>
      <ChartContainer>
        {data.map((item, index) => (
          <BarWrapper key={index}>
            <Label>{item.label}</Label>
            <Bar>
              {item.segments.map((segment, i) => (
                <Segment
                  key={i}
                  width={segment.value}
                  color={segment.color}
                ></Segment>
              ))}
            </Bar>
          </BarWrapper>
        ))}
      </ChartContainer>
      <FooterContainer>
        {footerDataItem.map((item, index) => (
          <FooterItem key={index}>
            <Color color={item.color} />
            <span>{item.title}</span>
          </FooterItem>
        ))}
      </FooterContainer>
    </Container>
  );
};

export default HorizontalChart;
