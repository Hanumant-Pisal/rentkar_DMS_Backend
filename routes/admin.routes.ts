import { Router } from "express";
import { getAdminStats, deletePartner, getAllPartners } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();


router.use(authMiddleware);
router.use(roleMiddleware("admin"));


router.get("/partners", getAllPartners);
router.get("/stats", getAdminStats);
router.delete("/partners/:id", deletePartner);

export default router;
