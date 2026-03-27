import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/Loading.jsx";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) return <Loading />;

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
