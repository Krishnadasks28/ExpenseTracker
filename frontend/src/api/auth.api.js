import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const API = import.meta.env.VITE_API_URL;

export const createUser = async (id) => {
  return fetch(`${API}/api/auth/createUser`, {
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
  await fetch(`${API}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const getSessionUser = async () => {
  return fetch(`${API}/api/auth/checkSessionUser`, {
    method: "GET",
    credentials: "include",
  });
};
