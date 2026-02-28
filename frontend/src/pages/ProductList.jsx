import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Filter } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-textMain mb-8">The Collection</h1>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-surface p-4 rounded-sm border border-surface/50">
                {/* Search */}
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search collection..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-surface text-textMain rounded-sm py-2 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    {/* Category Filter */}
                    <div className="relative w-1/2 md:w-auto">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textMuted" size={18} />
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-background border border-surface text-textMain rounded-sm py-2 pl-10 pr-8 appearance-none focus:outline-none focus:border-primary cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            <option value="Desk Mats">Desk Mats</option>
                            <option value="Stands">Stands</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Keyboards">Keyboards</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <select 
                        value={sort} 
                        onChange={(e) => setSort(e.target.value)}
                        className="w-1/2 md:w-auto bg-background border border-surface text-textMain rounded-sm py-2 px-4 focus:outline-none focus:border-primary cursor-pointer"
                    >
                        <option value="newest">Newest First</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-10 bg-surface border border-red-900 rounded-sm">{error}</div>
            ) : products.length === 0 ? (
                <div className="text-textMuted text-center py-20 bg-surface rounded-sm border border-surface/50">No products found matching your criteria.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    {[...Array(totalPages).keys()].map(x => (
                        <button
                            key={x + 1}
                            onClick={() => setPage(x + 1)}
                            className={`w-10 h-10 rounded-sm font-medium transition-colors flex items-center justify-center ${
                                page === x + 1 
                                ? 'bg-primary text-background' 
                                : 'bg-surface text-textMain hover:bg-surface/80 border border-surface'
                            }`}
                        >
                            {x + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;