import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function DarkModeToggle() {
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
      <div className="cursor-pointer p-1 hover:bg-slate-100 dark:hover:text-black rounded-xl">
        {dark ? (
          <Sun onClick={() => toggleDark()} />
        ) : (
          <Moon onClick={() => toggleDark()} />
        )}
      </div>
    </>
  );
}

export default DarkModeToggle;
