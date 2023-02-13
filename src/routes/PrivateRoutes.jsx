import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "contexts";

const PrivateRoutes = () => {
  const {
    auth: { isAuth },
  } = useAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;