import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-8 text-center mt-20">Loading...</div>;
    if (!product) return <div className="p-8 text-center mt-20">Product not found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/products" className="inline-flex items-center gap-2 text-textMuted hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={20} /> Back to Collection
            </Link>
            
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                    <img src={product.imageUrl} alt={product.title} className="w-full rounded-sm object-cover aspect-square bg-surface" />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                    <p className="text-sm text-textMuted uppercase tracking-widest mb-2">{product.category}</p>
                    <h1 className="text-4xl font-serif font-bold text-textMain mb-4">{product.title}</h1>
                    <p className="text-2xl text-primary mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-textMuted leading-relaxed mb-8">{product.description}</p>
                    
                    <button 
                        onClick={() => { addToCart(product); alert('Added to cart!'); }}
                        disabled={product.stockQuantity === 0}
                        className="bg-primary text-background py-4 rounded-sm font-bold hover:bg-yellow-500 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        <ShoppingCart size={20} />
                        {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <p className="mt-4 text-sm text-textMuted">
                        {product.stockQuantity > 0 ? `${product.stockQuantity} items available in stock` : 'Currently unavailable'}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;