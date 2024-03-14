import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {NavLink, Link} from "react-router-dom";

const Wishlist = () => {
  return (
    <>
        <Meta title="Wishlist" />
        <BreadCrum title="Wishlist" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Wishlist cards*/}
                    <div className="col-span-3">
                        <div className="bg-white rounded-md py-5 px-4 relative">
                            <img src="images/cross.svg" className='absolute top-3 right-3 w-5 p-1 cursor-pointer' alt="cross" />

                            <div className='w-full my-3'>
                                <img src="images/headphone.jpg" className='mx-auto' alt="tv" />
                            </div>

                            <div className="">
                                <h5 className='text-base font-medium'>Kids Headphones Bulk 10 Pack Multi Colored For Students</h5>
                                <h6 className='text-base font-normal mb-4 mt-3'>$100</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Wishlist