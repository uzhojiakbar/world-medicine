import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { NavbarDataAdmin, NavbarDataSuperAdmin } from "../utils/navbar";
import { useAuth } from "../context/AuthContext/AuthContext";
import { MainContainer } from "../root/style";
import { getCookie } from "../hooks/useCookie";
import PrivateRoute from "../components/Navigate/PrivateRoute";
import Cookies from "js-cookie";
import AdminNavbar from "../components/navbar/admin/navbar";

// Components
const NotAuth = lazy(() => import("../components/Navigate/notAuth"));
const OnlyAdmin = lazy(() => import("../components/Navigate/onlyAdmin"));

// Pages
const AdminPage = lazy(() => import("../pages/admin/admin"));
const Login = lazy(() => import("../pages/login/login"));
const CompleteSetup = lazy(() => import("../pages/login/ForgetPassword"));
const SettingsCondition = lazy(() => import("../pages/setingsCondition/index"));

// Loader
const Loader = () => (
  <div className="loaderWindow">
    <div className="loader" />
  </div>
);

const Router = () => {
  // const { role } = useAuth();
  const role = getCookie("role");
  const location = useLocation();
  const isAdmin = role == "CHIEF";

  const lastPage = localStorage.getItem("lastPage");

  const currentUserRole = Cookies.get("role");
  console.log("HOZIRGI ROLE: ", currentUserRole);

  // return (
  //   <Suspense fallback={<Loader />}>
  //     <Routes>
  //       {/* Root redirect */}
  //       <Route
  //         path="/"
  //         element={
  //           <MainContainer>
  //             <NotAuth>
  //               {/* <Navigate to={isAdmin ? <AdminPage /> : <Login />} replace /> */}
  //               {isAdmin ? <AdminPage /> : <Login />}
  //             </NotAuth>
  //           </MainContainer>
  //         }
  //       />

  //       {/* Protected admin routes */}
  //       <Route
  //         path="/admin/*"
  //         element={
  //           isAdmin ? (
  //             <MainContainer>
  //               <OnlyAdmin>
  //                 <AdminPage />
  //               </OnlyAdmin>
  //             </MainContainer>
  //           ) : (
  //             <Navigate to={"/notadmin"} />
  //           )
  //         }
  //       >
  //         {NavbarDataAdmin.map(({ id, path, element }) => (
  //           <Route key={id} path={path} element={element} />
  //         ))}
  //         <Route
  //           path="*"
  //           element={
  //             <MainContainer>
  //               <OnlyAdmin>
  //                 <Navigate
  //                   to={
  //                     // lastPage === "login" || lastPage === "/login"
  //                     //   ? "/admin"
  //                     //   : lastPage || "/admin/analiktika"
  //                     lastPage ? lastPage : "/admin/analiktika"
  //                   }
  //                   replace
  //                 />
  //               </OnlyAdmin>
  //             </MainContainer>
  //           }
  //         />
  //       </Route>

  //       {/* Public routes */}
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/forget-password" element={<CompleteSetup />} />
  //       {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
  //     </Routes>

  //   </Suspense>

  // ADMIN ROUTES
  if (currentUserRole === "CHIEF") {
    return (
      <Suspense fallback={<Loader />}>
        <AdminNavbar />

        <Routes>
          {NavbarDataAdmin.map(({ id, path, element, child }) => {
            if (child.length) {
              return <Route key={id} path={path} element={element} />;
            } else {
              return (
                <Route key={id} path={path} element={element}>
                  {child}
                </Route>
              );
            }
          })}

          {/* <Route path="nastroyka-usloviya/" element={<h1>1</h1>} /> */}

          {/* <Route
            path="/nastroyka-usloviya"
            element={
              <MainContainer>
                <SettingsCondition />
              </MainContainer>
            }
          >
            <Route path="" element={<h1>221</h1>} />
            <Route path="Preparad" element={<h1>2</h1>} />
            <Route path="Mestrabotaya" element={<h1>3</h1>} />
            <Route path="Predoji" element={<h1>4</h1>} />
            <Route path="*" element={<h1>NOT FOUND</h1>} />
          </Route> */}
        </Routes>
      </Suspense>
    );
  }

  // FF
  else if (currentUserRole === "SUPERADMIN") {
    return (
      <Suspense fallback={<Loader />}>
        <AdminNavbar />

        <Routes>
          {NavbarDataSuperAdmin.map(({ id, path, element, child }) => {
            if (child.length) {
              return <Route key={id} path={path} element={element} />;
            } else {
              return (
                <Route key={id} path={path} element={element}>
                  {child}
                </Route>
              );
            }
          })}
        </Routes>
      </Suspense>
    );
  }
  // MANAGER
  else if (currentUserRole === "MANAGER") {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute role={currentUserRole} allowedRoles={["MANAGER"]}>
                <h1>MANAGER HOME</h1>
              </PrivateRoute>
            }
          />
          <Route
            path="/analiktika"
            element={
              <PrivateRoute role={currentUserRole} allowedRoles={["MANAGER"]}>
                <h1>MANAGER ANALIKTIKA</h1>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </Suspense>
    );
  }

  // Public Routes
  else {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<CompleteSetup />} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </Suspense>
    );
  }
  // return (
  //   <Suspense fallback={<Loader />}>
  //     <Routes>
  //       {/* Public routes */}
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/forget-password" element={<CompleteSetup />} />
  //       {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}

  //       {/* Admin */}

  //       <Route
  //         path="/"
  //         element={
  //           <PrivateRoute role={currentUserRole} allowedRoles={["admin"]}>
  //             <h1>ADMIN HOME</h1>
  //           </PrivateRoute>
  //         }
  //       />
  //       <Route
  //         path="/analiktika"
  //         element={
  //           <PrivateRoute role={currentUserRole} allowedRoles={["admin"]}>
  //             <h1>ADMIN ANALIKTIKA</h1>
  //           </PrivateRoute>
  //         }
  //       />

  //       {/* FF marshrutlari */}
  //       <Route
  //         path="/"
  //         element={
  //           <PrivateRoute role={currentUserRole} allowedRoles={["FF"]}>
  //             <h1>FF home</h1>
  //           </PrivateRoute>
  //         }
  //       />
  //     </Routes>
  //   </Suspense>
  // );
};

export default Router;

{
  /* <Route
          path="/"
          element={
            <MainContainer>
              <NotAuth>
                <Navigate
                  to={
                    isAdmin
                      ? lastPage === "login" || lastPage === "/login"
                        ? "/admin"
                        : lastPage || "/admin/analiktika"
                      : "/login"
                  }
                  replace
                />
              </NotAuth>
            </MainContainer>
          }
        /> */
}
