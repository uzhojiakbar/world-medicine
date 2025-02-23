import React, {useState, useEffect} from "react";
import {
    Link,
    Links,
    Logo,
    NavContainer,
    ProfieBtn,
    BurgerMenu,
    ChangeLanguage,
    NavBigContainer,
} from "./style";

// *IMG
import LogoMain from "../../../assets/logo-Banner.svg";
import {
    NavbarBurgerMenu,
    navbarData,
    NavbarDataAdmin,
    NavbarDataManager,
    NavbarDataSuperAdmin,
} from "../../../utils/navbar";

import useCustomNavigate from "../../../hooks/useCustomNavigate";
import {Dropdown} from "antd";

import Cookies from "js-cookie";
import {useLanguage} from "../../../context/LanguageContext";

import { motion } from "framer-motion";


const AdminNavbar = () => {
    const nav = useCustomNavigate();

    const [lang1, setLanguage2] = useState(localStorage.getItem("lang") || "ru");
    const {translate, language, setLanguage} = useLanguage(); // useLanguage hook'ini chaqiramiz

    const userRole = Cookies.get("role");

    const [data, setData] = useState([]);

    useEffect(() => {
        const CurrentData =
            userRole === "SUPERADMIN"
                ? NavbarDataAdmin
                : userRole === "CHIEF"
                    ? NavbarDataAdmin
                    : userRole === "ADMIN"
                        ? NavbarDataSuperAdmin
                        : userRole === "MANAGER"
                            ? NavbarDataManager
                            : navbarData;

        setData(
            CurrentData?.map((v) => {
                return {
                    ...v,
                    title: translate(v.title),
                };
            })
        );
    }, [language]);

    const languages = [
        {value: "ru", label: "Русский", icon: ""},
        {value: "en", label: "English", icon: ""},
        {value: "uz", label: "O'zbek", icon: ""},
    ];

    const handleLanguageChange = (value) => {
        setLanguage2(value); // Holatni yangilash
        setLanguage(value);
        localStorage.setItem("lang", value); // Tanlangan tilni saqlash
    };

    const langs = languages.map((lang) => ({
        key: lang.value,
        label: (
            <div
                onClick={() => handleLanguageChange(lang.value)}
                style={{display: "flex", alignItems: "center", cursor: "pointer"}}
            >
                {lang.label}
            </div>
        ),
    }));

    const ToHome = () => {
        nav("/");
        window.scrollTo({top: 0, behavior: "smooth"}); // Tepaga skroll qilish
    };

    const ToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"}); // Tepaga skroll qilish
    };


    return (
        <NavBigContainer>
            <NavContainer>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >

                <Logo onClick={ToHome} src={LogoMain}>
                    <svg width="48" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                              fill="#216BF4"/>
                    </svg>
                </Logo>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >

                <Links>
                    {data.map(
                        (v) =>
                            v.visible && (
                                <Link
                                    onClick={ToTop}
                                    className={({isActive}) => (isActive ? "active" : "")}
                                    key={v.id || v.title}
                                    to={Cookies.get("role") === "CHIEF" ? v.path : v.path}
                                >
                                    {v.title}
                                </Link>
                            )
                    )}

                    <Dropdown
                        overlayStyle={{zIndex: "999999999"}}
                        menu={{items: langs}}
                        trigger={["click"]}
                    >
                        <ChangeLanguage className={"inactive"}>{lang1}</ChangeLanguage>
                    </Dropdown>

                    <ProfieBtn to={`/profile`}>
                        <i className="fa-solid fa-user"></i>
                    </ProfieBtn>
                </Links>
                </motion.div>

                {/* Burger menu dropdown */}
                <Dropdown
                    overlayStyle={{zIndex: "999999999"}}
                    menu={{items: NavbarBurgerMenu()}}
                    trigger={["click"]}
                >
                    <BurgerMenu>
                        <i className="fa-solid fa-bars"></i>
                    </BurgerMenu>
                </Dropdown>
            </NavContainer>
        </NavBigContainer>
    );
};

export default AdminNavbar;
