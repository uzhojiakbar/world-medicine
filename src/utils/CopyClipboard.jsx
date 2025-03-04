import { message } from "antd";
import { useLanguage } from "../context/LanguageContext.jsx";

export const useCopyToClipboard = () => {
    const { translate } = useLanguage(); // Hook faqat komponent yoki custom hook ichida ishlaydi

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                message.success(translate("text_copied") + `: ${text}`);
            })
            .catch(() => {
                message.error(translate("text_copied_error"));
            });
    };

    return { copyToClipboard };
};
