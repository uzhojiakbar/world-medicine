import React, { useEffect, useState } from "react";
import ResizeTableAdminLayout from "../../../components/ResizeTable/ResizeTableAdminLayout/ResizeTableAdminLayout";
import { connectingUser } from "../../../mock/NewConnectingData";
import { Container } from "./style";
import SettingsMenager from "../../SettingsMenager/SettingsMenager";
import SettingsDoctor from "../../SettingsDoctor/SettingsDoctor.jsx";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { UseNewConnecting } from "../../../hooks/UseGetNewConnecting.jsx";

const SettingsSystemAdmin = () => {
  const { translate } = useLanguage();
  const newconnecting = [];
  // const { data: , isLoading, error } = UseNewConnecting();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPosts(data); // olingan ma'lumotni saqlaymiz
      } catch (err) {
        setError("Error fetching posts.");
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

      <SettingsMenager />
      <SettingsDoctor />
    </Container>
  );
};

export default SettingsSystemAdmin;
