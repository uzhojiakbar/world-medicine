import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, allowedRoles, children }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
