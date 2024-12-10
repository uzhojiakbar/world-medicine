import styled from "styled-components";

// Styled-components
export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  border-radius: 57px;
  background-color: #f7f8fc;

  position: relative;

  > .input {
    padding: 20px;
    width: 100%;
    height: 100%;
  }
`;

export const StaticText = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 16px;
  font-family: "Vela Sans GX";
  font-weight: 600;
  color: #333;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;

  position: absolute;
  right: 20px;
  &:hover {
    opacity: 0.8;
  }
`;
