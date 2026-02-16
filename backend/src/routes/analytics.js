import { Router } from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import { requireSuperAdmin } from "../middlewares/requireSuperAdmin.js";

const router = Router();

router.post("/events", analyticsController.events);

router.get("/sessions", requireSuperAdmin, analyticsController.listSessions);
router.get("/session/:sessionId", requireSuperAdmin, analyticsController.getSession);
router.get("/stats", requireSuperAdmin, analyticsController.getStats);
router.get("/users", requireSuperAdmin, analyticsController.listUsers);
router.get("/user/:userId", requireSuperAdmin, analyticsController.getUserActivity);

export default router;
