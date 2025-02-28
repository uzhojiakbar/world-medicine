import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px;
  background-color: white;
  border-radius: 30px;
`;

const ItemWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
    justify-content: space-between;

    @media (max-width: 768px) {
        gap: 20px;
    }
`;

const Title = styled.div`
  font-size: ${({ size }) => (size ? `${size}px` : "36px")};
  font-weight: 800;

  font-family: "Vela Sans GX", sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  @media (max-width: 605px) {
    font-size: ${({ size, title }) => {
      if (size && title) {
        return `${size - 18}px`;
      } else {
        return `${size - 8}px`;
      }
    }};
  }

  @media (max-width: 400px) {
    font-size: ${({ size, title }) => {
      if (size && title) {
        return `${size - 24}px`;
      } else {
        return `${size - 8}px`;
      }
    }};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  gap: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 20px;
  border-radius: 10px;
  background-color: #216bf4;
  color: white;
  padding: 16px;
`;

const InfoItem = styled.div`
  flex: 1;
    user-select: none;
`;

const AllChartContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ChartContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AppointmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  gap: ${({ gap }) => (gap ? gap : "10px")};
  flex: 1;
`;

const Child = styled.div`
  display: flex;

  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  font-size: 16px;
  font-weight: 600;
  background-color: #f7f8fc;
  border-radius: 10px;
`;

export {
  Title,
  Container,
  Wrapper,
  ItemWrapper,
  FilterWrapper,
  Form,
  InfoContainer,
  InfoItem,
  AllChartContainer,
  ChartContainer,
  AppointmentWrapper,
  Item,
  Child,
};
