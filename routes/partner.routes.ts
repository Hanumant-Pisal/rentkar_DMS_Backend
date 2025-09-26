import { Router } from "express";
import {
  getMyOrders,
  updateOrderStatus,
  updateAvailability,
  updateLocation
} from "../controllers/partner.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();


router.use(authMiddleware);
router.use(roleMiddleware("partner"));

router.get("/orders", getMyOrders);
router.patch("/orders/:id/status", updateOrderStatus);
router.patch("/availability", updateAvailability);
router.patch("/location", updateLocation);

export default router;
