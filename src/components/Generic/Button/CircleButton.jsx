import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/media";
import { html } from "framer-motion/client";

// Generic Button Styling
const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center; /* Vertikal hizalash */
  justify-content: ${({jc})=>jc?jc:"center"}; /* Gorizontal hizalash */

  gap: 8px; /* Icon va text orasidagi masofa */
  padding: 10px 30px;

  background-color: ${({ outline }) =>
    outline ? "white" : "#007bff"}; /* Primary rang */

  border: none;
  border-radius: 90px; /* Dumaloq burchaklar */

  font-size: 16px;

  cursor: pointer;
  transition: background-color 0.3s;

  color: ${({ outline }) => (outline ? "black" : "white")}; /* Oq rangli text */
  width: 100%;
  height: 100%;

  border: 1px solid ${({ outline }) => (outline ? "black" : "#007bff")};

  &:hover {
    background-color: ${({ outline }) =>
      outline ? "#e9e6e6" : "#056bd8"}; /* Hover effekti */
  }

  &:disabled {
    background-color: #c4c4c4; /* Disabled effekti */
    cursor: not-allowed;
  }

  &:active {
    &:hover {
      background-color: ${({ outline }) =>
        outline ? "#d6cece" : "#094b92"}; /* Hover effekti */
    }
  }

  ${media.mobileL} {
    height: 100%;
  }
  ${media.mobileMM} {
    > .hidden {
      display: flex !important;
    }
  }
`;

// Button Component
const CricleButton = ({
  children,
  MobilehiddenText = 0,
  icon,
  onClick,
  disabled,
  iconRight = false,
  outline = 0,
    jc="center",
                        className,
  htmlType, // Enter tugmasi bosilganda formni yuboradi
}) => {
  return (
    <ButtonStyled
      outline={outline}
      onClick={onClick}
      disabled={disabled}
      type={htmlType ? htmlType : "button"}
      className={className}
      jc={jc}
    >
      {icon && !iconRight && <span>{icon}</span>} {/* Icon ko‘rsatish */}
      <span className={`child ${MobilehiddenText ? "hidden" : ""}`}>
        {children}
      </span>
      {icon && iconRight && <span>{icon}</span>} {/* Icon ko‘rsatish */}
    </ButtonStyled>
  );
};

export default CricleButton;
