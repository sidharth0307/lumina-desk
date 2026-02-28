import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) return <div className="p-8 text-center mt-20 text-textMuted">Loading Dashboard...</div>;
    if (error) return <div className="p-8 text-center mt-20 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-textMain">Admin Dashboard</h1>
                
                {/* Revenue Card */}
                <div className="bg-surface border border-surface/50 p-4 rounded-sm flex items-center gap-3">
                    <div className="bg-green-900/30 p-2 rounded-sm text-green-500">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-textMuted uppercase tracking-wider">Total Revenue</p>
                        <p className="text-2xl font-bold text-textMain">${revenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Product Form (Left Side) */}
                <div className="lg:col-span-1 bg-surface p-6 rounded-sm border border-surface/50 h-fit sticky top-24">
                    <h2 className="text-xl font-serif font-bold text-textMain mb-6 flex items-center gap-2">
                        {isEditing ? <Edit size={20} className="text-primary"/> : <Plus size={20} className="text-primary"/>}
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-textMuted mb-1">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-background border border-surface text-textMain rounded-sm px-3 py-2 text-sm focus:border-primary" />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-textMuted mb-1">Category</label>
                            <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-background border border-surface text-textMain rounded-sm px-3 py-2 text-sm focus:border-primary">
                                <option value="Desk Mats">Desk Mats</option>
                                <option value="Stands">Stands</option>
                                <option value="Lighting">Lighting</option>
                                <option value="Keyboards">Keyboards</option>
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-xs font-medium text-textMuted mb-1">Price ($)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full bg-background border border-surface text-textMain rounded-sm px-3 py-2 text-sm focus:border-primary" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-xs font-medium text-textMuted mb-1">Stock Qty</label>
                                <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} required min="0" className="w-full bg-background border border-surface text-textMain rounded-sm px-3 py-2 text-sm focus:border-primary" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-textMuted mb-1">Image URL (e.g., Unsplash)</label>
                            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required className="w-full bg-background border border-surface text-textMain rounded-sm px-3 py-2 text-sm focus:border-primary" placeholder="https://..." />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-textMuted mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-background border border-surface text-textMain rounded-sm px-3 py-2 text-sm focus:border-primary"></textarea>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button type="submit" className="flex-1 bg-primary text-background py-2 rounded-sm text-sm font-medium hover:bg-yellow-500 transition-colors">
                                {isEditing ? 'Update Product' : 'Add Product'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={cancelEdit} className="flex-1 bg-surface border border-surface text-textMain py-2 rounded-sm text-sm font-medium hover:bg-surface/80 transition-colors">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Product List (Right Side) */}
                <div className="lg:col-span-2">
                    <div className="bg-surface rounded-sm border border-surface/50 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-surface/50 bg-background/50">
                                    <th className="p-4 text-xs font-medium text-textMuted uppercase tracking-wider">Product</th>
                                    <th className="p-4 text-xs font-medium text-textMuted uppercase tracking-wider">Price</th>
                                    <th className="p-4 text-xs font-medium text-textMuted uppercase tracking-wider">Stock</th>
                                    <th className="p-4 text-xs font-medium text-textMuted uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-textMuted text-sm">No products found. Add one to get started.</td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product._id} className="border-b border-surface/50 hover:bg-background/20 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={product.imageUrl} alt={product.title} className="w-10 h-10 object-cover rounded-sm bg-[#1A1A1A]"/>
                                                    <div>
                                                        <p className="text-sm font-medium text-textMain">{product.title}</p>
                                                        <p className="text-xs text-textMuted">{product.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-textMain">${product.price.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`text-xs px-2 py-1 rounded-sm ${product.stockQuantity > 5 ? 'bg-green-900/30 text-green-500' : product.stockQuantity > 0 ? 'bg-yellow-900/30 text-yellow-500' : 'bg-red-900/30 text-red-500'}`}>
                                                    {product.stockQuantity} in stock
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEditClick(product)} className="p-2 hover:bg-background rounded-sm text-textMuted hover:text-primary transition-colors">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-background rounded-sm text-textMuted hover:text-red-500 transition-colors">
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