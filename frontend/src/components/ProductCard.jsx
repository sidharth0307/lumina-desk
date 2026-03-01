import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to the product page
        addToCart(product);
        alert(`${product.title} added to cart!`); // Simple feedback, can be replaced with a toast later
    };

    return (
        <div className="bg-surface rounded-sm overflow-hidden border border-surface hover:border-primary transition-colors duration-300 group flex flex-col">
            <Link to={`/product/${product._id}`} className="block flex-1">
                <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
                    <img 
                        src={product.imageUrl || 'https://via.placeholder.com/400x400?text=Lumina+Desk'} 
                        alt={product.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    {product.stockQuantity === 0 ? (
                        <div className="absolute top-2 right-2 bg-red-900/80 text-white text-xs px-2 py-1 rounded-sm border border-red-500 backdrop-blur-sm">
                            Sold Out
                        </div>
                    ) : product.stockQuantity <= 5 ? (
                        <div className="absolute top-2 right-2 bg-yellow-900/80 text-yellow-200 text-xs px-2 py-1 rounded-sm border border-yellow-500 backdrop-blur-sm">
                            Only {product.stockQuantity} Left
                        </div>
                    ) : null}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <p className="text-textMuted text-xs uppercase tracking-widest mb-1">{product.category}</p>
                        <h3 className="text-textMain font-serif font-semibold text-lg line-clamp-2 mb-2">{product.title}</h3>
                    </div>
                    <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
                </div>
            </Link>
            
            {/* Add to Cart Button */}
            <div className="p-5 pt-0">
                <button 
                    onClick={handleAddToCart}
                    disabled={product.stockQuantity === 0}
                    className="w-full bg-background border border-surface text-textMain py-2 rounded-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-surface disabled:hover:text-textMain"
                >
                    <ShoppingCart size={16} />
                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;