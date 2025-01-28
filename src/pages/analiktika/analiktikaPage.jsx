import React, { useEffect, useState } from "react";
import Reports from "./Reports";
import { useLanguage } from "../../context/LanguageContext";
import NewConnect from "../admin/settingSystemAdmin/NewConnect";
import NewContract from "../NewContract";
import FilterAnaliktika from "./Filter/Filter";
import { css } from "@emotion/react";
import { Wrapper } from "./Reports/style";

const AnaliktikaPage = () => {
  const { translate } = useLanguage();

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
    <Wrapper
      className={css`
        display: flex;
        flex-direction: column;
        gap: 50px;
      `}
    >
      <FilterAnaliktika />
      <NewConnect
        title={translate("new_connect")}
        data={posts || []}
        loading={false}
      />
      <NewContract
        title={translate("Новые договора")}
        data={posts || []}
        loading={false}
      />
      <Reports />
    </Wrapper>
  );
};

export default AnaliktikaPage;
