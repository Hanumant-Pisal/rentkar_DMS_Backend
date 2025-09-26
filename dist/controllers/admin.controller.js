"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStats = exports.deletePartner = exports.getAllPartners = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const formatStatus = (status) => {
    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
const getAllPartners = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const query = { role: 'partner' };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { vehicleNumber: { $regex: search, $options: 'i' } }
            ];
        }
        const [partners, total] = await Promise.all([
            user_model_1.default.find(query)
                .select('-password')
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            user_model_1.default.countDocuments(query)
        ]);
        res.json({
            success: true,
            partners,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page)
        });
    }
    catch (error) {
        console.error('Error fetching partners:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch partners' });
    }
};
exports.getAllPartners = getAllPartners;
const deletePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await user_model_1.default.findById(id);
        if (!partner) {
            return res.status(404).json({ error: 'Partner not found' });
        }
        if (partner.role !== 'partner') {
            return res.status(400).json({ error: 'User is not a partner' });
        }
        await order_model_1.default.deleteMany({ partner: id });
        await user_model_1.default.findByIdAndDelete(id);
        res.json({ message: 'Partner and associated data deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting partner:', error);
        res.status(500).json({ error: 'Failed to delete partner' });
    }
};
exports.deletePartner = deletePartner;
const getAdminStats = async (req, res) => {
    try {
        const [totalOrders, activePartners, pendingRequests, pendingOrders, totalRevenueResult, totalPartners, lastMonthOrders, lastMonthPartners, lastMonthTotalPartners, lastMonthRequests, lastMonthPendingOrders, lastMonthRevenue] = await Promise.all([
            order_model_1.default.countDocuments(),
            user_model_1.default.countDocuments({ role: 'partner', isAvailable: true }),
            user_model_1.default.countDocuments({ role: 'partner', isVerified: false }),
            order_model_1.default.countDocuments({ status: { $in: ['pending', 'accepted', 'picked_up'] } }),
            order_model_1.default.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$totalAmount' }
                    }
                }
            ]),
            user_model_1.default.countDocuments({ role: 'partner' }),
            order_model_1.default.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
                    $lt: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }),
            user_model_1.default.countDocuments({
                role: 'partner',
                isAvailable: true,
                updatedAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
                    $lt: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }),
            user_model_1.default.countDocuments({
                role: 'partner',
                createdAt: {
                    $lt: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }),
            order_model_1.default.countDocuments({
                status: { $in: ['pending', 'accepted', 'picked_up'] },
                createdAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
                    $lt: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }),
            user_model_1.default.countDocuments({
                role: 'partner',
                isVerified: false,
                createdAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
                    $lt: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }),
            order_model_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
                            $lt: new Date(new Date().setDate(new Date().getDate() - 30))
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$totalAmount' }
                    }
                }
            ])
        ]);
        const calculateChange = (current, previous) => {
            if (previous === 0)
                return current === 0 ? 0 : 100;
            return Math.round(((current - previous) / previous) * 100);
        };
        const currentRevenue = totalRevenueResult[0]?.total ?? 0;
        const previousRevenue = lastMonthRevenue[0]?.total ?? 0;
        const monthlyOrders = await order_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%b', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { '_id': 1 } }
        ]);
        const orderStatus = await order_model_1.default.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        const stats = {
            totalOrders,
            activePartners,
            pendingRequests,
            pendingOrders,
            totalRevenue: currentRevenue,
            totalPartners,
            statsChange: {
                ordersChange: calculateChange(totalOrders, lastMonthOrders),
                partnersChange: calculateChange(activePartners, lastMonthPartners),
                totalPartnersChange: calculateChange(totalPartners, lastMonthTotalPartners),
                requestsChange: calculateChange(pendingRequests, lastMonthRequests),
                pendingOrdersChange: calculateChange(pendingOrders, lastMonthPendingOrders),
                revenueChange: calculateChange(currentRevenue, previousRevenue)
            },
            monthlyOrders: monthlyOrders.map(item => ({
                month: item._id,
                orders: item.orders,
                revenue: item.revenue
            })),
            orderStatus: orderStatus.map(item => ({
                status: formatStatus(item._id),
                count: item.count
            }))
        };
        res.json(stats);
    }
    catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
};
exports.getAdminStats = getAdminStats;
//# sourceMappingURL=admin.controller.js.map