import {Link, Route} from "react-router-dom";
import Analiktika from "../pages/analiktika/analiktika";
import AdminAnaliktika from "../pages/analiktika/admin/adminAnaliktika";
import SettingsConditionAdmin from "../pages/setingsCondition/admin/index";
import AdminCreateContract from "../pages/createContract/admin/adminCreateContract";
import SettingsSystemAdmin from "../pages/admin/settingSystemAdmin/SettingsSystemAdmin";
import {useLanguage} from "../context/LanguageContext";
import AddMeneger from "../pages/addManager/AddManager";
import Profile from "../pages/profile/admin";
import AdminPage from "../pages/admin/admin";
import {MainContainer} from "../root/style";
import AnaliktikaPage from "../pages/analiktika/analiktikaPage";
import SettingsCondition from "../pages/setingsCondition";
import Arxiv from "../pages/setingsCondition/Arxiv/Arxiv";

import {RoutingManager} from "./RoutingManager";
import {RoutingChief} from "./RoutingChief";
import {RoutingAdmin} from "./RoutingAdmin";
import IconPlus from "../assets/svg/IconPlus.jsx";
import Cookies from "js-cookie";

export const navbarData = () => {
    return [
        {
            id: 1,
            title: "Аналитика",
            path: "analiktika",
            element: <Analiktika/>,
            child: [],
            visible: true,
            onlyAdmin: false,
            icon: false,
        },
        {
            id: 2,
            title: "Настройка условий",
            path: "nastroyka-usloviya",
            element: <h1>Настройка условий</h1>,
            child: [],
            visible: true,
            onlyAdmin: false,
            icon: false,
        },
        {
            id: 3,
            title: "Рецепт",
            path: "retsept",
            element: <h1>Рецепт</h1>,
            child: [],
            visible: true,
            onlyAdmin: false,
            icon: false,
        },
        {
            id: 4,
            title: "Депозит",
            path: "depozit",
            element: <h1>Депозит</h1>,
            child: [],
            visible: true,
            onlyAdmin: false,
            icon: false,
        },
    ];
};

export const NavbarBurgerMenu = () => {
    return [
        {
            key: 1,
            label: (
                <Link to={`/analiktika`}>
                    <div>Аналитика</div>
                </Link>
            ),
        },
        {
            key: 2,
            label: (
                <Link to={`/nastroyka-usloviya`}>
                    <div>Настройка условий</div>
                </Link>
            ),
        },
        {
            key: 3,
            label: (
                <Link to={`/retsept`}>
                    <div>Рецепт</div>
                </Link>
            ),
        },
        {
            key: 4,
            label: (
                <Link to={`/depozit`}>
                    <div>Депозит</div>
                </Link>
            ),
        },
    ];
};

export const QuickMenuAdmin = () => {
    const {translate} = useLanguage();

    const role = Cookies.get("role");
    return    role === "SUPERADMIN" || role === "CHIEF" ?
        // ---------------------- ADMIN
        [
        {
            key: 1,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-doctor`}>
                    <IconPlus color={"black"}/> {translate("Добавить_врача")}
                </Link>
            ),
        },
        {
            key: 2,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-manager`}>
                    <IconPlus color={"black"}/> {translate("Добавить_менеджера")}
                </Link>
            ),
        }, {
            key: 3,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-med-agent`}>
                    <IconPlus color={"black"}/> {translate("Добавить_мед_представителя")}
                </Link>
            ),
        }, {
            key: 4,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-admin`}>
                    <IconPlus color={"black"}/> {translate("add_addmin")}
                </Link>
            ),
        },
        {
            key: 5,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya`}>
                    <IconPlus color={"black"}/> {translate("Добавить_препарат")}
                </Link>
            ),
        },
        {
            key: 6,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya/lpu`}>
                    <IconPlus color={"black"}/> {translate("Добавить_лпу")}
                </Link>
            ),
        },
        {
            key: 7,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya/regions`}>
                    <IconPlus color={"black"}/> {translate("Добавить_region_district")}
                </Link>
            ),
        },{
            key: 8,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/managers-goal`}>
                    <IconPlus color={"black"}/> {translate("Цель_менеджеру")}
                </Link>
            ),
        },
    ] :


        //   ----------------------  FF
        [
            {
                key: 1,
                label: (
                    <Link style={{display: "flex", gap: "5px"}} to={`/create-doctor`}>
                        <IconPlus color={"black"}/> {translate("Добавить_врача")}
                    </Link>
                ),
            },
            {
                key: 2,
                label: (
                    <Link style={{display: "flex", gap: "5px"}} to={`/create-manager`}>
                        <IconPlus color={"black"}/> {translate("Добавить_менеджера")}
                    </Link>
                ),
            }, {
            key: 3,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-med-agent`}>
                    <IconPlus color={"black"}/> {translate("Добавить_мед_представителя")}
                </Link>
            ),
        },
            {
                key: 6,
                label: (
                    <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya/lpu`}>
                        <IconPlus color={"black"}/> {translate("Добавить_лпу")}
                    </Link>
                ),
            },
            {
                key: 7,
                label: (
                    <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya/regions`}>
                        <IconPlus color={"black"}/> {translate("Добавить_region_district")}
                    </Link>
                ),
            },{
            key: 8,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/managers-goal`}>
                    <IconPlus color={"black"}/> {translate("Цель_менеджеру")}
                </Link>
            ),
        },
        ]
};


export const QuickMenuManager = () => {
    const {translate} = useLanguage();
    return [
        {
            key: 1,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-doctor`}>
                    <IconPlus color={"black"}/> {translate("Добавить_врача")}
                </Link>
            ),
        },
        {
            key: 2,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-manager`}>
                    <IconPlus color={"black"}/> {translate("Добавить_менеджера")}
                </Link>
            ),
        }, {
            key: 3,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-med-agent`}>
                    <IconPlus color={"black"}/> {translate("Добавить_мед_представителя")}
                </Link>
            ),
        }, {
            key: 4,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/create-admin`}>
                    <IconPlus color={"black"}/> {translate("add_addmin")}
                </Link>
            ),
        },
        {
            key: 5,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya`}>
                    <IconPlus color={"black"}/> {translate("Добавить_препарат")}
                </Link>
            ),
        },
        {
            key: 6,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya/lpu`}>
                    <IconPlus color={"black"}/> {translate("Добавить_лпу")}
                </Link>
            ),
        },
        {
            key: 7,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/nastroyka-usloviya/regions`}>
                    <IconPlus color={"black"}/> {translate("Добавить_region_district")}
                </Link>
            ),
        },{
            key: 8,
            label: (
                <Link style={{display: "flex", gap: "5px"}} to={`/managers-goal`}>
                    <IconPlus color={"black"}/> {translate("Цель_менеджеру")}
                </Link>
            ),
        },
    ];
};


// export const NavbarDataAdmin = [
export const NavbarDataAdmin = [...RoutingAdmin];

export const NavbarDataSuperAdmin = [...RoutingChief];

export const NavbarDataManager = [...RoutingManager];
