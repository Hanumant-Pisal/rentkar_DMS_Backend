import { Router } from "express";
import authRoutes from "./auth.routes";
import partnerRoutes from "./partner.routes";
import orderRoutes from "./order.routes";
import adminRoutes from "./admin.routes";

const router = Router();


router.use("/auth", authRoutes);
router.use("/partners", partnerRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);

export default router;
