import { Bell, Search, TrendingUp, UserCircle } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  return (
    <>
      <div className="w-full flex justify-between py-4 px-10 dark:bg-black dark:text-white border-b border-b-gray-300 ">
        <div className="flex gap-10 w-full">
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
              <TrendingUp className=" text-white" />
            </div>
            <span className="text-3xl font-semibold items-center flex">
              Expense Tracker
            </span>
          </div>
          {/* search transaction */}

          <div className="bg-slate-200 dark:bg-black dark:border flex gap-2 items-center w-1/3 py-2 px-4 rounded-xl">
            <Search className="" />
            <input
              type="text"
              placeholder="Search Transaction..."
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        {/* darl mode,notification,profile */}
        <div className="flex gap-8 items-center">
          <DarkModeToggle />
          <Bell />
          <UserCircle />
        </div>
      </div>
    </>
  );
}

export default Navbar;
