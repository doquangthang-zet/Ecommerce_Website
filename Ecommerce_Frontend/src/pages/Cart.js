import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {NavLink, Link} from "react-router-dom";
import watch from "../images/watch.jpg";
import { RiDeleteBack2Fill  } from "react-icons/ri";

const Cart = () => {
  return (
    <>
        <Meta title="Cart" />
        <BreadCrum title="Cart" />

        <section className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                        {/* Cart header */}
                        <div className="flex items-center justify-between border-b border-gray-300">
                            <h4 className='text-medium font-medium text-gray-500 w-2/5'>Product</h4>
                            <h4 className='text-medium font-medium text-gray-500 w-1/10'>Price</h4>
                            <h4 className='text-medium font-medium text-gray-500 w-15%'>Quantity</h4>
                            <h4 className='text-medium font-medium text-gray-500 w-15%'>Total</h4>
                        </div>

                        {/* Cart data */}
                        <div className="flex items-center justify-between border-b border-gray-300 mb-2">
                            {/* product infor */}
                            <div className='w-2/5 flex items-center gap-3'>
                                <div className='w-1/4'>
                                    <img src={watch} className='' alt="product image" />
                                </div>
                                <div className="w-3/4">
                                    <h5 className='text-base text-gray-500'>sfsdfa</h5>
                                    <p className='text-base text-gray-500'>Size: sdfa</p>
                                    <p className='text-base text-gray-500'>Color: asdfa</p>
                                </div>
                            </div>
                            {/* Price */}
                            <div className='w-1/10'>
                                <h5 className='text-base text-gray-500'>$100</h5>
                            </div>
                            {/* Quantity */}
                            <div className='w-15% flex items-center gap-3'>
                                <div>
                                    <input type="number" name="quantity" id="quantity" defaultValue={1} className="flex-1 text-center border border-gray-800 rounded-md py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" min={1} max={10} />
                                </div>
                                <div>
                                    <RiDeleteBack2Fill className='text-red-600 p-2 text-4xl bg-cyan-900 rounded-full' />
                                </div>
                            </div>
                            {/* Total */}
                            <div className='w-15%'>
                                <h5>$100</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 py-2 mt-4">
                        <div className="flex justify-between items-baseline">
                            <Link to="/store" className='rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Continue to shopping</Link>
                            <div className='flex flex-col items-end'>
                                <h4 className='text-lg font-medium'>Subtotal: $1000</h4>
                                <p>fgdgfs</p>
                                <Link to="/checkout" className='rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Cart