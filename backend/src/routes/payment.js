import { Router } from "express";
import * as paymentController from "../controllers/paymentController.js";

const router = Router();

router.post("/create-checkout-session", paymentController.createCheckoutSession);
router.post("/confirm-success", paymentController.confirmSuccess);

export default router;
