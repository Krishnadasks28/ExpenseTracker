import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/Loading.jsx";
import MinimalLoading from "../ui/MinimalLoading.jsx";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (!visited) {
      setIsFirstVisit(true);
    }
  }, []);

  const { user, loading } = useSelector((state) => state.user);
  if (loading) return isFirstVisit ? <Loading /> : <MinimalLoading />;

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
