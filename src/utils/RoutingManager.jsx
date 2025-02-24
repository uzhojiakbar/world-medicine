import ManagerBase from "../rolls/manager/base/ManagerBase";
import ManagerHome from "../rolls/manager";
import AddDoctor from "../rolls/manager/addDoctor/AddDoctor";
import CreateDogovorMain from "../rolls/manager/createDogovor";
import PurposeMedAgent from "../rolls/manager/PurposeMedAgent";
import ReportsClient from "../rolls/manager/reportsClient";
import Profile from "../pages/profile/admin";
import Rahmadjon from "../Rahmadjon";
import {MainContainer} from "../root/style";
import MedRepGoal from "../rolls/manager/home/MedRepGoal/ManagersGoal";
import DoctorAddContact from "../rolls/manager/home/DoctorContract/DoctorAddContact.jsx";
import CreateMedAgent from "../pages/createMedAgent/index.jsx";

export const RoutingManager = [
    {
        id: 1,
        title: "Главная",
        path: "/",
        element: (
            <MainContainer>
                <ManagerHome/>
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
                <ManagerBase/>
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
                <ReportsClient/>
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
        path: "goal-med-rep",
        element: (
            <MainContainer>
                <MedRepGoal/>
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
                <Profile/>
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
        path: "med-agent-create-contract",
        element: (
            <MainContainer>
                <MedRepGoal/>
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    }, {
        id: 48,
        title: "Создание_договора",
        path: "doctor-create-contract",
        element: (
            <MainContainer>
                <CreateMedAgent/>
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
                <AddDoctor/>
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },
];
