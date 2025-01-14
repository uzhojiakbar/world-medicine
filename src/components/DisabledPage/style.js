import styled from "styled-components";

export const DisabledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);

  width: 100% !important;

  height: 100% !important;

  z-index: 1;

  justify-content: center;
  align-items: center;
  padding: 30px;

  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 1024px) {
    padding: 40px; /* Tablet uchun padding */
    justify-content: flex-end;
    gap: 40px;
    border-radius: 0;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
    padding-top: 40px;

    width: 100%;
    height: 100%;
    justify-content: space-evenly;
  }
`;
