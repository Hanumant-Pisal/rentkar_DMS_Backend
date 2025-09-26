import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  assignOrder,
  // unassignOrder
} from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();


router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/:id/assign", assignOrder);
// router.post("/:id/unassign", unassignOrder);

export default router;
