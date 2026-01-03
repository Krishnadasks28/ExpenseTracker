import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import admin from "firebase-admin";

export const register = async (req, res) => {
  const { idToken } = req.body;

  const decoded = await admin.auth().verifyIdToken(idToken);

  const {
    uid,
    phone_number,
    email,
    name,
    picture,
    firebase: { sign_in_provider },
  } = decoded;

  let currentUser = await user.findOne({ firebaseid: uid });

  if (!currentUser) {
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

  res.cookie("token", token, { httpOnly: true });
  res.json({ user: currentUser });
};
