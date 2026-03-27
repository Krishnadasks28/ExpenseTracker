import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/Loading.jsx";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  useEffect(() => {
    const visited = localStorage.getItem("visited");

    if (!visited) {
      setIsFirstVisit(true);
    }
  }, []);

  const { user, loading } = useSelector((state) => state.user);
  if (loading) return isFirstVisit ? <Loading /> : <div>Loading...</div>;

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
