import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const createUser = (id) => {
  return fetch("/api/auth/createUser", {
    method: "POST",
    headers: {
      authorization: `Bearer ${id}`,
    },
    credentials: "include",
  });
};

export const logoutUser = async () => {
  await signOut(auth);
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};
