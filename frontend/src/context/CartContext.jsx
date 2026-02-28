import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load cart from local storage so it persists on refresh
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('luminaCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem('luminaCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.product === product._id);
            if (itemExists) {
                // Update quantity if it already exists
                return prevItems.map((item) => 
                    item.product === product._id 
                        ? { ...item, quantity: item.quantity + quantity } 
                        : item
                );
            }
            // Add new item
            return [...prevItems, { 
                product: product._id, 
                title: product.title, 
                price: product.price, 
                imageUrl: product.imageUrl, 
                stockQuantity: product.stockQuantity,
                quantity 
            }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.product !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map((item) => 
            item.product === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('luminaCart');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};