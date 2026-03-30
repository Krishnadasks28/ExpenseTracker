import {
  TrendingUp,
  LayoutDashboard,
  ArrowLeftRight,
  FolderKanban,
  Wallet,
  BarChart3,
  Settings,
  Menu,
  ChevronLeftCircle,
  ToggleLeft,
  Sun,
  Moon,
  ToggleRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Sidebar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "categories", label: "Categories", icon: FolderKanban },
    { id: "accounts", label: "Accounts", icon: Wallet },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleDark = () => {
    setDark((prev) => !prev);
  };
  return (
    <>
      <div className="left-6 top-6 fixed z-20 lg:z-0">
        <button onClick={() => setShowSideBar(true)} className="">
          <Menu />
        </button>
      </div>
      {showSideBar && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={() => setShowSideBar(false)}
        />
      )}
      <div
        className={`${
          showSideBar ? "left-0" : "-left-96"
        } transition-all duration-300 ease-in-out flex flex-col gap-4 lg:left-0 top-0 fixed z-20 h-full w-80 dark:bg-black dark:text-white bg-white border-r border-slate-300`}
      >
        <div className="flex border-b border-slate-300 ">
          <button
            onClick={() => setShowSideBar(false)}
            className="lg:hidden ms-5"
          >
            <ChevronLeftCircle />
          </button>
          <div className="flex gap-3 py-5 px-4 lg:px-10">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
              <TrendingUp className=" text-white" />
            </div>
            <span className="text-lg sm:text-2xl font-semibold items-center flex whitespace-nowrap">
              Expense Tracker
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                to={`/${item.id}`}
                key={item.id}
                onClick={() => setShowSideBar(false)}
                className={({ isActive }) =>
                  `p-4 rounded-xl sm:text-xl font-medium ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "text-slate-400 hover:bg-slate-200 hover:text-gray-800"
                  }`
                }
              >
                <div className="flex gap-3 items-center">
                  <Icon className="h-5 w-5" />
                  <h1>{item.label}</h1>
                </div>
              </NavLink>
            );
          })}

          <div
            onClick={() => toggleDark()}
            className="md:hidden flex justify-between items-center cursor-pointer sm:text-xl rounded-xl font-medium p-4 gap-3 text-slate-400 hover:bg-slate-200 hover:text-gray-800"
          >
            <div className="flex items-center gap-3">
              {dark ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span>Dark Mode</span>
            </div>
            <div
              className={`flex items-center rounded-full px-1.5 py-1 w-13 transition-colors ${
                dark ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  dark ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
