import { Link, Route } from "react-router-dom";
import Analiktika from "../pages/analiktika/analiktika";
import AdminAnaliktika from "../pages/analiktika/admin/adminAnaliktika";
import SettingsConditionAdmin from "../pages/setingsCondition/admin/index";
import AdminCreateContract from "../pages/createContract/admin/adminCreateContract";
import SettingsSystemAdmin from "../pages/admin/settingSystemAdmin/SettingsSystemAdmin";
import { useLanguage } from "../context/LanguageContext";
import AddMeneger from "../pages/addManager/AddManager";
import Profile from "../pages/profile/admin";
import AdminPage from "../pages/admin/admin";
import { MainContainer } from "../root/style";
import AnaliktikaPage from "../pages/analiktika/analiktikaPage";
import SettingsCondition from "../pages/setingsCondition";
import Arxiv from "../pages/setingsCondition/Arxiv/Arxiv";

import { RoutingManager } from "./RoutingManager";
import { RoutingChief } from "./RoutingChief";
import { RoutingAdmin } from "./RoutingAdmin";

export const navbarData = () => {
  return [
    {
      id: 1,
      title: "Аналитика",
      path: "analiktika",
      element: <Analiktika />,
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

// export const NavbarDataAdmin = [
export const NavbarDataAdmin = [...RoutingAdmin];

export const NavbarDataSuperAdmin = [...RoutingChief];

export const NavbarDataManager = [...RoutingManager];
