import { SearchIcon } from "lucide-react";

function Search({ className }) {
  return (
    <>
      <div
        className={`${className} bg-slate-200 dark:bg-black focus-within:ring-2 transition focus-within:ring-blue-400 dark:focus-within:ring-slate-300 dark:border flex gap-2 items-center w-full sm:w-1/3 py-1 px-4 ms-20 rounded-xl`}
      >
        <SearchIcon className="" />
        <input
          type="text"
          placeholder="Search Transaction..."
          className="w-full focus:outline-none placeholder-gray-600 dark:placeholder-gray-400"
        />
      </div>
    </>
  );
}

export default Search;
