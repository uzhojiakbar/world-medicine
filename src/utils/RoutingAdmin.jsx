import { Route } from "react-router-dom";
import MestaRabota from "../pages/setingsCondition/MestaRabota";
import AdminHomePage from "../rolls/admin/Home";
import { MainContainer } from "../root/style";
import Arxiv from "../pages/setingsCondition/Arxiv/Arxiv";
import Preparat from "../pages/setingsCondition/Preprat";

export const RoutingAdmin = [
    {
        id: 4,
        title: "Главная",
        path: "/",
        element: (
            <MainContainer>
                <AdminHomePage />
            </MainContainer>
        ),
        child: (
            <>
                <Route path="" element={<Arxiv />} />
                <Route path="Preparad" element={<Preparat />} />
                <Route path="Mestrabotaya" element={<MestaRabota />} />
            </>
        ),
        visible: true,
        onlyAdmin: false,
        icon: false,
    },
]