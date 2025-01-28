import styled from "styled-components";

export const Container = styled.div`
  padding: 15px;
  width: 100%;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    margin: 15px 30px;
  }

  @media (max-width: 480px) {
    margin: 10px 15px;
    padding: 10px;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const FilterInput = styled.input`
  width: calc(33% - 10px);
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  font-size: 14px;
  color: #4b5563;
  background-color: #f7f8fc;
  outline: none;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 4px rgba(37, 99, 235, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: ${({ row }) => (row ? "repeat(7, 1fr)" : "1fr")};
  gap: 10px;
  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr); /* 2 ta 2 ta qilib joylashadi */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 ta 2 ta qilib joylashadi */
  }

  @media (max-width: 605px) {
    grid-template-columns: 1fr; /* Juda kichik ekranlarda ustma-ust */
  }
`;

const FiltrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;
  border-radius: 27px;
  background-color: #f7f8fc;
`;

const PoSvetuWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 17px 20px;
  border-radius: 10px;
  background-color: white;
  width: 100%;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RadioCon = styled.div`
  display: flex;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 4px;
  border: 1px solid;
  border-color: ${({ all }) => (all == "true" ? "#216BF4" : "black")};
  cursor: pointer;
`;
const Radio = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ all }) => (all == "true" ? "#216BF4" : "white")};
`;

export { Form, FiltrWrapper, PoSvetuWrapper, RadioWrapper, RadioCon, Radio };
