import AdminPage from "../rolls/chief/chief";
import { MainContainer } from "../root/style";
import Profile from "../pages/profile/admin";
import BaseChief from "../rolls/chief/base";
import SettingsSystemAdmin from "../pages/admin/settingSystemAdmin/SettingsSystemAdmin";
import AddMeneger from "../pages/addManager/AddManager";
import { Route } from "react-router-dom";

import SettingsCondition from "../pages/setingsCondition";
import Arxiv from "../pages/setingsCondition/Arxiv/Arxiv";
import AddPreporad from "../pages/setingsCondition/Predoji";
import Preparat from "../pages/setingsCondition/Preprat";
import AddPm from "../pages/addPm/AddPm";
import MestaRabota from "../pages/setingsCondition/MestaRabota";

import CreateMedAgent from "../pages/createMedAgent/";
import ReportsClient from "../rolls/manager/reportsClient";
import ManagersGoal from "../rolls/chief/home/ManagersGoal/ManagersGoal";
import NastroykaUsloviya from "../rolls/admin/NastroykaUsloviya";
import AdminArxiv from "../rolls/admin/AdminArxiv/Arxiv";
import AdminPreparat from "../rolls/admin/Preprat";
import AdminMestaRabota from "../rolls/admin/MestaRabota";

export const RoutingAdmin = [
    {
        id: 1,
        title: "Главная",
        path: "/",
        element: (
            <MainContainer>
                <AdminPage />
            </MainContainer>
        ),
        child: [],
        visible: true,
        onlyAdmin: false,
        icon: false,
    }, // ! API
    {
        id: 2,
        title: "База",
        path: "database",
        element: (
            <MainContainer>
                <BaseChief />
            </MainContainer>
        ),
        child: [],
        visible: true,
        onlyAdmin: false,
        icon: false,
    },
    {
        id: 6,
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
    }, // * READY
    {
        id: 7,
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
        id: 8,
        title: "Цель менеджеру",
        path: "managers-goal",
        element: (
            <MainContainer>
                <ManagersGoal />
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },
    // {
    //   id: 2,
    //   title: "navbar_admin_analiktika",
    //   path: "analiktika",
    //   element: (
    //     <MainContainer>
    //       <AnaliktikaPage />
    //     </MainContainer>
    //   ),
    //   child: [],
    //   visible: true,
    //   onlyAdmin: false,
    //   icon: false,
    // },

    {
        id: 4,
        title: "Настройка условий",
        path: "/nastroyka-usloviya",
        element: (
            <MainContainer>
                <NastroykaUsloviya />
            </MainContainer>
        ),
        child: (
            <>
                <Route path="" element={<AdminArxiv />} />
                <Route path="Preparad" element={<AdminPreparat />} />
                <Route path="Mestrabotaya" element={<AdminMestaRabota />} />
            </>
        ),
        visible: true,
        onlyAdmin: false,
        icon: false,
    },

    // {
    //   id: 6,
    //   title: "Profile",
    //   path: "profile",
    //   element: (
    //     <MainContainer>
    //       <Profile />
    //     </MainContainer>
    //   ),
    //   child: [],
    //   visible: false,
    //   onlyAdmin: false,
    //   icon: false,
    // },

    {
        id: 8,
        title: "Добавление МП",
        path: "create-med-agent",
        element: (
            <MainContainer>
                <AddPm />
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },
    // {
    //   id: 9,
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
    {
        id: 10,
        title: "Цель мед. представителю",
        path: "pupose-med-agent",
        element: (
            <MainContainer>
                <CreateMedAgent />
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },
    {
        id: 999,
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

    // // {
    // //   id: 4,
    // //   title: "Создать договор",
    // //   path: "create-contract",
    // //   element: <AdminCreateContract />,
    // //   child: [],
    // //   visible: false,
    // //   onlyAdmin: false,
    // //   icon: false,
    // // },
];
