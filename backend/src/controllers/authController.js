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

// --- Google OAuth (Option A: backend callback) ---
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

// Server-side state store (avoids cookie issues with proxy/cross-origin)
const oauthStateStore = new Map();
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;
function setOAuthState(state) {
  oauthStateStore.set(state, Date.now());
  setTimeout(() => oauthStateStore.delete(state), OAUTH_STATE_TTL_MS);
}
function consumeOAuthState(state) {
  const ok = oauthStateStore.has(state);
  oauthStateStore.delete(state);
  return ok;
}

export async function googleRedirect(req, res) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      return res.redirect(
        (process.env.FRONTEND_URL || "http://localhost:5173") + "/auth/login?error=Google+OAuth+not+configured"
      );
    }
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    const state = Math.random().toString(36).slice(2) + Date.now();
    setOAuthState(state);
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      state,
    });
    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
  } catch (err) {
    console.error("Google redirect error:", err);
    res.redirect(
      (process.env.FRONTEND_URL || "http://localhost:5173") + "/auth/login?error=Server+error"
    );
  }
}

export async function googleCallback(req, res) {
  const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";
  const loginUrl = frontendBase + "/auth/login";
  try {
    const { code, state } = req.query;
    if (!code || !state || !consumeOAuthState(state)) {
      return res.redirect(loginUrl + "?error=Invalid+state+or+missing+code");
    }
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return res.redirect(loginUrl + "?error=Google+OAuth+not+configured");
    }
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Google token error:", tokenRes.status, errText);
      return res.redirect(loginUrl + "?error=Google+token+exchange+failed");
    }
    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token;
    if (!accessToken) {
      return res.redirect(loginUrl + "?error=No+access+token");
    }

    const userRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userRes.ok) {
      return res.redirect(loginUrl + "?error=Failed+to+get+user+info");
    }
    const profile = await userRes.json();
    const name = profile.name || profile.email?.split("@")[0] || "User";
    const email = profile.email;
    const profilePictureUrl = profile.picture || null;
    if (!email) {
      return res.redirect(loginUrl + "?error=Email+not+provided+by+Google");
    }

    const result = await authService.registerWithGoogle({ name, email, profilePictureUrl });
    if (result.error) {
      return res.redirect(loginUrl + "?error=" + encodeURIComponent(result.error));
    }
    // Redirect to frontend with token (works across origins; frontend will store and use in header)
    res.redirect(`${frontendBase}/auth/callback?token=${encodeURIComponent(result.token)}`);
  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect(loginUrl + "?error=Server+error");
  }
}
