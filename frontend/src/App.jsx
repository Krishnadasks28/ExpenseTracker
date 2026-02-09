import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import { createUser } from "./api/auth.api";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { getCategories } from "./api/categories.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "./redux/slices/userReducer";
import { setCategory } from "./redux/slices/categorySlice";

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
    const unSub = onAuthStateChanged(auth, async (user) => {
      // implement backend session checking
      // call createUser api only if session is expired

      if (user) {
        // user backend login
        const id = await user.getIdToken();
        const res = await createUser(id);
        const data = await res.json();
        dispatch(setUser(data.user));
        // fetch categories

        const response = await getCategories();
        const categoryList = await response.json();
        dispatch(setCategory(categoryList));
      } else {
        dispatch(setUser(null));
        dispatch(setLoading(false));
      }
    });
    return () => unSub(); //listener cleanup
  }, []);

  return (
    <>
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
