import {
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./config";

// Google signin
const provider = new GoogleAuthProvider();
export const googleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  } catch (err) {
    console.log("Firebase error : ", err);
  }
};

// signin with phone number
export const setUpRecaptcha = async () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    { size: "invisible" },
  );
};

export const sendOtp = async (phone) => {
  const appVerifier = window.recaptchaVerifier;

  try {
    const result = await signInWithPhoneNumber(auth, phone, appVerifier);
    return result;
  } catch (err) {
    console.log("Error in phone signin : ", err);
  }
};

export const verifyOtp = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    alert("user logged in");
    console.log(result);
  } catch (err) {
    console.log("Otp verification error : ", err);
  }
};
