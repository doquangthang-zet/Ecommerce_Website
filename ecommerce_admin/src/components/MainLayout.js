import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { SiBrandfolder } from "react-icons/si";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiUserList } from "react-icons/pi";
import { FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { RiCouponLine } from "react-icons/ri";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { resetState } from '../features/auth/authSlice';
import { FaSignOutAlt } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Log out function
    // const signOut = () => {
    //   localStorage.clear();
    //   navigate("/");
    // }

    // Options on hover profile
    // const items = [
    //   {
    //     key: '1',
    //     label: (
    //       <Link to="/">
    //         View Profile
    //       </Link>
    //     ),
    //   },
    //   {
    //     key: '2',
    //     danger: true,
    //     label: (
    //       <button onClick={() => signOut()}>
    //         Sign out
    //       </button>
    //     ),
    //   },
    // ];
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-white text-center text-xl font-medium p-3 hover:text-purple-500">
          <Link to="/admin" className='logo-full hover:text-purple-500'>E-commerce</Link>
          <Link to="/admin" className='hidden logo-collapsed hover:text-purple-500'>E</Link>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          className='text-base'
          defaultSelectedKeys={[""]}
          onClick={({key}) => {
            if(key === "signout") {
              localStorage.clear();
              
              dispatch(resetState());
              navigate("/");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser />,
              label: 'Customer',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart />,
              label: 'Catalog',
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShopping />,
                  label: "Add product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShopping />,
                  label: "Product list",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder />,
                  label: "Brand list",
                },
                {
                  key: "category",
                  icon: <MdOutlineCategory />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <MdOutlineCategory />,
                  label: "Category list",
                },
                {
                  key: "color",
                  icon: <IoColorPaletteOutline />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <IoColorPaletteOutline />,
                  label: "Color list",
                },
              ]
            },
            {
              key: 'orders',
              icon: <LuClipboardList />,
              label: 'Orders',
            },
            {
              key: 'coupons',
              icon: <RiCouponLine />,
              label: 'Coupons',
              children: [
                {
                  key: 'coupon',
                  icon: <ImBlog />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine />,
                  label: 'Coupon list',
                },
              ]
            },
            {
              key: 'blogs',
              icon: <FaBloggerB />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB />,
                  label: 'Blog list',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog />,
                  label: 'Add blog category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB />,
                  label: 'Blog Category list',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <PiUserList />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <FaSignOutAlt />,
              label: 'Sign out',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className='flex justify-between ps-3 pe-10'
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '20px',
              width: 64,
              height: 64,
            }}
          />

          <div className='flex gap-5 items-center'>
            {/* <div className='relative'>
              <IoMdNotifications className='text-2xl' />
              <span className='bg-purple-500 p-1 leading-2 text-xs rounded-full absolute -top-1 -right-1'>3</span>
            </div> */}
            <div className='flex gap-5 items-center'>
              <div>
                <img width={32} height={32} className='rounded-md' src="shopping-bags.png" alt="avatar" />
              </div>
              <div className='flex flex-col'>
                <h5 className='text-lg font-medium mb-0'>Thang</h5>
                <p className='text-sm mb-0'>Web Developer</p>
              </div>
            </div>
            {/* <Dropdown menu={{ items }} className='flex items-center hover:!text-purple-500'>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown> */}
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout