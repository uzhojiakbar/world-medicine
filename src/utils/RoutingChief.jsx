import AdminPage from "../rolls/chief/chief";
import {MainContainer} from "../root/style";
import Profile from "../pages/profile/admin";
import BaseChief from "../rolls/chief/base";
import SettingsSystemAdmin from "../pages/admin/settingSystemAdmin/SettingsSystemAdmin";
import AddMeneger from "../pages/addManager/AddManager";
import {Route} from "react-router-dom";

import SettingsCondition from "../pages/setingsCondition";
import Arxiv from "../pages/setingsCondition/Arxiv/Arxiv";
import AddPreporad from "../pages/setingsCondition/Predoji";
import Preparat from "../pages/setingsCondition/Preprat";
import AddPm from "../pages/addPm/AddPm";
import MestaRabota from "../pages/setingsCondition/MestaRabota";

import CreateMedAgent from "../pages/createMedAgent/";
import ReportsClient from "../rolls/manager/reportsClient";
import ManagersGoal from "../rolls/chief/home/ManagersGoal/ManagersGoal";
import Lpu from "../pages/setingsCondition/LPU";
import AddDoctor from "../pages/addDoctor/AddDoctor.jsx";

export const RoutingChief = [
    {
        id: 1,
        title: "Главная",
        path: "/",
        element: (
            <MainContainer>
                <AdminPage/>
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
                <BaseChief/>
            </MainContainer>
        ),
        child: [],
        visible: true,
        onlyAdmin: false,
        icon: false,
    },
    {
        id: 3,
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
    }, // * READY

    // create mng
    {
        id: 4,
        title: "Добавить менеджера",
        path: "create-manager",
        element: (
            <MainContainer>
                <AddMeneger/>
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },
    // create doctor
    {
        id: 10,
        title: "Добавить_менеджера",
        path: "create-doctor",
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
    // goal mng
    {
        id: 5,
        title: "Цель менеджеру",
        path: "managers-goal",
        element: (
            <MainContainer>
                <ManagersGoal/>
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },

    {
        id: 6,
        title: "Настройка_условий",
        path: "nastroyka-usloviya",
        element: (
            <MainContainer>
                <SettingsCondition/>
            </MainContainer>
        ),
        child: (
            <>
                <Route path="" element={<Preparat/>}/>
                <Route path="Predoji" element={<AddPreporad/>}/>{" "}
                <Route path="Arxiv" element={<Arxiv/>}/>
                <Route path="lpu" element={<Lpu/>}/>
            </>
        ),
        visible: true,
        onlyAdmin: false,
        icon: false,
    },

    {
        id: 7,
        title: "Добавление МП",
        path: "create-med-agent",
        element: (
            <MainContainer>
                <AddPm/>
            </MainContainer>
        ),
        child: [],
        visible: false,
        onlyAdmin: false,
        icon: false,
    },

    {
        id: 8,
        title: "Цель мед. представителю",
        path: "pupose-med-agent",
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

    // otchot
    {
        id: 9,
        title: "Отчеты",
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
