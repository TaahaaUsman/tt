import db from "../config/db.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export async function loginUser({ email, password }) {
  await db();
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return { error: "Invalid credentials", status: 401 };
  if (!user.isEmailVerified)
    return { error: "Email not verified", status: 403 };
  const token = createToken(user._id);
  return {
    token,
    user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePictureUrl },
  };
}

export async function registerUser(body) {
  await db();
  const { name, username, email, password, confirmPassword } = body;
  if (!name || !username || !email || !password || !confirmPassword)
    return { error: "All fields are required", status: 400 };
  if (password !== confirmPassword)
    return { error: "Both passwords should be the same", status: 400 };
  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "User already exists", status: 409 };

  const salt = await bcrypt.genSalt(11);
  const passwordHash = await bcrypt.hash(password, salt);
  const profilePic = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}`;
  const newUser = new User({
    name,
    username,
    email,
    passwordHash,
    profilePictureUrl: profilePic,
  });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  newUser.emailVerificationCode = otp;
  newUser.emailVerificationExpiry = new Date(Date.now() + 15 * 60 * 1000);
  await newUser.save();
  await sendVerificationEmail(email, otp);
  return { message: "User registered and waiting for email verification", status: 201 };
}

export async function getCurrentUser(token) {
  await db();
  if (!token) return { error: "Unauthorized", status: 401 };
  const decoded = verifyToken(token);
  if (!decoded?.id) return { error: "Unauthorized", status: 401 };
  const user = await User.findById(decoded.id).select("-passwordHash -__v");
  if (!user) return { error: "Unauthorized", status: 401 };
  return { user };
}

export async function verifyEmail({ email, code }) {
  await db();
  if (!email) return { error: "Email not found in request or session", status: 400 };
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found", status: 404 };
  if (user.isEmailVerified) return { error: "Email already verified", status: 200 };
  if (user.emailVerificationCode !== code || user.emailVerificationExpiry < new Date())
    return { error: "Invalid or expired code", status: 400 };

  user.isEmailVerified = true;
  user.emailVerificationCode = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save();
  const token = createToken(user._id);
  return {
    message: "Login successful",
    token,
    user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePictureUrl },
  };
}

export async function registerWithGoogle({ name, email, profilePictureUrl }) {
  await db();
  if (!email || !name) return { error: "Missing email or name", status: 400 };
  let user = await User.findOne({ email });
  if (!user)
    user = await User.create({ name, email, profilePictureUrl, isEmailVerified: true });
  const token = createToken(user._id);
  return {
    message: "Login successful",
    token,
    user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePictureUrl },
  };
}

export async function forgetPassword(email) {
  await db();
  const user = await User.findOne({ email });
  if (!user) return { error: "User with this email does not exist", status: 404 };
  const otp = Math.floor(100000 + Math.random() * 900000);
  user.emailVerificationCode = otp;
  user.emailVerificationExpiry = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();
  await sendVerificationEmail(email, otp);
  return { message: "OTP sent to email", verifyEmail: user.email };
}

export async function resetPassword({ token, password, confirmPassword }) {
  await db();
  if (!password || !confirmPassword) return { error: "All fields are required", status: 400 };
  if (password !== confirmPassword) return { error: "Passwords do not match", status: 400 };
  if (!token) return { error: "Unauthorized: No token", status: 401 };
  const decoded = verifyToken(token);
  if (!decoded?.id) return { error: "Invalid token", status: 401 };
  const user = await User.findById(decoded.id);
  if (!user) return { error: "User not found", status: 404 };
  user.passwordHash = await bcrypt.hash(password, 11);
  await user.save();
  return { message: "Password updated successfully" };
}

export async function resendCode(email) {
  await db();
  if (!email) return { error: "No verification session", status: 400 };
  const user = await User.findOne({ email });
  if (!user) return { error: "User not found", status: 404 };
  if (user.isEmailVerified) return { message: "Email already verified", status: 200 };
  const newOTP = Math.floor(100000 + Math.random() * 900000);
  user.emailVerificationCode = newOTP;
  user.emailVerificationExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await sendVerificationEmail(email, newOTP);
  return { message: "OTP resent successfully" };
}
