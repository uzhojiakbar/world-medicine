import AnaliktikaPage from "../pages/analiktika/analiktikaPage";
import CreateMedAgent from "../pages/createMedAgent";
import ManagerHome from "../pages/manager";
import CreateDogovorMain from "../pages/manager/createDogovor";
import PurposeMedAgent from "../pages/manager/PurposeMedAgent";
import ReportsClient from "../pages/manager/reportsClient";
import Profile from "../pages/profile/admin";
import Rahmadjon from "../Rahmadjon";
import { MainContainer } from "../root/style";

export const RoutingManager = [
  {
    id: 1,
    title: "Главная",
    path: "/",
    element: (
      <MainContainer>
        <ManagerHome />
      </MainContainer>
    ),
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 2,
    title: "База",
    path: "database",
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
    title: "Отчет",
    path: "reports-client",
    element: (
      <MainContainer>
        <ReportsClient />
      </MainContainer>
    ),
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 2,
    title: "Цель мед. представителю",
    path: "purpose-med-agent",
    element: (
      <MainContainer>
        <PurposeMedAgent />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 2,
    title: "Rahmadjon",
    path: "Rahmadjon",
    element: (
      <MainContainer>
        <Rahmadjon />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  // {
  //   id: 3,
  //   title: "navbar_admin_upr_sis",
  //   path: "upravleniya-sistemoy",
  //   element: (
  //     <MainContainer>
  //       <SettingsSystemAdmin />
  //     </MainContainer>
  //   ),
  //   child: [],
  //   visible: true,
  //   onlyAdmin: false,
  //   icon: false,
  // },
  // {
  //   id: 3,
  //   title: "Настройка_условий",
  //   path: "nastroyka-usloviya",
  //   element: (
  //     <MainContainer>
  //       <SettingsCondition />
  //     </MainContainer>
  //   ),
  //   child: (
  //     <>
  //       <Route path="" element={<Arxiv />} />
  //       <Route path="Preparad" element={<Preparat />} />
  //       <Route path="Mestrabotaya" element={<MestaRabotaManager />} />
  //     </>
  //   ),
  //   visible: true,
  //   onlyAdmin: false,
  //   icon: false,
  // },
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
    path: "create-contract",
    element: (
      <MainContainer>
        {/* <AddMeneger /> */}
        <CreateDogovorMain />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  // {
  //   id: 6,
  //   title: "Добавить менеджера",
  //   path: "create-manager",
  //   element: (
  //     <MainContainer>
  //       <AddMeneger />
  //     </MainContainer>
  //   ),
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
  // {
  //   id: 7,
  //   title: "Добавление МП",
  //   path: "create-med-rep",
  //   element: (
  //     <MainContainer>
  //       <AddPm />
  //     </MainContainer>
  //   ),
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
  // {
  //   id: 8,
  //   title: "Добавление МП",
  //   path: "create-doctor",
  //   element: (
  //     <MainContainer>
  //       <AddDoctor />
  //     </MainContainer>
  //   ),
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
  // {
  //   id: 999,
  //   title: "NOT FOUND PAGE",
  //   path: "*",
  //   element: (
  //     <MainContainer>
  //       <h1>Not Found</h1>
  //     </MainContainer>
  //   ),
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
  // {
  //   id: 897,
  //   title: "Reports",
  //   path: "reports",
  //   element: (
  //     <MainContainer>
  //       {/* <h1>Not Found</h1> */}
  //       <AnaliktikaPage />
  //     </MainContainer>
  //   ),
  //   child: [],
  //   visible: false,
  //   onlyAdmin: false,
  //   icon: false,
  // },
];
