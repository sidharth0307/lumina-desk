import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Placeholder Pages (we will build these soon)
const ProductList = () => <div className="p-8 text-center mt-20">Product List Page</div>;
const Login = () => <div className="p-8 text-center mt-20">Login Page</div>;
const AdminDashboard = () => <div className="p-8 text-center mt-20">Admin Dashboard</div>;

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;