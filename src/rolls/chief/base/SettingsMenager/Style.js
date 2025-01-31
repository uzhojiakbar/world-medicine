import { Modal } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalWidth = styled(Modal)`
  width: 50vw !important;
`;

const Header = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #000000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
    color: #000000;
    font-size: 24px;
    font-weight: 700;
  }
`;

const Subtext = styled.span`
  background-color: #f7f8fc;
  padding: 17px 20px;
  border-radius: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Btn = styled.button`
  background-color: #216bf4;
  width: 218px;
  outline: none;
  border-radius: 10px;
  padding: 14px 20px;
  color: #ffffff;
  font-size: 18px;
  border: none;
  font-weight: bold;
`;

const PackageList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    background-color: #ffffff;
    padding: 17px 20px;
    border-radius: 10px;

    .rename {
      display: flex;
      align-items: center;
      gap: 10px;
      input {
        outline: none;
      }
    }
  }
`;

const GridItem = styled.div`
  background: #f7f8fc;
  border-radius: 10px;
  padding: 16px;
  margin-top: ${({ mt }) => mt && `${mt}px`};
  p {
    color: #000000;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  div {
    background: white;
    padding: 17px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

const Fotercontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    text-align: center;
    font-size: 24px;
  }
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;

  button {
    padding: 17px 20px;
    border: none;
    width: 200px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    font-weight: bold;

    &.accept {
      background-color: #62ffac;
    }

    &.reject {
      background-color: #f7f8fc;
    }
  }
`;

const HR = styled.div`
  background: #2426371a;
  height: 1px;
`;

const IMG = styled.img`
  width: 60px;
`;
const ImgContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const KvotaContainer = styled.div`
  background-color: blue;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: white;
  padding: 16px;
  gap: 20px;
  border-radius: 10px;
`;
const KvotaCard = styled.div`
  p {
    font-size: 24px;
    font-weight: 700;
  }
  h2 {
    font-size: 38px;
    font-weight: 700;
  }
`;

///////////////////////////////////////////////
// MODAL 2

const Grid2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
const GridItem2 = styled.div`
  background: #f7f8fc;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  p {
    color: #000000;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-radius: 16px;
  margin-top: 16px;
`;

const Header2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
  }

  th {
    font-weight: bold;
    background-color: #f3f3f3;
  }

  td {
    &:last-child {
      text-align: center;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const Comments = styled.div`
  padding: 16px;
  background: #f7f8fc;
  border-radius: 8px;
  border: 1px solid #eaeaea;
`;

//MODAL3
const PageContainer = styled.div`
  margin-top: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #f7f8fc;
  border-radius: 10px;
  padding: 5px 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;

  h2 {
    color: #007bff;
    font-size: 2rem;
    margin-top: 10px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1rem;
    margin: 10px 0 0;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;
const SubTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const RemoveSection = styled.div`
  text-align: center;
  margin-top: 24px;

  button {
    padding: 17px 20px;
    border: none;
    border-radius: 50px;
    background-color: #fb3748;
    color: white;
    cursor: pointer;
  }
`;
export {
  Container,
  Header,
  Grid,
  Subtext,
  Field,
  Fotercontainer,
  FooterButtons,
  IMG,
  ImgContainer,
  HR,
  PackageList,
  GridItem,
  Btn,
  KvotaContainer,
  KvotaCard,
  // modal 2
  Grid2,
  GridItem2,
  Container2,
  Header2,
  Comments,
  Table,
  //modal 3,
  PageContainer,
  GridContainer,
  Card,
  SubTitle,
  RemoveSection,
};
