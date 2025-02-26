import React, { useEffect, useState } from 'react'
import {NavLink, Link, useNavigate} from "react-router-dom";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsCart4, BsChevronDown, BsSearch } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegHeart, FaRegUser, FaRegUserCircle, FaUser } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProdCate } from '../features/productCate/productCateSlice';
import { deleteCart, getUserCart } from '../features/user/userSlice';
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { getAllProduct, getOneProduct } from '../features/product/productSlice';
import { getAllBlog } from '../features/blog/blogSlice';
import { getAllBrand } from '../features/brand/brandSlice';
import { getAllColor } from '../features/color/colorSlice';
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const people = [
  'Wade Cooper',
  'Arlene McCoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
]
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prodCateState = useSelector(state => state?.prodCate?.prodCates);
  const prodState = useSelector(state => state?.product?.products);
  const userCartState = useSelector(state => state?.user?.userCart);
  const userState = useSelector(state => state?.user);
  const [totalAmount, setTotalAmount] = useState(null);
  // const [paginate, setPaginate] = useState(true);
  const [prodOption, setProdOption] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({})
  const [query, setQuery] = useState('')
  const filteredProduct =
    query === ''
      ? prodOption
      : prodOption?.filter((prod) => {
          return prod?.name?.toLowerCase().includes(query.toLowerCase())
        })

  const handleLogout = () => {
    localStorage.clear();;
    window.location.reload();
    toast.success("User logged out!")
  }

  useEffect(() => {
    if (window.location.pathname.includes("/success")) {
      dispatch(deleteCart());
    }
    dispatch(getAllProdCate());
    dispatch(getUserCart());
    dispatch(getAllProduct());
    dispatch(getAllBlog());
    dispatch(getAllBrand());
    dispatch(getAllColor());
    // console.log(userState);
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < userCartState?.length; i++) {
        sum = sum + (Number(userCartState[i]?.quantity) * Number(userCartState[i]?.price));
    }
    setTotalAmount(sum);
  }, [userCartState]);

  useEffect(() => {
    let prodData = [];
    for (let i = 0; i < prodState?.length; i++) {
      const item = prodState[i];
      prodData.push({id: item, prod: item?._id, name: item?.title});
    }
    setProdOption(prodData);
    // console.log(prodOption);
  }
  , [prodState]);

  return (
    <>
      {/* First Line */}
      <header className="bg-cyan-950 py-1 border-b text-xs sm:text-sm md:text-base md:py-3 lg:text-lg">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 text-white">
            <div className="text-center col-start-1 col-span-12 md:col-span-6 mb-0 md:text-start">
              <p>Free shipping for deals over 500$</p>
            </div>
            <div className="col-start-1 col-span-12 md:col-start-7 md:col-span-6">
              <p className='text-center mb-0 md:text-end'>
                Hotline: <a href="tel:+849842889">+849842889</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Title and search & actions */}
      <header className="bg-cyan-950 py-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-1 md:gap-5 items-center">
            <div className="col-span-2 col-start-2 sm:col-span-3 sm:col-start-2 md:col-span-3">
              <Link to="/" className='text-white text-sm hidden sm:block sm:text-base md:text-lg lg:text-2xl'>E-Commerce</Link>
              <Link to="/" className='text-white text-sm block sm:hidden sm:text-base md:text-lg lg:text-2xl'>E</Link>
            </div>
            <div className="hidden md:block md:col-span-4 z-10">
              <div className='w-full relative'>
                <Combobox value={selectedProduct} onChange={(value) => setSelectedProduct(value)}>
                  <Combobox.Input
                    minLength={1}
                    value={query} 
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for a product..."
                    className={clsx(
                      'w-full rounded-lg border-none bg-white/20 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                  />
                  <Combobox.Options 
                    anchor="bottom"
                    transition
                    className={clsx('w-[var(--input-width)] rounded-xl border border-white bg-white/100 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 absolute')}
                  >
                    {filteredProduct.map((p, i) => (
                      <Combobox.Option 
                        key={i} 
                        value={p.name} 
                        onClick={() => {
                          navigate(`/product/${p.prod}`);
                          dispatch(getOneProduct(p.prod));
                        }} 
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-cyan-900 hover:bg-cyan-900 hover:text-white"
                      >
                        {p.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Combobox>
                {/* <Typeahead
                  id="pagination-example"
                  onChange={(selected) => navigate(`/product/${selected[0]?.prod}`)}
                  labelKey="name"
                  minLength={1}
                  onPaginate={() => console.log('Results paginated')}
                  options={prodOption}
                  paginate={paginate}
                  className={`w-5/6 p-1 rounded-md bg-white outline-none duration-150 transition-all ease-in-out text-base`} 
                  placeholder="Search for a product..."
                /> */}
                {/* <input 
                  type="text" 
                  className={`w-5/6 px-4 py-2 rounded-s-md bg-white outline-none duration-150 transition-all ease-in-out text-base`} 
                  placeholder='Search for products'
                /> */}
                {/* <BsSearch className='w-10 h-full p-2 rounded-e-md bg-orange-500 outline-none' /> */}
              </div>
            </div>
            <div className="col-span-9 sm:col-span-7 sm:col-start-6 md:col-span-5">
              <div className="flex items-center justify-between lg:mx-4">
                <div>
                  <Link to="/wishlist" className='flex items-center text-white gap-1 sm:gap-2 md:gap-3'>
                    <FaRegHeart className='fill-white w-5 h-5 md:w-6 md:h-6 ld:w-8 lg:h-8' />
                    <p className='mb-0 hidden lg:block'>Favourite <br/>Wishlist</p>
                    <p className='mb-0 block lg:hidden'>Wishlist</p>
                  </Link>
                </div>

                {/* <div>
                  <Link to="/compare" className='flex items-center text-white gap-2'>
                    <RiRefreshLine className='fill-white w-8 h-8' />
                    <p className='mb-0'>Compare <br/>Products</p>
                  </Link>
                </div> */}

                <div>
                  <Link to={userState && userState?.currentUser === null ? "/login" : "/my-profile"} className='flex items-center text-white gap-1 md:gap-2'>
                    <FaRegUser className='fill-white w-5 h-5 md:w-6 md:h-6 ld:w-8 lg:h-8' />
                      {
                        userState && userState?.currentUser === null ? <p className='mb-0'>Log in <br/><span className='hidden lg:block'>My Account</span></p>  : <p className='mb-0'>Welcome{' '+ userState?.currentUser?.firstname}</p>
                      }
                  </Link>
                </div>

                <div>
                  <Link to="/cart" className='md:flex items-center text-white gap-2 hidden'>
                    <BsCart4 className='fill-orange-500 w-5 h-5 md:w-6 md:h-6 ld:w-8 lg:h-8' />
                    <div className='flex flex-col gap-2'>
                      <span className='bg-white text-black rounded-md text-center text-sm'>{userCartState?.length > 0 ? userCartState?.length : 0}</span>
                      <p className="mb-0">${totalAmount ? totalAmount : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <header className="bg-cyan-900 py-1 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg">
        <div className='container mx-auto'>
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-white">
              <div className="md:flex md:items-center gap-2 md:gap-10">
                <Menu as="div" className="hidden relative md:inline-block md:text-nowrap text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-cyan-950">
                      <BiSolidCategoryAlt className="-mr-1 h-5 w-5 text-white" />
                      <span className='ms-2 me-5'>Shop Categories</span>
                      <BsChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-cyan-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {
                          prodCateState && prodCateState?.map((item, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active ? 'bg-cyan-900 text-white' : 'text-white',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {item?.title}
                                </Link>
                              )}
                            </Menu.Item>
                          ))
                        }
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div className="bg-cyan-900">
                  <div className="flex items-center justify-between gap-1 font-normal mx-5 sm:gap-4 sm:font-medium md:gap-5 md:font-semibold">
                    <NavLink to="/" className="">Home</NavLink>
                    <NavLink to="/store" className="hidden sm:block md:text-nowrap">Our Store</NavLink>
                    <NavLink to="/store" className="block sm:hidden">Store</NavLink>
                    <NavLink to="/my-order" className="hidden sm:block md:text-nowrap">My Orders</NavLink>
                    <NavLink to="/my-order" className="block sm:hidden">Orders</NavLink>
                    <NavLink to="/blog" className="">Blog</NavLink>
                    <NavLink to="/contact" className="">Contact</NavLink>
                    {
                      userState && userState?.currentUser && 
                      <button onClick={handleLogout} className='rounded-md bg-transparent p-1 text-xs font-normal sm:text-sm sm:font-semibold md:p-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-cyan-950 text-nowrap'>Log out</button>
                    }
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header