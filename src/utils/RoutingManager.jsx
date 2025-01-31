import AnaliktikaPage from "../pages/analiktika/analiktikaPage";
import CreateMedAgent from "../pages/createMedAgent";
import ManagerHome from "../pages/manager";
import AddDoctor from "../pages/manager/addDoctor/AddDoctor";
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
        <CreateDogovorMain />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 7,
    title: "Добавить врача",
    path: "add-doctor",
    element: (
      <MainContainer>
        <AddDoctor />
      </MainContainer>
    ),
    child: [],
    visible: false,
    onlyAdmin: false,
    icon: false,
  },

];
