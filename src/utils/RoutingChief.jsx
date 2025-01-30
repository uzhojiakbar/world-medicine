import AdminPage from "../rolls/chief/chief";
import { MainContainer } from "../root/style";

export const RoutingChief = [
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
  //   id: 4,
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
  //       <Route path="Mestrabotaya" element={<MestaRabota />} />
  //       <Route path="Predoji" element={<AddPreporad />} />{" "}
  //     </>
  //   ),
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
  // {
  //   id: 7,
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
  //   id: 8,
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
  //   id: 10,
  //   title: "Цель мед. представителю",
  //   path: "pupose-med-agent",
  //   element: (
  //     <MainContainer>
  //       <CreateMedAgent />
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
