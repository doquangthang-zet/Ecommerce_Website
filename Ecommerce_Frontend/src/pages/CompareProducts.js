import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {NavLink, Link} from "react-router-dom";
import Color from '../components/Color';

const CompareProducts = () => {
  return (
    <>
        <Meta title="Compare Products" />
        <BreadCrum title="Compare Products" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Product cards*/}
                    <div className="col-span-3">
                        <div className="bg-white rounded-md py-5 px-4 relative">
                            <img src="images/cross.svg" className='absolute top-3 right-3 w-5 p-1 cursor-pointer' alt="cross" />

                            <div className='w-full my-3'>
                                <img src="images/tv.jpg" className='mx-auto' alt="tv" />
                            </div>

                            <div className="">
                                <h5 className='text-base font-medium'>TV LG</h5>
                                <h6 className='text-base font-normal mb-4 mt-3'>$100</h6>
                                
                                <div>
                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Brand: </h5>
                                        <p>Havels</p>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Type: </h5>
                                        <p>Watch</p>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Availability: </h5>
                                        <p>In Stock</p>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Color: </h5>
                                        
                                        <div>
                                            <Color />
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Size: </h5>
                                        
                                        <div className='flex gap-3'>
                                            <p>S</p>
                                            <p>M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">
                        <div className="bg-white rounded-md py-5 px-4 relative">
                            <img src="images/cross.svg" className='absolute top-3 right-3 w-5 p-1 cursor-pointer' alt="cross" />

                            <div className='w-full'>
                                <img src="images/tv.jpg" className='mx-auto' alt="tv" />
                            </div>

                            <div className="">
                                <h5 className='text-base font-medium'>TV LG</h5>
                                <h6 className='text-base font-normal mb-4 mt-3'>$100</h6>
                                
                                <div>
                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Brand: </h5>
                                        <p>Havels</p>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Type: </h5>
                                        <p>Watch</p>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Availability: </h5>
                                        <p>In Stock</p>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Color: </h5>
                                        
                                        <div>
                                            <Color />
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center py-5 px-0 border-t border-gray-900/10'>
                                        <h5>Size: </h5>
                                        
                                        <div className='flex gap-3'>
                                            <p>S</p>
                                            <p>M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CompareProducts