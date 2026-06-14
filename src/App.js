import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Sayfalar ve Bileşenler
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart'; 
import Success from './pages/Success';
import Admin from './pages/Admin';
import MyOrders from './pages/MyOrders';


// Context
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      {/* Tüm uygulamayı CartProvider ile sarmalıyoruz ki sepet verisi her yerde çalışsın */}
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;