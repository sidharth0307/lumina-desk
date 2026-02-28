import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-surface rounded-sm overflow-hidden border border-surface hover:border-primary transition-colors duration-300 group">
            <Link to={`/product/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
                    {/* Fallback to a placeholder if no image exists yet */}
                    <img 
                        src={product.imageUrl || 'https://via.placeholder.com/400x400?text=Lumina+Desk'} 
                        alt={product.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    {product.stockQuantity === 0 && (
                        <div className="absolute top-2 right-2 bg-red-900/80 text-white text-xs px-2 py-1 rounded-sm border border-red-500 backdrop-blur-sm">
                            Sold Out
                        </div>
                    )}
                </div>
                <div className="p-5">
                    <p className="text-textMuted text-xs uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-textMain font-serif font-semibold text-lg truncate">{product.title}</h3>
                    <p className="text-primary mt-2">${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;