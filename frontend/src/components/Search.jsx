import { SearchIcon } from "lucide-react";

function Search({ className }) {
  return (
    <>
      <div
        className={`${className} bg-slate-200 dark:bg-black focus-within:ring-2 transition focus-within:ring-blue-400 dark:focus-within:ring-slate-300 dark:border flex gap-2 items-center w-full sm:w-1/3 py-2 px-4 sm:ms-8 rounded-xl`}
      >
        <SearchIcon className="" />
        <input
          type="text"
          placeholder="Search Transaction..."
          className="w-full focus:outline-none"
        />
      </div>
    </>
  );
}

export default Search;
