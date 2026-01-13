import { Bell, UserCircle } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

function NavMenu({ className }) {
  return (
    <>
      <div className={className}>
        <DarkModeToggle />
        <Bell />
        <UserCircle />
      </div>
    </>
  );
}

export default NavMenu;
