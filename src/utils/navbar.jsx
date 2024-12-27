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
import AddPreporad from "../pages/setingsCondition/Predoji";

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

export const NavbarDataAdmin = [
  {
    id: 1,
    title: "Main Page Admin",
    path: "/",
    element: (
      <MainContainer>
        <AdminPage />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 1,
    title: "navbar_admin_analiktika",
    path: "analiktika",
    element: (
      <MainContainer>
        <AnaliktikaPage />
      </MainContainer>
    ),
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 2,
    title: "navbar_admin_upr_sis",
    path: "upravleniya-sistemoy",
    element: (
      <MainContainer>
        <SettingsSystemAdmin />
      </MainContainer>
    ),
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 3,
    title: "Настройка_условий",
    path: "nastroyka-usloviya",
    element: (
      <MainContainer>
        <SettingsCondition />
      </MainContainer>
    ),
    child: (
      <>
        <Route path="" element={<Arxiv />} />
        <Route path="Preparad" element={<h1>2</h1>} />
        <Route path="Mestrabotaya" element={<h1>3</h1>} />
        <Route path="Predoji" element={<AddPreporad />} />{" "}
      </>
    ),
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 5,
    title: "Profile",
    path: "profile",
    element: (
      <MainContainer>
        <Profile />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 6,
    title: "Добавить менеджера",
    path: "create-manager",
    element: (
      <MainContainer>
        <AddMeneger />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 6,
    title: "NOT FOUND PAGE",
    path: "*",
    element: (
      <MainContainer>
        <h1>Not Found</h1>
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 6,
    title: "Reports",
    path: "reports",
    element: (
      <MainContainer>
        {/* <h1>Not Found</h1> */}
        <AnaliktikaPage />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },

  // {
  //   id: 4,
  //   title: "Создать договор",
  //   path: "create-contract",
  //   element: <AdminCreateContract />,
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
];
export const NavbarDataSuperAdmin = [
  {
    id: 1,
    title: "Main Page Admin",
    path: "/",
    element: (
      <MainContainer>
        <AdminPage />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 1,
    title: "navbar_admin_analiktika",
    path: "analiktika",
    element: (
      <MainContainer>
        <AnaliktikaPage />
      </MainContainer>
    ),
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 2,
    title: "navbar_admin_upr_sis",
    path: "upravleniya-sistemoy",
    element: (
      <MainContainer>
        <SettingsSystemAdmin />
      </MainContainer>
    ),
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 3,
    title: "Настройка_условий",
    path: "nastroyka-usloviya",
    element: (
      <MainContainer>
        <SettingsCondition />
      </MainContainer>
    ),
    child: (
      <>
        <Route path="" element={<Arxiv />} />
        <Route path="Preparad" element={<h1>2</h1>} />
        <Route path="Mestrabotaya" element={<h1>3</h1>} />
      </>
    ),
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 5,
    title: "Profile",
    path: "profile",
    element: (
      <MainContainer>
        <Profile />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 6,
    title: "Добавить менеджера",
    path: "create-manager",
    element: (
      <MainContainer>
        <AddMeneger />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 6,
    title: "NOT FOUND PAGE",
    path: "*",
    element: (
      <MainContainer>
        <h1>Not Found</h1>
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 6,
    title: "Reports",
    path: "reports",
    element: (
      <MainContainer>
        {/* <h1>Not Found</h1> */}
        <AnaliktikaPage />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },

  // {
  //   id: 4,
  //   title: "Создать договор",
  //   path: "create-contract",
  //   element: <AdminCreateContract />,
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
];
