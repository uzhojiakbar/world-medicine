import React, {useEffect, useState} from "react";
import Reports from "./Reports";
import FilterAnaliktika from "./Filter/Filter";
import {css} from "@emotion/react";
import {Wrapper} from "./Reports/style";
import NewConnect from "../../../../pages/admin/settingSystemAdmin/NewConnect";
import NewContract from "../../../../pages/NewContract";
import {useLanguage} from "../../../../context/LanguageContext";
import SettingsMenager from "../SettingsMenager/SettingsMenager";
import SettingsMedAgent from "../SettingsMedAgent/SettingsMedAgent";
import DisabledPage from "../../../../components/DisabledPage/index.jsx";
import ReNewConnect from "../../../../pages/NewContract/index2.jsx";
import SettingsFieldForce from "../SettingsFieldForce/SettingsAdmin.jsx";

const BaseControl = () => {
    const {translate} = useLanguage();

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

        >
            <div style={{"display":"flex",flexDirection: "column",gap: "20px"}}  className="relative">
                <FilterAnaliktika/>
                <NewContract
                    title={translate("Новые_подкл_договора")}
                    data={posts || []}
                    loading={false}
                />
            </div>
            <div style={{"display":"flex",flexDirection: "column",gap: "20px"}} className="relative">
                <ReNewConnect
                    title={translate("Пересмотренные_договора")}
                    data={posts || []}
                    loading={false}
                />
            </div>
            <SettingsMenager/>
            <SettingsMedAgent/>
            <SettingsFieldForce/>
        </Wrapper>
    );
};

export default BaseControl;
