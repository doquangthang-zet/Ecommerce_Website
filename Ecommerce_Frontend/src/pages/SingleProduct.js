import React, { useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link} from "react-router-dom";
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import Color from '../components/Color';
import { FaCodeCompare, FaRegHeart } from "react-icons/fa6";
import { LiaLinkSolid, LiaShippingFastSolid } from "react-icons/lia";

const SingleProduct = () => {
    const [orderedProduct, setOrderedProduct] = useState(false);
    
  return (
    <>
        <Meta title="Dynamic Product Name" />
        <BreadCrum title="Dynamic Product Name" />

        {/* Product infor section */}
        <section className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 bg-white p-3 rounded-md">
                    {/* Product card*/}
                    <div className="col-span-6">
                        <div className="p-3">
                            <div className="border border-gray-500 mb-5">
                                <img className='w-full h-100 object-cover' src="https://cdn.tgdd.vn//News/0//Baiviet(9)-730x410.jpg" alt="image" />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="border border-gray-500 p-5 w-48%">
                                    <img className='' src="https://cdn.tgdd.vn//News/0//Baiviet(9)-730x410.jpg" alt="image" />
                                </div>

                                <div className="border border-gray-500 p-5 w-48%">
                                    <img className='' src="https://cdn.tgdd.vn//News/0//Baiviet(9)-730x410.jpg" alt="image" />
                                </div>

                                <div className="border border-gray-500 p-5 w-48%">
                                    <img className='' src="https://cdn.tgdd.vn//News/0//Baiviet(9)-730x410.jpg" alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <div className="p-5">
                            <div className="border-b border-gray-300">
                                <h3 className='text-xl font-semibold mb-3'>Olympus Pen E-PL9 Kit With 14-42, EZ Lens, Camera</h3>
                            </div>
                            <div className="border-b border-gray-300">
                                <p className='text-base font-semibold my-3'>$100</p>
                                <div className="flex items-center gap-3">
                                    <ReactStars
                                        count={5}
                                        value={4}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                    <p className='mb-0 text-sm text-gray-500'>( 2 reviews )</p>
                                </div>
                                <a href="#review" className='text-sm text-gray-500 mb-3'>Write a review</a>
                            </div>
                            <div className='border-b border-gray-300 py-3'>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Type: </h3> <p className='text-sm text-gray-700 mb-0'>Watch</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Brand: </h3> <p className='text-sm text-gray-700 mb-0'>Havels</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Categories: </h3> <p className='text-sm text-gray-700 mb-0'>Watch</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Tags: </h3> <p className='text-sm text-gray-700 mb-0'>Watch</p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium'>Availability: </h3> <p className='text-sm text-gray-700 mb-0'>iN Stock</p>
                                </div>
                                <div className="flex gap-3 items-start my-3 flex-col">
                                    <h3 className='text-base mb-0 font-medium'>Size: </h3>
                                    <div className="flex flex-wrap gap-3">
                                        <span className='border-gray-800 px-3 border rounded'>S</span>
                                        <span className='border-gray-800 px-3 border rounded'>M</span>
                                        <span className='border-gray-800 px-3 border rounded'>L</span>
                                        <span className='border-gray-800 px-3 border rounded'>XL</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start my-3 flex-col">
                                    <h3 className='text-base mb-0 font-medium'>Color: </h3>
                                    <Color />
                                </div>
                                <div className="flex gap-3 flex-row items-center my-4">
                                    <h3 className='text-base mb-0 font-medium'>Quantity: </h3>
                                    <div>
                                        <input type="number" name="quantity" id="quantity" defaultValue={1} className="flex-1 text-center border border-gray-800 rounded-md py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" min={1} max={10} />
                                    </div>
                                    <div className="flex justify-center items-center gap-4 ms-5">
                                        <button type='submit' className='rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2'>Add to cart</button>
                                        <button to="/signup" className='rounded-3xl text-black bg-orange-500 px-8 py-2 text-lg hover:bg-cyan-950 hover:text-white ml-2'>Buy now</button>
                                    </div>
                                </div>
                                <div className="flex gap-9 items-center my-2">
                                    <div>
                                        <a href="" className='text-base text-gray-500 flex items-center gap-2 my-2'>
                                            <FaCodeCompare /> Add to compare
                                        </a>
                                    </div>

                                    <div>
                                        <a href="" className='text-base text-gray-500 flex items-center gap-2 my-2'>
                                            <FaRegHeart /> Add to wishlist
                                        </a>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start flex-col my-2">
                                    <h3 className='text-base mb-0 font-medium flex items-center gap-2'><LiaShippingFastSolid /> Shipping & return: </h3> <p className='text-sm text-gray-700 mb-0'>Free shipping and returns available on all orders! <br />
                                    We ship all US domestic orders within <b>5-10 business days!</b></p>
                                </div>
                                <div className="flex gap-3 items-center my-2">
                                    <h3 className='text-base mb-0 font-medium flex items-center gap-2'><LiaLinkSolid /> Product Link: </h3>
                                    <a href="javascript:void(0);" className='text-base text-gray-500 flex items-center gap-2 my-2' onClick={() => {navigator.clipboard.writeText("https://cdn.tgdd.vn//News/0//Baiviet(9)-730x410.jpg")}}>
                                        Copy link product.
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Description section */}
        <section className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    {/* Product card*/}
                    <div className="col-span-12">
                        <h3 className='text-2xl font-medium mb-5'>Description</h3>
                    </div>
                    <div className="col-span-12">
                        <div className='bg-white p-3 rounded-md'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, magni. Est natus modi consequatur maiores eius quam necessitatibus cum mollitia numquam. Doloremque corporis quisquam exercitationem, aspernatur reprehenderit repellendus nulla eum!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Review section */}
        <section className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12">
                    {/* Reviews card*/}
                    <div className="col-span-12">

                    <div className="col-span-12">
                        <h3 className='text-2xl font-medium mb-5' id='review'>Reviews</h3>
                    </div>

                        <div className='bg-white p-8 rounded-md'>
                            {/* Review Heading */}
                            <div className="flex justify-between items-end border-b border-gray-300 pb-5">
                                <div>
                                    <h4 className='text-lg mb-0 font-medium'>Customer Reviews</h4>
                                    <div className="flex items-center gap-3">
                                        <ReactStars
                                            count={5}
                                            value={4}
                                            edit={false}
                                            size={24}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0'>Based on 2 reviews</p>
                                    </div>
                                    
                                </div>

                                {orderedProduct && 
                                    <div>
                                        <a href="">Write a review</a>
                                    </div>
                                }
                            </div>

                            {/* Review Form */}
                            <div className='py-4 border-b border-gray-300 mb-3'>
                                <h4 className='text-base font-medium'>Write a review</h4>
                                <form action="" className='flex flex-col gap-3'>
                                    <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                                        <div>
                                            <ReactStars
                                                count={5}
                                                edit={true}
                                                size={24}
                                                activeColor="#ffd700"
                                            />
                                        </div>

                                        <div className="col-span-full">
                                            <div className="mt-2">
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                cols={30}
                                                rows={4}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 bg-gray-200"
                                                placeholder='Comment'
                                            />
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your comment.</p>
                                        </div>

                                        <div className="mt-3 col-span-full flex justify-end">
                                            <button
                                            type="submit"
                                            className="rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black"
                                            >
                                            Submit Review
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Reviews from other */}
                            <div>
                                <div className='border-b border-gray-300 pb-4'>
                                    <div className="flex gap-3 items-center">
                                        <h6 className='text-xl font-medium'>Zetsu</h6>
                                        <ReactStars
                                            count={5}
                                            value={4}
                                            edit={false}
                                            size={24}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className='text-base mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus tempora perferendis neque tenetur odio, repellat eum magni eaque. Explicabo atque laudantium asperiores quidem nostrum animi vel, consectetur voluptate necessitatibus at!</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

        {/* Popular products section */}
        <section className="py-5 mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12">
                        <h3 className='text-2xl font-medium mb-1'>Our Popular Products</h3>
                    </div>

                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </section>
    </>
  )
}

export default SingleProduct