import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Calendar, Package, Receipt, ShoppingBag } from 'lucide-react';

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

   if (loading) return (
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-textMuted animate-spin animation-delay-200"></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-fade-in">
            <div className="mb-12 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-textMain tracking-tight">
                    Order History
                </h1>
                <p className="text-textMuted mt-3 font-light text-lg">
                    Review your past purchases and track your desk setup journey.
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up delay-100">
                    <div className="bg-surface/30 p-8 rounded-full mb-8 border border-border-subtle border-dashed">
                        <Package size={48} className="text-textMuted opacity-50" />
                    </div>
                    <h2 className="text-2xl font-heading font-medium text-textMain mb-4">No orders found</h2>
                    <p className="text-textMuted mb-10 font-light text-center max-w-sm">
                        You haven't placed any orders yet. Start building your perfect workspace.
                    </p>
                    <Link 
                        to="/products" 
                        className="group inline-flex items-center gap-3 bg-primary text-background px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-textMain hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                        Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, index) => (
                        <div 
                            key={order._id} 
                            className="bg-surface/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-xl shadow-black/20 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Order Header / Meta info */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border-subtle pb-6 mb-6 gap-6">
                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-textMuted/10 p-2 rounded-full text-textMuted">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-textMuted uppercase tracking-widest font-medium mb-1">Date Placed</p>
                                            <p className="text-sm font-medium text-textMain">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-textMuted/10 p-2 rounded-full text-textMuted">
                                            <Receipt size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-textMuted uppercase tracking-widest font-medium mb-1">Order Number</p>
                                            <p className="text-sm font-medium text-textMain font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:text-right bg-background border border-border-subtle px-5 py-3 rounded-2xl">
                                    <p className="text-[10px] text-textMuted uppercase tracking-widest font-medium mb-1">Total Amount</p>
                                    <p className="text-xl font-heading font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Order Line Items */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-medium text-textMuted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <ShoppingBag size={14} /> Items in this order
                                </h3>
                                {order.products.map(item => (
                                    <div key={item._id} className="flex items-center gap-5 p-3 hover:bg-surface/50 rounded-2xl transition-colors">
                                        <div className="relative">
                                            <img 
                                                src={item.product?.imageUrl || 'https://via.placeholder.com/150'} 
                                                alt={item.product?.title || 'Product Unavailable'} 
                                                className="w-16 h-16 object-cover rounded-xl bg-background border border-border-subtle"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-textMain text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base font-heading font-medium text-textMain">
                                                {item.product?.title || 'Product Unavailable'}
                                            </p>
                                        </div>
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