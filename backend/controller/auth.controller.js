import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import admin from "../config/firebaseAdmin.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const idToken = req.headers.authorization?.split(" ")[1];
  if (!idToken) {
    return res.status(404).json({ message: "Token missing" });
  }

  const decoded = await admin.auth().verifyIdToken(idToken);
  const {
    uid,
    phone_number,
    email,
    name,
    picture,
    firebase: { sign_in_provider },
  } = decoded;

  // checking for exisiting user
  let currentUser = await user.findOne({ firebaseid: uid });

  if (!currentUser) {
    // creating new user
    currentUser = await user.create({
      firebaseid: uid,
      phone_number,
      email,
      name,
      avatar: picture,
      authProviders: [sign_in_provider],
      isPhoneVerified: !!phone_number,
    });
  } else {
    if (!currentUser.authProviders.includes(sign_in_provider)) {
      currentUser.authProviders.push(sign_in_provider);
      await currentUser.save();
    }
  }

  const token = jwt.sign({ userId: currentUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const responseData = {
    name: currentUser.name,
    email: currentUser.email,
    phone_number: currentUser.phone_number,
    avatar: currentUser.avatar,
  };

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ user: responseData });
});

export const clearSession = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out" });
});
