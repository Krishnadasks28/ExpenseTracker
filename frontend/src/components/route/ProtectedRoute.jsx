import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
