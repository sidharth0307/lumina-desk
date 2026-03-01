import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        addToCart(product);
        alert(`${product.title} added to cart!`); 
    };

       return (
        <div className="group relative flex flex-col bg-neutral-950 rounded-[2rem] overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] animate-fade-in-up isolate">
            
            <Link to={`/product/${product._id}`} className="block flex-1 relative">
                {/* Image Container with Cinematic Overlay */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    {/* Dark gradient overlay that fades on hover to 'reveal' the product */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700 z-10"></div>
                    
                    <img 
                        src={product.imageUrl || 'https://via.placeholder.com/400x400?text=Lumina+Desk'} 
                        alt={product.title} 
                        className="object-cover w-full h-full scale-100 group-hover:scale-110 grayscale-[15%] group-hover:grayscale-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Hardware Status Badges */}
                    <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
                        {product.stockQuantity === 0 ? (
                            <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full shadow-xl">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                Sold Out
                            </div>
                        ) : product.stockQuantity <= 5 ? (
                            <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full shadow-xl">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span>
                                Only {product.stockQuantity} Left
                            </div>
                        ) : null}
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between relative z-20 bg-gradient-to-t from-neutral-950 via-neutral-950 to-transparent -mt-10">
                    <div>
                        <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                            {product.category}
                        </p>
                        <h3 className="text-white font-heading font-bold text-xl leading-snug line-clamp-2 mb-4 group-hover:text-neutral-300 transition-colors duration-300">
                            {product.title}
                        </h3>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <p className="text-white font-heading font-light text-2xl tracking-tight">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>
                </div>
            </Link>
            
            {/* Brutalist "Slide-Fill" Button */}
            <div className="p-6 lg:p-8 pt-0 mt-auto relative z-20">
                <button 
                    onClick={handleAddToCart}
                    disabled={product.stockQuantity === 0}
                    className="group/btn relative w-full overflow-hidden bg-transparent border border-neutral-700 text-white py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-500 hover:border-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-700 flex items-center justify-center gap-3"
                >
                    {/* Metallic Fill that slides up on hover */}
                    <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10"></div>
                    
                    {/* Text and Icon (Switches to black when background fills) */}
                    <div className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-black transition-colors duration-300 delay-100">
                        <ShoppingCart size={18} className={product.stockQuantity === 0 ? "opacity-50" : ""} />
                        <span>{product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                    </div>
                </button>
            </div>
            
        </div>
    );
};

export default ProductCard;