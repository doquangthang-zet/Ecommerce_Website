import React, { useEffect } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {NavLink, Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../features/user/userSlice';
import { addWishlist } from '../features/product/productSlice';


const Wishlist = () => {
    const dispatch = useDispatch();

    const wishlistState = useSelector(state => state?.user?.wishlist?.wishlist);

    useEffect(() => {
        dispatch(getWishlist());
    }, []);

    const removeFromWishlist = (id) => {
        dispatch(addWishlist(id));

        setTimeout(() => {
            dispatch(getWishlist());
        }, 300);
    };

  return (
    <>
        <Meta title="Wishlist" />
        <BreadCrum title="Wishlist" />

        <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Wishlist cards*/}
                    {wishlistState?.length === 0 && <div className='col-span-12 text-center font-medium text-xl'>No Data</div>}
                    {
                        wishlistState && wishlistState?.map((item,index) => (
                            <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                                <div className="bg-white rounded-md py-5 px-4 relative">
                                    <img src={"images/cross.svg"} onClick={() => removeFromWishlist(item?._id)} className='absolute top-3 right-3 w-5 p-1 cursor-pointer' alt="cross" />

                                    <div className='w-full my-3'>
                                        <img src={item?.images[0]?.url ? item?.images[0]?.url : "images/headphone.jpg"} className='mx-auto w-full sm:h-44' alt="tv" />
                                    </div>

                                    <div className="">
                                        <h5 className='text-base font-medium'>{item?.title?.length > 18 ? item?.title?.substr(0,18) + "..." : item?.title}</h5>
                                        <h6 className='text-base font-normal mb-4 mt-3'>${item?.price}</h6>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Wishlist