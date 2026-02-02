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
import { useAuth } from "./context/AuthContext";

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
  const { user } = useAuth();
  if (user)
    return (
      <main>
        <Outlet />
      </main>
    );
  else return <Navigate to={"/dashboard"} replace />;
}

function App() {
  const { setUser, setLoading } = useAuth();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // user backend login
        const id = await user.getIdToken();
        const res = await createUser(id);
        const data = await res.json();
        setUser(data.user);
        console.log(data.user);
        setLoading(false);
      } else {
        // logout user from backend
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
