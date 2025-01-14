import React, { useEffect, useState } from "react";
import ResizeTableAdminLayout from "../../../components/ResizeTable/ResizeTableAdminLayout/ResizeTableAdminLayout";
import { connectingUser } from "../../../mock/NewConnectingData";
import { Container } from "./style";
import SettingsMenager from "../../SettingsMenager/SettingsMenager";
import SettingsDoctor from "../../SettingsDoctor/SettingsDoctor.jsx";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { UseNewConnecting } from "../../../hooks/UseGetNewConnecting.jsx";
import SettingsMed from "../../settingsMed/index.jsx";
import Server from "../../../utils/server/server.js";
import NewConnect from "./NewConnect.jsx";
import NoviyPaket from "./NoviyPaket.jsx";
import DisabledPage from "../../../components/DisabledPage/index.jsx";

const SettingsSystemAdmin = () => {
  const { translate } = useLanguage();
  // const { data: , isLoading, error } = UseNewConnecting();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const topOffset = 200; // 150px yuqoriga
        const elementPosition = element.getBoundingClientRect().top; // Element joylashuvi
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth", // Animatsiyali skroll
        });
      }
    }
  }, []); // Faqat komponent birinchi marta render bo'lganda chaqiriladi

  return (
    <Container>
      <NewConnect
        title={translate("new_connect")}
        data={posts || []}
        loading={false}
      />

      {/* // REVIEW   Waiting API  */}

      <NoviyPaket
        title={translate("Новые_предложения_пакетов")}
        data1={connectingUser || []}
        loading={false}
      />
      {/* 
      <ResizeTableAdminLayout
        title={translate("Новые_предложения_пакетов")}
        data={connectingUser || []}
        loading={false}
      /> */}

      <span id="administration"></span>

      <SettingsMenager />
      <SettingsDoctor />
      <SettingsMed />
    </Container>
  );
};

export default SettingsSystemAdmin;
