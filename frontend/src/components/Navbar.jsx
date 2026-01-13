import { TrendingUp } from "lucide-react";
import Search from "./Search";
import NavMenu from "./NavMenu";

function Navbar() {
  return (
    <>
      <div className="w-full flex justify-between py-5 px-2 sm:px-10 dark:bg-black dark:text-white border-b border-b-gray-300 ">
        <div className="flex gap-10 w-full">
          <div className="flex justify-center sm:justify-start w-full sm:w-fit gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-emerald-500 flex items-center justify-center">
              <TrendingUp className=" text-white" />
            </div>
            <span className="flex text-xl sm:text-2xl font-semibold items-center">
              Expense Tracker
            </span>
          </div>
          {/* search transaction */}
          <Search className={"hidden sm:flex"} />
        </div>

        {/* darl mode,notification,profile */}
        <NavMenu className={"hidden sm:flex gap-2 sm:gap-8 items-center"} />
      </div>
    </>
  );
}

export default Navbar;
