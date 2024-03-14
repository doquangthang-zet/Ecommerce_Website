import React from 'react'
import { BsFacebook, BsGithub, BsLinkedin, BsSearch, BsSend } from "react-icons/bs";
import {NavLink, Link} from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-3 bg-cyan-950 border-b border-gray-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 m-4">
            <div className="col-span-5">
              <div className="flex gap-5 items-center">
                <BsSend className='text-3xl text-white' />
                <p className='text-3xl font-normal text-white mb-0'>Sign Up for Newletter</p>
              </div>
            </div>

            <div className="col-span-7">
              <div className='w-full flex justify-center items-center'>
                <input 
                  type="text" 
                  className={`w-5/6 px-4 py-2 rounded-s-md bg-white outline-none duration-150 transition-all ease-in-out text-base`} 
                  placeholder='Your email address'
                />
                <p className='w-fit h-full p-2 rounded-e-md bg-orange-500 outline-none'>Subscribe</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-3 bg-cyan-950 border-b border-gray-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 m-4">
            <div className="col-span-4">
              <h4 className='text-white mb-4 text-3xl font-semibold'>Contact Us</h4>
              <div className='flex flex-col'>
                <address className='text-white'>
                  Binh Tan, Binh Hung Hoa B,<br /> Ho Chi Minh City <br /> Pin Code: 700000
                </address>

                <a href="tel: +84949375439" className='mt-3 block text-white'>+84 23482842</a>
                <a href="mailto: zetsu2468@gmail.com" className='mt-2 mb-3 block text-white'>zetsu2468@gmail.com</a>

                <div className="flex items-center gap-5 text-xl text-white">
                  <a href="#">
                    <BsLinkedin />
                  </a>

                  <a href="#">
                    <BsGithub />
                  </a>

                  <a href="#">
                    <BsFacebook />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <h4 className='text-white mb-4 text-3xl font-semibold'>Information</h4>
              <div className='flex flex-col'>
                <Link to="/" className='text-white py-2 mb-1'>Privacy Policy</Link>
                <Link to="/" className='text-white py-2 mb-1'>Refund Policies</Link>
                <Link to="/" className='text-white py-2 mb-1'>Shipping Policies</Link>
                <Link to="/" className='text-white py-2 mb-1'>Terms & Conditions</Link>
                <Link to="/" className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>

            <div className="col-span-3">
              <h4 className='text-white mb-4 text-3xl font-semibold'>Account</h4>
              <div className='flex flex-col'>
                <Link to="/" className='text-white py-2 mb-1'>About Us</Link>
                <Link to="/" className='text-white py-2 mb-1'>FAQs</Link>
                <Link to='/contact' className='text-white py-2 mb-1'>Contact</Link>
              </div>
            </div>

            <div className="col-span-2">
              <h4 className='text-white mb-4 text-3xl font-semibold'>Quick Links</h4>
              <div className='flex flex-col'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Watchs</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4 bg-cyan-950">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="text-white text-center mb-0">&copy; {new Date().getFullYear()}; Powered by Zet</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer