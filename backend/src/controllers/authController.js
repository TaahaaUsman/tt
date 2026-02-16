import { getTokenFromRequest } from "../middlewares/auth.js";
import * as authService from "../services/authService.js";

const isReactNative = (req) =>
  req.headers["user-agent"]?.includes("Expo") ||
  req.headers["user-agent"]?.includes("ReactNative") ||
  req.headers["x-app-type"] === "ReactNative";

export async function login(req, res) {
  const { email, password } = req.body || {};
  const result = await authService.loginUser({ email, password });
  if (result.error) return res.status(result.status || 401).json({ error: result.error });
  const body = { message: "Login successful", token: result.token, user: result.user };
  if (!isReactNative(req)) {
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }
  res.json(body);
}

export async function register(req, res) {
  try {
    const result = await authService.registerUser(req.body);
    if (result.error) return res.status(result.status || 400).json({ error: result.error });
    if (!isReactNative(req)) res.cookie("verifyEmail", req.body?.email, { maxAge: 15 * 60, path: "/" });
    res.status(result.status || 201).json({ message: result.message });
  } catch (err) {
    console.error("❌ Register API Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await authService.getCurrentUser(token);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json(result.user);
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function verifyEmail(req, res) {
  try {
    const email = isReactNative(req) ? req.body?.email : req.cookies?.verifyEmail;
    const code = req.body?.code;
    const result = await authService.verifyEmail({ email, code });
    if (result.error) return res.status(result.status === 200 ? 200 : result.status).json({ error: result.error });
    if (!isReactNative(req)) {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      res.clearCookie("verifyEmail");
    }
    res.json({ message: result.message, token: result.token, user: result.user });
  } catch (err) {
    console.error("❌ Email verification error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function registerWithGoogle(req, res) {
  try {
    const result = await authService.registerWithGoogle(req.body);
    if (result.error) return res.status(result.status).json({ error: result.error });
    if (!isReactNative(req))
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    res.json({ message: result.message, token: result.token, user: result.user });
  } catch (err) {
    console.error("Google SignIn error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function forgetPassword(req, res) {
  try {
    const result = await authService.forgetPassword(req.body?.email);
    if (result.error) return res.status(result.status).json({ error: result.error });
    if (result.verifyEmail)
      res.cookie("verifyEmail", result.verifyEmail, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60,
      });
    res.json({ message: result.message });
  } catch (err) {
    console.error("❌ Error in forget-password API:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function resetPassword(req, res) {
  try {
    const token = req.cookies?.token;
    const result = await authService.resetPassword({
      token,
      password: req.body?.password,
      confirmPassword: req.body?.confirmPassword,
    });
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json({ message: result.message });
  } catch (err) {
    console.error("❌ Error in reset-password:", err);
    res.status(500).json({ error: "Server Error" });
  }
}

export async function resendCode(req, res) {
  try {
    const email = req.cookies?.verifyEmail;
    const result = await authService.resendCode(email);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json({ message: result.message });
  } catch (err) {
    console.error("❌ Resend OTP error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
