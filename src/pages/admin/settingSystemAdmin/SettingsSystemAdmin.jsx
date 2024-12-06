import React from "react";
import styled from "styled-components";

import ResizeTableAdminLayout from "../../../components/ResizeTable/ResizeTableAdminLayout/ResizeTableAdminLayout";

const Container = styled.div`
  background: var(--bg-color);

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SettingsSystemAdmin = () => {
  return (
    <Container>
      <ResizeTableAdminLayout />
      <ResizeTableAdminLayout />
      <ResizeTableAdminLayout />
    </Container>
  );
};

export default SettingsSystemAdmin;
