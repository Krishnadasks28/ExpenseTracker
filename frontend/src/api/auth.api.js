import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const createUser = async (id) => {
  return fetch("/api/auth/createUser", {
    method: "POST",
    headers: {
      authorization: `Bearer ${id}`,
    },
    credentials: "include",
  });
};

export const logoutUser = async () => {
  // firebase signout
  await signOut(auth);

  // backend signout
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const getSessionUser = async () => {
  return fetch("/api/auth/checkSessionUser", {
    method: "GET",
    credentials: "include",
  });
};
