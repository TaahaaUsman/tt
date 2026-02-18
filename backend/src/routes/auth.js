import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/getUser", authController.getUser);
router.post("/verify-email", authController.verifyEmail);
router.post("/register-with-google", authController.registerWithGoogle);
router.get("/google", authController.googleRedirect);
router.get("/google/callback", authController.googleCallback);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/resend-code", authController.resendCode);

export default router;
