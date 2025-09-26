"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.use((0, role_middleware_1.roleMiddleware)("admin"));
router.get("/partners", admin_controller_1.getAllPartners);
router.get("/stats", admin_controller_1.getAdminStats);
router.delete("/partners/:id", admin_controller_1.deletePartner);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map