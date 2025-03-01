import styled from "styled-components";

export const BaseDoctorCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .cards {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;

    padding: 20px;
    border-radius: 30px;
    border: 1px solid #fafafa;
    background: #fff;
  }

  @media (max-width: 1440px) {
    .cards {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 600px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
`;

export const NavTitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .section1 {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 10px;
    height: 100%;
  }
`;

export const Line = styled.div`
  width: 2px;
  height: 20px;
  margin-bottom: 4px;

  border-radius: 100%;
  background-color: #7c7c7e;
`;
