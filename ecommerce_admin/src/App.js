import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCateList from './pages/BlogCateList';
import Order from './pages/Order';
import Customer from './pages/Customer';
import ColorList from './pages/ColorList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import ProductCateList from './pages/ProductCateList';
import AddBlog from './pages/AddBlog';
import AddBlogCategory from './pages/AddBlogCategory';
import AddBrand from './pages/AddBrand';
import AddColor from './pages/AddColor';
import AddProductCategory from './pages/AddProductCategory';
import AddProduct from './pages/AddProduct';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />} />
          <Route path='customers' element={<Customer />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='product/:id' element={<AddProduct />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='category' element={<AddProductCategory />} />
          <Route path='category/:id' element={<AddProductCategory />} />
          <Route path='category-list' element={<ProductCateList />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='orders' element={<Order />} />
          <Route path='orders/:id' element={<ViewOrder />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<ViewEnquiry />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCateList />} />
          <Route path='blog' element={<AddBlog />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-category' element={<AddBlogCategory />} />
          <Route path='blog-category/:id' element={<AddBlogCategory />} />
          <Route path='coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='coupon-list' element={<CouponList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
