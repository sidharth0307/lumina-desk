import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Filter, SlidersHorizontal, PackageX, ChevronDown } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filter, Sort, & Pagination State
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500); // Only updates 500ms after user stops typing
    
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Building the query string for backend DB-level filtering
                const { data } = await api.get(`/products?search=${debouncedSearch}&category=${category}&sort=${sort}&page=${page}&limit=8`);
                
                setProducts(data.products);
                setTotalPages(data.pages);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch, category, sort, page]); // Re-run effect when these change

    // Reset page to 1 if search or filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, category, sort]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-fade-in relative">
            
            {/* Background Ambient Glow for the whole page */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            {/* Header Section */}
            <div className="mb-12 lg:mb-20 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/50 backdrop-blur-md mb-6">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Hardware Catalog</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter leading-[0.9]">
                    The Collection
                </h1>
                <p className="text-neutral-400 mt-6 font-light text-lg max-w-xl leading-relaxed">
                    Meticulously engineered desk accessories designed for the modern architect of digital spaces.
                </p>
            </div>

            {/* Control Deck (Responsive Fix: Grid for Mobile, Flex for Desktop) */}
            <div className="relative group/deck mb-16 lg:mb-24 animate-fade-in-up delay-100 z-20">
                <div className="absolute inset-0 bg-white/5 rounded-[2rem] md:rounded-full blur-xl group-hover/deck:bg-white/10 transition-colors duration-700 pointer-events-none"></div>
                
                <div className="relative flex flex-col lg:flex-row gap-4 p-4 lg:p-3 bg-neutral-950/80 backdrop-blur-2xl border border-neutral-800/80 rounded-[2rem] lg:rounded-full shadow-2xl">
                    
                    {/* Search Zone */}
                    <div className="relative w-full lg:flex-[1.5] group">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors duration-300" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search the collection..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 hover:bg-neutral-900 border border-transparent hover:border-neutral-700 text-white rounded-full py-4 pl-14 pr-6 focus:outline-none focus:bg-black focus:border-white focus:ring-4 focus:ring-white/10 transition-all duration-300 placeholder:text-neutral-600"
                        />
                    </div>

                    {/* Hardware Divider (Desktop Only) */}
                    <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-neutral-700 to-transparent self-center mx-2"></div>

                    {/* Filter Zone: Responsive Sm: Row, Mobile: Col */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        
                        {/* Category Dropdown */}
                        <div className="relative flex-1 sm:w-[220px] group">
                            <Filter className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors duration-300" size={18} />
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-black/50 hover:bg-neutral-900 border border-transparent hover:border-neutral-700 text-white rounded-full py-4 pl-14 pr-10 appearance-none focus:outline-none focus:bg-black focus:border-white focus:ring-4 focus:ring-white/10 cursor-pointer transition-all duration-300"
                            >
                                <option value="">All Categories</option>
                                <option value="Desk Mats">Desk Mats</option>
                                <option value="Stands">Stands</option>
                                <option value="Lighting">Lighting</option>
                                <option value="Keyboards">Keyboards</option>
                            </select>
                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative flex-1 sm:w-[220px] group">
                            <SlidersHorizontal className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors duration-300" size={18} />
                            <select 
                                value={sort} 
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full bg-black/50 hover:bg-neutral-900 border border-transparent hover:border-neutral-700 text-white rounded-full py-4 pl-14 pr-10 appearance-none focus:outline-none focus:bg-black focus:border-white focus:ring-4 focus:ring-white/10 cursor-pointer transition-all duration-300"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                            </select>
                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-600 group-hover:text-neutral-400 transition-colors">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Product Grid & States */}
            <div className="min-h-[400px]">
                {loading ? (
                    <div className="flex justify-center items-center h-64 animate-fade-in">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-t-2 border-white/50 animate-spin"></div>
                            <div className="absolute inset-2 rounded-full border-r-2 border-neutral-800 animate-spin animation-delay-200"></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-neutral-400 text-center py-16 bg-neutral-900/40 border border-neutral-800 rounded-[2.5rem] animate-fade-in-up">
                        <p className="text-xl font-medium text-white mb-2">Technical Error</p>
                        <p className="font-light opacity-60">{error}</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-32 bg-neutral-950 rounded-[2.5rem] border border-neutral-900 border-dashed animate-fade-in-up">
                        <div className="bg-neutral-900 p-6 rounded-full mb-6">
                            <PackageX size={48} className="text-neutral-600" />
                        </div>
                        <h3 className="text-2xl font-heading font-medium text-white mb-3">No matches found</h3>
                        <p className="text-neutral-500 max-w-sm font-light leading-relaxed">Try adjusting your filters or search terms. We couldn't find any products matching your current criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8 xl:gap-y-14">
                        {products.map((product, index) => (
                            <div key={product._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-24 gap-4 animate-fade-in-up delay-200">
                    {[...Array(totalPages).keys()].map(x => (
                        <button
                            key={x + 1}
                            onClick={() => {
                                setPage(x + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-14 h-14 rounded-full font-bold transition-all duration-500 flex items-center justify-center text-sm tracking-tighter border ${
                                page === x + 1 
                                ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)]' 
                                : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-400 hover:text-white hover:bg-neutral-900'
                            }`}
                        >
                            {String(x + 1).padStart(2, '0')}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;