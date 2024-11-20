import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/media";

// Generic Button Styling
const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center; /* Vertikal hizalash */
  justify-content: center; /* Gorizontal hizalash */

  gap: 8px; /* Icon va text orasidagi masofa */
  padding: 10px 20px;

  background-color: #007bff; /* Primary rang */

  border: none;
  border-radius: 12px; /* Dumaloq burchaklar */

  font-size: 16px;

  cursor: pointer;
  transition: background-color 0.3s;

  color: #fff; /* Oq rangli text */

  &:hover {
    background-color: #0056b3; /* Hover effekti */
  }

  &:disabled {
    background-color: #c4c4c4; /* Disabled effekti */
    cursor: not-allowed;
  }

  ${media.mobileL} {
    padding: 10px 10px;
  }
  ${media.mobileMM} {
    > .child {
      display: none;
    }

    > .hidden {
      display: flex !important;
    }
  }
`;

// Button Component
const Button = ({
  children,
  MobilehiddenText = 0,
  icon,
  onClick,
  disabled,
}) => {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled}>
      {icon && <span>{icon}</span>} {/* Icon ko‘rsatish */}
      <span className={`child ${MobilehiddenText ? "hidden" : ""}`}>
        {children}
      </span>
    </ButtonStyled>
  );
};

export default Button;
