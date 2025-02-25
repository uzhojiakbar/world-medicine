import styled from "styled-components";

export const Container = styled.div`
  margin: 20px 60px;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 10px 20px;
  }

  @media (max-width: 480px) {
    margin: 5px 10px;
  }
`;

export const ContainerItem = styled.div`
  display: flex;

  justify-content: space-between;
  width: 100%;
  gap: 20px;
    margin-bottom: 50px;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 2fr);
  }

  @media (max-width: 768px) {
    display: grid;

    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    display: grid;

    grid-template-columns: 1fr;
  }

  > .itemLink {
    flex: 1;
  }
`;

export const H1 = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
