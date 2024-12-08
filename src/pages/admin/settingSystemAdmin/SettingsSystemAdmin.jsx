import React from "react";
import ResizeTableAdminLayout from "../../../components/ResizeTable/ResizeTableAdminLayout/ResizeTableAdminLayout";
import { connectingUser } from "../../../mock/NewConnectingData";
import { Container } from "./style";
import SettingsMenager from "../../SettingsMenager/SettingsMenager";
import SettingsDoctor from "../../SettingsDoctor/SettingsDoctor.jsx";

const SettingsSystemAdmin = () => {
  return (
    <Container>
      <ResizeTableAdminLayout
        title="Новое подключение"
        data={connectingUser || []}
      />
      <ResizeTableAdminLayout
        title="Новые предложения пакетов"
        data={connectingUser || []}
      />

      <SettingsMenager />
      <SettingsDoctor />
    </Container>
  );
};

export default SettingsSystemAdmin;
