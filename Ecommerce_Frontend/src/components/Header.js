import React from 'react'
import {NavLink, Link} from "react-router-dom";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsCart4, BsChevronDown, BsSearch } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRegHeart, FaRegUser, FaRegUserCircle, FaUser } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  return (
    <>
      <header className="bg-cyan-950 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 text-white">
            <div className="col-start-1 col-span-6 mb-0">
              <p>Free shipping for deals over 500$</p>
            </div>
            <div className="col-start-7 col-span-6">
              <p className='text-end mb-0'>
                Hotline: <a href="tel:+849842889">+849842889</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="bg-cyan-950 py-3">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2">
              <Link to="/" className='text-white lg:text-3xl md:text-md'>E-Commerce</Link>
            </div>
            <div className="col-span-5">
              <div className='w-full flex justify-center items-center'>
                <input 
                  type="text" 
                  className={`w-5/6 px-4 py-2 rounded-s-md bg-white outline-none duration-150 transition-all ease-in-out text-base`} 
                  placeholder='Search for products'
                />
                <BsSearch className='w-10 h-full p-2 rounded-e-md bg-orange-500 outline-none' />
              </div>
            </div>
            <div className="col-span-5">
              <div className="flex items-center justify-between">
                <div>
                  <Link to="/wishlist" className='flex items-center text-white gap-2'>
                    <FaRegHeart className='fill-white w-8 h-8' />
                    <p className='mb-0'>Favourite <br/>Wishlist</p>
                  </Link>
                </div>

                <div>
                  <Link to="/compare" className='flex items-center text-white gap-2'>
                    <RiRefreshLine className='fill-white w-8 h-8' />
                    <p className='mb-0'>Compare <br/>Products</p>
                  </Link>
                </div>

                <div>
                  <Link to="/login" className='flex items-center text-white gap-2'>
                    <FaRegUser className='fill-white w-8 h-8' />
                    <p className='mb-0'>Log in <br/>My Account</p>
                  </Link>
                </div>

                <div>
                  <Link to="/cart" className='flex items-center text-white gap-2'>
                    <BsCart4 className='fill-orange-500 w-8 h-8' />
                    <div className='flex flex-col gap-2'>
                      <span className='bg-white text-black rounded-md text-center text-sm'>0</span>
                      <p className="mb-0">$100</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="bg-cyan-900 py-3">
        <div className='container mx-auto px-4'>
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-white">
              <div className="flex items-center gap-10">
                <Menu as="div" className="relative inline-block text-left">
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
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? 'bg-cyan-900 text-white' : 'text-white',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Edit
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? 'bg-cyan-900 text-white' : 'text-white',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Duplicate
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? 'bg-cyan-900 text-white' : 'text-white',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Archive
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="#"
                              className={classNames(
                                active ? 'bg-cyan-900 text-white' : 'text-white',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Move
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div className="bg-cyan-900">
                  <div className="flex items-center gap-5 font-semibold">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
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