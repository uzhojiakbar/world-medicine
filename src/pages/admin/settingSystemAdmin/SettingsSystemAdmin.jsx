import React, { useEffect, useState } from "react";
import ResizeTableAdminLayout from "../../../components/ResizeTable/ResizeTableAdminLayout/ResizeTableAdminLayout";
import { connectingUser } from "../../../mock/NewConnectingData";
import { Container } from "./style";
import SettingsMenager from "../../SettingsMenager/SettingsMenager";
import SettingsDoctor from "../../SettingsDoctor/SettingsDoctor.jsx";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { UseNewConnecting } from "../../../hooks/UseGetNewConnecting.jsx";
import SettingsMed from "../../settingsMed/index.jsx";

const SettingsSystemAdmin = () => {
  const { translate } = useLanguage();
  const newconnecting = [];
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

    const fetchPosts = async () => {
      try {
        setPosts(data); // olingan ma'lumotni saqlaymiz
      } catch (err) {
        // setError("Error fetching posts.");
        return;
      } finally {
        console.log("FINAl");
      }
    };

    fetchPosts();
  }, []); // Faqat komponent birinchi marta render bo'lganda chaqiriladi

  console.log("NE CONN", newconnecting);

  return (
    <Container>
      <ResizeTableAdminLayout
        title={translate("new_connect")}
        data={connectingUser || []}
      />
      <ResizeTableAdminLayout
        title={translate("Новые_предложения_пакетов")}
        data={connectingUser || []}
      />

      <span id="administration"></span>

      <SettingsMenager />
      <SettingsDoctor />
      <SettingsMed />
    </Container>
  );
};

export default SettingsSystemAdmin;
