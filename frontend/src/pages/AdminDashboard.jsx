import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit, Trash2, DollarSign, Package } from 'lucide-react';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalSales, setTotalSales] = useState(0);

    // Form State for Adding/Editing Products
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Desk Mats', // Default category
        stockQuantity: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            // Fetch products (we can fetch more for admin view if needed, but reusing the public endpoint is fine for now)
            const productRes = await api.get('/products?limit=50'); 
            setProducts(productRes.data.products);

            // Fetch total revenue from orders API
            const orderRes = await api.get('/orders');
            setRevenue(orderRes.data.totalRevenue);
            setTotalSales(orderRes.data.orders.length);
            
            setLoading(false);
        } catch (err) {
            setError('Failed to load dashboard data');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/products/${currentProductId}`, formData);
            } else {
                await api.post('/products', formData);
            }
            
            // Reset form and refresh data
            setFormData({ title: '', description: '', price: '', category: 'Desk Mats', stockQuantity: '', imageUrl: '' });
            setIsEditing(false);
            setCurrentProductId(null);
            fetchAdminData();
        } catch (err) {
            alert('Failed to save product. Ensure all fields are valid.');
        }
    };

    const handleEditClick = (product) => {
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stockQuantity: product.stockQuantity,
            imageUrl: product.imageUrl
        });
        setCurrentProductId(product._id);
        setIsEditing(true);
        // Scroll to top where form is
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchAdminData(); // Refresh list
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    const cancelEdit = () => {
        setFormData({ title: '', description: '', price: '', category: 'Desk Mats', stockQuantity: '', imageUrl: '' });
        setIsEditing(false);
        setCurrentProductId(null);
    };

   if (loading) return (
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-textMuted animate-spin animation-delay-200"></div>
            </div>
        </div>
    );
    if (error) return <div className="p-8 text-center mt-20 text-red-400 bg-red-950/20 border border-red-900/50 rounded-2xl max-w-2xl mx-auto animate-fade-in">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 animate-fade-in">
            
            {/* Header & Stat Cards */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 animate-fade-in-up">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-textMain tracking-tight">Admin Dashboard</h1>
                    <p className="text-textMuted mt-2 font-light">Manage your products and monitor store performance.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Total Sales Card */}
                    <div className="bg-surface/40 backdrop-blur-md border border-border-subtle p-5 rounded-3xl flex items-center gap-5 shadow-xl shadow-black/20 w-full sm:w-auto">
                        <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-400 border border-blue-500/20">
                            <Package size={28} />
                        </div>
                        <div>
                            <p className="text-xs text-textMuted uppercase tracking-widest font-medium mb-1">Total Sales</p>
                            <p className="text-3xl font-heading font-bold text-textMain">{totalSales}</p>
                        </div>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-surface/40 backdrop-blur-md border border-border-subtle p-5 rounded-3xl flex items-center gap-5 shadow-xl shadow-black/20 w-full sm:w-auto">
                        <div className="bg-green-500/10 p-3 rounded-2xl text-green-400 border border-green-500/20">
                            <DollarSign size={28} />
                        </div>
                        <div>
                            <p className="text-xs text-textMuted uppercase tracking-widest font-medium mb-1">Total Revenue</p>
                            <p className="text-3xl font-heading font-bold text-textMain">${revenue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                
                {/* Product Form (Left Side) */}
                <div className="lg:col-span-1 animate-fade-in-up delay-100">
                    <div className="bg-surface/40 backdrop-blur-md p-8 rounded-3xl border border-border-subtle shadow-xl shadow-black/20 sticky top-28">
                        <h2 className="text-2xl font-heading font-medium text-textMain mb-6 flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                            </div>
                            {isEditing ? 'Edit Product' : 'Add Product'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-medium text-textMuted mb-2 uppercase tracking-wider pl-1">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-background border border-border-subtle text-textMain rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-medium text-textMuted mb-2 uppercase tracking-wider pl-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-background border border-border-subtle text-textMain rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all duration-300">
                                    <option value="Desk Mats">Desk Mats</option>
                                    <option value="Stands">Stands</option>
                                    <option value="Lighting">Lighting</option>
                                    <option value="Keyboards">Keyboards</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block text-xs font-medium text-textMuted mb-2 uppercase tracking-wider pl-1">Price ($)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full bg-background border border-border-subtle text-textMain rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-xs font-medium text-textMuted mb-2 uppercase tracking-wider pl-1">Stock Qty</label>
                                    <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} required min="0" className="w-full bg-background border border-border-subtle text-textMain rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-textMuted mb-2 uppercase tracking-wider pl-1">Image URL</label>
                                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required placeholder="https://..." className="w-full bg-background border border-border-subtle text-textMain rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-textMuted mb-2 uppercase tracking-wider pl-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-background border border-border-subtle text-textMain rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"></textarea>
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button type="submit" className="flex-1 bg-primary text-background py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-textMain hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                    {isEditing ? 'Save Changes' : 'Create Product'}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={cancelEdit} className="flex-1 bg-transparent border border-border-subtle text-textMain py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:bg-surface hover:border-textMuted">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Product List (Right Side) */}
                <div className="lg:col-span-2 animate-fade-in-up delay-200">
                    <div className="bg-surface/30 border border-border-subtle rounded-3xl overflow-hidden shadow-xl shadow-black/20">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-subtle bg-background/50">
                                    <th className="p-5 text-xs font-medium text-textMuted uppercase tracking-[0.2em]">Product</th>
                                    <th className="p-5 text-xs font-medium text-textMuted uppercase tracking-[0.2em]">Price</th>
                                    <th className="p-5 text-xs font-medium text-textMuted uppercase tracking-[0.2em]">Status</th>
                                    <th className="p-5 text-xs font-medium text-textMuted uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-12 text-center text-textMuted text-sm font-light">
                                            No products found. Add your first product to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product._id} className="hover:bg-surface/50 transition-colors duration-300 group">
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <img src={product.imageUrl} alt={product.title} className="w-12 h-12 object-cover rounded-xl bg-background border border-border-subtle"/>
                                                    <div>
                                                        <p className="text-sm font-heading font-medium text-textMain group-hover:text-primary transition-colors">{product.title}</p>
                                                        <p className="text-xs text-textMuted mt-1">{product.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 text-sm font-medium text-textMain">
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td className="p-5">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md ${
                                                    product.stockQuantity > 5 
                                                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                                        : product.stockQuantity > 0 
                                                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' 
                                                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                    {product.stockQuantity} in stock
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEditClick(product)} className="p-2.5 bg-background border border-border-subtle rounded-full text-textMuted hover:text-primary hover:border-primary transition-all duration-300">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(product._id)} className="p-2.5 bg-background border border-border-subtle rounded-full text-textMuted hover:text-red-400 hover:border-red-400 hover:bg-red-950/20 transition-all duration-300">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;