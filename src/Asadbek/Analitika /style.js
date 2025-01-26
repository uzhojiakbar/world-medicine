import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
`;

export {
  Container,
  Wrapper,
  ItemWrapper,
  FilterWrapper,
  Form,
  InfoContainer,
  InfoItem,
};
