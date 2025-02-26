import {useEffect, useState} from "react";
import Reports from "./Recipes";
import {useLanguage} from "../../../context/LanguageContext";
import NewConnect from "../../../pages/admin/settingSystemAdmin/NewConnect";
import NewContract from "./NewContract";
import FilterAnaliktika from "./Filter/Filter";
import {css} from "@emotion/react";
import {Wrapper} from "./style";
import BaseDoctor from "../../chief/base/BaseDoctor/index.jsx";

const ManagerBasePage = () => {
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
            className={css`
                display: flex;
                flex-direction: column;
                gap: 50px;
            `}
        >
            <FilterAnaliktika/>
            <NewConnect
                title={translate("new_connect_doctor_for_mng")}
                data={posts || []}
                loading={false}
            />
            <NewContract
                title={translate("Новые договора")}
                data={posts || []}
                loading={false}
            />
            <Reports/>
            <BaseDoctor
                title={translate("setting_doctor")}
            FilterHide={true}
            />
        </Wrapper>
    );
};

export default ManagerBasePage;
