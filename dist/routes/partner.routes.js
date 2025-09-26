"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partner_controller_1 = require("../controllers/partner.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.use((0, role_middleware_1.roleMiddleware)("partner"));
router.get("/orders", partner_controller_1.getMyOrders);
router.patch("/orders/:id/status", partner_controller_1.updateOrderStatus);
router.patch("/availability", partner_controller_1.updateAvailability);
router.patch("/location", partner_controller_1.updateLocation);
exports.default = router;
//# sourceMappingURL=partner.routes.js.map