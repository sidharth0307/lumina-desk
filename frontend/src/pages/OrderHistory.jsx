import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Package } from 'lucide-react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="p-8 text-center mt-20">Loading orders...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold text-textMain mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center py-12 bg-surface rounded-sm border border-surface/50">
                    <Package size={48} className="mx-auto text-textMuted mb-4" />
                    <p className="text-textMuted">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-surface p-6 rounded-sm border border-surface/50">
                            <div className="flex justify-between items-center border-b border-surface/50 pb-4 mb-4">
                                <div>
                                    <p className="text-xs text-textMuted uppercase">Order Placed</p>
                                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-textMuted uppercase">Total</p>
                                    <p className="text-sm font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {order.products.map(item => (
                                    <div key={item._id} className="flex items-center gap-4">
                                        <div className="flex-1 text-sm">{item.quantity}x {item.product?.title || 'Product Unavailable'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default OrderHistory;