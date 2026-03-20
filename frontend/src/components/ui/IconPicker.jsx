import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { ChevronDown } from "lucide-react";

const IconPicker = ({ value, onChange, placeholder = "Pick icon..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  const containerRef = useRef(null);

  // Load emoji picker
  useEffect(() => {
    if (!isOpen) return;

    const picker = new Picker({
      data,
      onEmojiSelect: (emoji) => {
        onChange(emoji.native); // ✅ send to parent
        setIsOpen(false);
      },
    });

    pickerRef.current.innerHTML = "";
    pickerRef.current.appendChild(picker);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger (EXACT SAME STYLE) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex dark:hover:bg-[oklch(0.25_0_0)] hover:bg-slate-200 dark:bg-[oklch(0.200_0_0)] items-center gap-2 min-h-10 px-3 py-1.5 rounded-lg cursor-pointer transition-colors bg-slate-100 border-0 hover:border-gray-400"
      >
        <div className="flex flex-1 text-sm md:text-lg items-center gap-2">
          {value ? (
            <span className="px-2 py-1 rounded flex items-center text-xl">
              {value}
            </span>
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

      {/* Dropdown (Emoji Picker instead of options) */}
      {isOpen && (
        <div
          className=" fixed md:fixed top-[45%] md:top-[50%]  md:left-1/2 -translate-x-1/2 md:translate-x-0
          mt-0 md:mt-1
          z-50
          rounded-lg shadow-lg overflow-hidden
        dark:border-[oklch(0.25_0_0)]
        dark:bg-[oklch(0.13_0_0)]"
        >
          <div ref={pickerRef} />
        </div>
      )}
    </div>
  );
};

export default IconPicker;
