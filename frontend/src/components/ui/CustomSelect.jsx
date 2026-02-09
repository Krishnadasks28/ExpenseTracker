import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "select an option...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex dark:hover:bg-[oklch(0.25_0_0)] hover:bg-slate-200 dark:bg-[oklch(0.200_0_0)] items-center gap-2 min-h-10 px-3 py-1.5 rounded-lg cursor-pointer transition-colors bg-slate-100 border-0 hover:border-gray-400"
      >
        <div className="flex flex-1 text-sm md:text-lg items-center gap-2">
          {value ? (
            <p
              className={`${value === "Income" ? "text-emerald-500 " : value === "Expense" ? "text-red-500 " : ""}px-2 py-1 rounded flex items-center`}
            >
              {value}
            </p>
          ) : (
            <span className="text-gray-400 px-2 py-1">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center">
          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 dark:bg-[oklch(0.13_0_0)] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="max-h-48 overflow-y-auto p-1">
            {options.length > 0 ? (
              options.map((option) => {
                const isSelected = value === option;

                return (
                  <li key={option}>
                    <button
                      onClick={() => handleSelect(option)}
                      className={`w-full rounded-lg flex justify-between items-center text-left px-3 text-sm md:text-lg py-2 transition-colors dark:hover:bg-[oklch(0.2_0_0)] hover:bg-slate-200`}
                    >
                      <p
                        className={`${option === "income" ? "text-emerald-500" : option === "expense" ? "text-red-500" : ""} first-letter:uppercase`}
                      >
                        {option}
                      </p>
                      {isSelected && <Check size={18} />}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
