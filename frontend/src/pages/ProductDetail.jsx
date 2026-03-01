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

    if (loading) return (
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-textMuted animate-spin animation-delay-200"></div>
            </div>
        </div>
    );
    
    if (!product) return (
        <div className="flex justify-center items-center min-h-[calc(100vh-5rem)]">
            <div className="text-textMuted text-lg font-light">Product not found.</div>
        </div>
    );

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 animate-fade-in isolate">
            {/* Ambient Background Glow strictly behind the image */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            {/* Back Navigation with micro-interaction */}
            <Link to="/products" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-white mb-12 lg:mb-20 transition-all duration-300">
                <div className="p-2 rounded-full border border-neutral-800 group-hover:border-neutral-400 group-hover:-translate-x-1 transition-all">
                    <ArrowLeft size={16} /> 
                </div>
                Back to Collection
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                
                {/* Product Image Stage */}
                <div className="w-full lg:w-[55%] animate-fade-in-up">
                    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-neutral-950 border border-neutral-800 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
                        {/* Subtle inner shadow for depth */}
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] z-10 pointer-events-none"></div>
                        <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out" 
                        />
                    </div>
                </div>

                {/* Product Details Specs */}
                <div className="w-full lg:w-[45%] flex flex-col pt-4 animate-fade-in-up delay-100">
                    <div className="space-y-2 mb-8">
                        <span className="inline-block px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                            {product.category}
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tighter leading-[0.95]">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6 mb-10">
                        <p className="text-4xl font-heading font-light text-white tracking-tight">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="h-8 w-px bg-neutral-800"></div>
                        {/* Stock Status Badge */}
                        <div className="flex items-center gap-2.5 py-2 px-4 rounded-full bg-neutral-950 border border-neutral-800 text-[10px] font-bold uppercase tracking-widest">
                            {product.stockQuantity === 0 ? (
                                <><div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div> <span className="text-red-500">Unavailable</span></>
                            ) : product.stockQuantity <= 5 ? (
                                <><div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div> <span className="text-yellow-500">Low stock</span></>
                            ) : (
                                <><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div> <span className="text-neutral-400">In Stock</span></>
                            )}
                        </div>
                    </div>
                    
                    <div className="h-px w-full bg-gradient-to-r from-neutral-800 to-transparent mb-10"></div>
                    
                    <p className="text-lg text-neutral-400 leading-relaxed font-light mb-12 max-w-xl">
                        {product.description}
                    </p>
                    
                    {/* Architectural Action Section */}
                    <div className="space-y-6">
                        <button 
                            onClick={() => { addToCart(product); alert('Added to cart!'); }}
                            disabled={product.stockQuantity === 0}
                            className="group relative w-full overflow-hidden bg-white text-black py-6 rounded-[1.5rem] font-bold text-lg tracking-wide transition-all duration-500 hover:scale-[1.02] disabled:opacity-30 disabled:hover:scale-100 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
                        >
                            {/* Inner slide-fill effect */}
                            <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-0"></div>
                            
                            <div className="relative z-10 flex justify-center items-center gap-3">
                                <ShoppingCart size={22} strokeWidth={2.5} />
                                <span className="uppercase tracking-widest">{product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                            </div>
                        </button>
                        
                        <div className="flex justify-between items-center text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] px-2">
                            <span>Secure Checkout via Stripe</span>
                            <span>Global Shipping Available</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;