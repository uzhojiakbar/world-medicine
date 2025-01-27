import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  border-radius: 16px;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #F7F8FC;
  border-radius: 8px;
  padding: 16px;
`;

const CardHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

const ProgressBarContainer = styled.div`
overflow: hidden;
position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 17px 20px;
  background: white;
  border-radius: 5px;
  z-index: 999;
`;

const ProgresBar = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 10;
  left: 0;
  /* width: ${({ progres }) => progres && `${progres}%`}; */
  background-color: green;
`



const GoalSection = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const data = {
    goals: [
      {
        title: "Охват врачей",
        items: [
          { name: "Гинеколог", current: 12, total: 20 },
          { name: "Травматолог", current: 100, total: 100 },
        ],
      },
      {
        title: "Заключение договоров",
        items: [
          { name: "Алтикам", current: 70, total: 100 },
          { name: "Ампилин", current: 45, total: 100 },
        ],
      },
      {
        title: "Охват районов",
        items: [
          { name: "Алтикам", current: 70, total: 100 },
          { name: "Ампилин", current: 33, total: 100 },
        ],
      },
      {
        title: "Охват районов",
        items: [
          { name: "Алтикам", current: 70, total: 100 },
          { name: "Ампилин", current: 33, total: 100 },
        ],
      }, {
        title: "Охват районов",
        items: [
          { name: "Алтикам", current: 70, total: 100 },
          { name: "Ампилин", current: 33, total: 100 },
        ],
      }, {
        title: "Охват районов",
        items: [
          { name: "Алтикам", current: 70, total: 100 },
          { name: "Ампилин", current: 33, total: 100 },
        ],
      },
    ],
  };

  return (
    <Container>
      <Header onClick={() => setIsExpanded(!isExpanded)}>
        Цель {isExpanded ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
      </Header>
      {isExpanded && (
        <>
          <Grid>
            {data.goals.map((goal, index) => (
              <Card key={index}>
                <CardHeader>{goal.title}</CardHeader>
                {goal.items.map((item, idx) => (

                  <ProgressBarContainer key={idx}>
                    <span>{item.name}</span>
                    <span >
                      <ProgresBar progres={(+item.total / item.current)*50} />
                      {item.current} из {item.total}
                    </span>
                  </ProgressBarContainer>

                ))}
              </Card>
            ))}
          </Grid>

         
        </>
      )}
    </Container>
  );
};

export default GoalSection;
