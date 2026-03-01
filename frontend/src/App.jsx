import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Login from './pages/Login';       
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Cart from './pages/Cart';         
import Success from './pages/Success';   
import Cancel from './pages/Cancel';
import ProductDetail from './pages/ProductDetail';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />          
          <Route path="/success" element={<Success />} />    
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<OrderHistory />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;