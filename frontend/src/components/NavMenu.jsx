import { UserCircle } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

function NavMenu({ className }) {
  return (
    <>
      <div className={className}>
        <DarkModeToggle />
        <UserCircle />
      </div>
    </>
  );
}

export default NavMenu;
