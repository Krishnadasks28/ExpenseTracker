import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { createUser, getSessionUser } from "./api/auth.api";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { getCategories } from "./api/categories.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "./redux/slices/userReducer";
import { setCategory } from "./redux/slices/categorySlice";
import { fetchUserData } from "./utils/userData";

// Main layout with navbar and sidebar
function MainLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="lg:ml-80 pt-25 pb-10">
        <Outlet />
      </main>
    </>
  );
}

// Login layout (no navbar/sidebar)
function AuthLayout() {
  const { user } = useSelector((state) => state.user);
  if (user) return <Navigate to={"/dashboard"} replace />;
  else
    return (
      <main>
        <Outlet />
      </main>
    );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSessionUser();
        if (response.ok) {
          const userData = await response.json();
          dispatch(setUser(userData.user));
          await fetchUserData(dispatch);
          const visited = sessionStorage.getItem("visited");
          if (!visited) {
            sessionStorage.setItem("visited", "true");
            await delay(2000);
          }
          dispatch(setLoading(false));

          return true;
        }

        if (response.status === 401) {
          // 👈 expected case → no session
          return false;
        }

        // 👇 unexpected errors
        console.error("Unexpected response:", response.status);
        return false;
      } catch (err) {
        console.log("session check error: ", err);
        console.log("error caught: ", err);
        // alert error
      }
      return false;
    };

    const unSub = onAuthStateChanged(auth, async (user) => {
      // backend session checking
      const hasSession = await checkSession();
      if (hasSession) return;

      // call createUser api only when new user or session expired
      if (user) {
        // force refresh token to get latest token by using true argument
        const id = await user.getIdToken(true);
        const res = await createUser(id);
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data.user));
        }
        const visited = sessionStorage.getItem("visited");
        if (!visited) {
          sessionStorage.setItem("visited", "true");
          await delay(2000);
        }
        dispatch(setLoading(false));

        // fetch user data after login or session expiration
        await fetchUserData(dispatch);
      } else {
        dispatch(setUser(null));
        dispatch(setLoading(false));
      }
    });
    return () => unSub(); //listener cleanup
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
