import styled from "styled-components";

export const Container = styled.div`
  padding: 15px;
  width: 100%;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  /* gap: 20px; */

  @media (max-width: 768px) {
    margin: 15px 30px;
  }

  @media (max-width: 480px) {
    margin: 10px 15px;
    padding: 10px;
  }

  .div {
    display: flex;
    gap: 20px;
    width: 100%;
  }

  .inner {
    width: 100%;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

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

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 17px 20px;
  border-radius: 10px;
  background-color: #f7f8fc;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
`;

export const Figcaption = styled.div`
  display: flex;
  justify-content: space-between;
  .info {
    color: rgba(0, 0, 0, 0.5);
  }
`;
