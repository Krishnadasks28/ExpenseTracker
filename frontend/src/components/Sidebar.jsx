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
} from "lucide-react";
import { useState } from "react";

function Sidebar({ currentPage = "dashboard" }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "categories", label: "Categories", icon: FolderKanban },
    { id: "accounts", label: "Accounts", icon: Wallet },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "profile", label: "Settings", icon: Settings },
  ];
  return (
    <>
      <div className="left-6 top-6 fixed">
        <button onClick={() => setShowSideBar(true)} className="">
          <Menu />
        </button>
      </div>
      <div
        className={`${
          showSideBar ? "left-0" : "-left-96"
        } transition-all duration-300 ease-in-out flex flex-col gap-4 sm:left-0 top-0 fixed h-full w-fit bg-white border-r border-slate-300`}
      >
        <div className="flex border-b border-slate-300 ">
          <button onClick={() => setShowSideBar(false)} className="sm:hidden ms-5">
            <ChevronLeftCircle />
          </button>
          <div className="flex gap-3 py-5 px-10">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
              <TrendingUp className=" text-white" />
            </div>
            <span className=" text-lg sm:text-2xl font-semibold items-center flex">
              Expense Tracker
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage == item.id;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl sm:text-xl font-medium ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-400 hover:bg-slate-300 hover:text-gray-800"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <Icon className="h-5 w-5" />
                  <h1>{item.label}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
