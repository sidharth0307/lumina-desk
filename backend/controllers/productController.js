import Product from '../models/Product.js';

// @desc    Fetch all products (with Search, Filter, Sort, Pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const { search, category, sort, page = 1, limit = 10 } = req.query;

        // 1. Filtering & Searching at the DB level
        let query = {};
        
        if (category) {
            query.category = category;
        }
        
        if (search) {
            // Case-insensitive regex search on the title
            query.title = { $regex: search, $options: 'i' };
        }

        // 2. Sorting
        let sortOption = {};
        if (sort === 'lowest') sortOption.price = 1; // Ascending
        else if (sort === 'highest') sortOption.price = -1; // Descending
        else sortOption.createdAt = -1; // Newest first by default

        // 3. Pagination calculation
        const skip = (Number(page) - 1) * Number(limit);

        // 4. Execution with .lean() for Performance Optimization
        // .lean() tells Mongoose to return plain JS objects, not heavy Mongoose documents.
        // This makes the query significantly faster and uses less memory.
        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .lean(); 

        const total = await Product.countDocuments(query);

        res.json({
            products,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching products', error: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// --- ADMIN ROUTES BELOW ---

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Invalid product data', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};