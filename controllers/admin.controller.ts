import { Response } from 'express';
import Order from '../models/order.model';
import User from '../models/user.model';
import { AuthRequest } from '../types/express';


const formatStatus = (status: string): string => {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

interface AggregationResult {
  _id: null;
  total: number;
}

export const getAllPartners = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    
    const query: any = { role: 'partner' };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [partners, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      User.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      partners,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch partners' });
  }
};

export const deletePartner = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    
    const partner = await User.findById(id);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

   
    if (partner.role !== 'partner') {
      return res.status(400).json({ error: 'User is not a partner' });
    }

    
    await Order.deleteMany({ partner: id });
    
  
    await User.findByIdAndDelete(id);

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({ error: 'Failed to delete partner' });
  }
};

export const getAdminStats = async (req: AuthRequest, res: Response) => {
  try {
    
    const [
      totalOrders,
      activePartners,
      pendingRequests,
      pendingOrders,
      totalRevenueResult,
      totalPartners,
      lastMonthOrders,
      lastMonthPartners,
      lastMonthTotalPartners,
      lastMonthRequests,
      lastMonthPendingOrders,
      lastMonthRevenue
    ] = await Promise.all([
      
      Order.countDocuments(),
      User.countDocuments({ role: 'partner', isAvailable: true }),
      User.countDocuments({ role: 'partner', isVerified: false }),
      Order.countDocuments({ status: { $in: ['pending', 'accepted', 'picked_up'] } }),
      Order.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]),
    
      User.countDocuments({ role: 'partner' }),
      
      
      Order.countDocuments({
        createdAt: { 
          $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
          $lt: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }),
      User.countDocuments({ 
        role: 'partner', 
        isAvailable: true,
        updatedAt: { 
          $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
          $lt: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }),
     
      User.countDocuments({ 
        role: 'partner',
        createdAt: { 
          $lt: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }),
     
      Order.countDocuments({ 
        status: { $in: ['pending', 'accepted', 'picked_up'] },
        createdAt: { 
          $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
          $lt: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }),
      User.countDocuments({ 
        role: 'partner', 
        isVerified: false,
        createdAt: { 
          $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
          $lt: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }),
      Order.aggregate([
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

    
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current === 0 ? 0 : 100;
      return Math.round(((current - previous) / previous) * 100);
    };

    
    const currentRevenue = (totalRevenueResult as unknown as AggregationResult[])[0]?.total ?? 0;
    const previousRevenue = (lastMonthRevenue as unknown as AggregationResult[])[0]?.total ?? 0;

    
    const monthlyOrders = await Order.aggregate([
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

   
    const orderStatus = await Order.aggregate([
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
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};
