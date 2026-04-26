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
  const [firebaseResult, backendResult] = await Promise.allSettled([
    signOut(auth),
    fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }),
  ]);

  if (firebaseResult.status === "rejected") {
    console.error("Firebase signout failed:", firebaseResult.reason);
  }

  if (backendResult.status === "rejected") {
    console.error("Backend logout failed:", backendResult.reason);
  }
};

export const getSessionUser = async () => {
  return fetch(`${API}/api/auth/checkSessionUser`, {
    method: "GET",
    credentials: "include",
  });
};
