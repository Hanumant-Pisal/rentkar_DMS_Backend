"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.use((0, role_middleware_1.roleMiddleware)("admin"));
router.post("/", order_controller_1.createOrder);
router.get("/", order_controller_1.getOrders);
router.get("/:id", order_controller_1.getOrder);
router.put("/:id", order_controller_1.updateOrder);
router.delete("/:id", order_controller_1.deleteOrder);
router.post("/:id/assign", order_controller_1.assignOrder);
// router.post("/:id/unassign", unassignOrder);
exports.default = router;
//# sourceMappingURL=order.routes.js.map