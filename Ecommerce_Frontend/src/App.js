import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Store from './pages/Store';
import Blog from './pages/Blog';
import CompareProducts from './pages/CompareProducts';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import { NotFound } from './pages/NotFound';
import { PrivateRoutes } from './rounting/PrivateRoutes';
import { OpenRoutes } from './rounting/OpenRoutes';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path="/store" element={<Store />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
            <Route path="/my-order" element={<PrivateRoutes><Order /></PrivateRoutes>} />
            <Route path="/compare" element={<PrivateRoutes><CompareProducts /></PrivateRoutes>} />
            <Route path="/wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path="/login" element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path="/signup" element={<OpenRoutes><Signup /></OpenRoutes>} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/reset-pass/:token" element={<ResetPassword />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
